import { useState, useCallback, useEffect, useRef } from 'react';
import { useAccount, useConnect, useReconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import DailyCheckinScreen from './screens/DailyCheckinScreen';
import HelpGuideScreen from './screens/HelpGuideScreen';
import { useAudio } from './audio/useAudio';
import { usePlayGame } from './hooks/usePlayGame';
import { useAuth } from './hooks/useAuth';
import { getAuthedApi } from './api';
import { TxOverlay, Toast } from './components/TxOverlay';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [gamePlayId, setGamePlayId] = useState(null);
  const [showRejectedToast, setShowRejectedToast] = useState(false);
  const audio = useAudio();

  const { isConnected, address } = useAccount();
  const prevAddressRef = useRef(address);
  const { connect } = useConnect();
  const { reconnect } = useReconnect();
  const { startPlay, buyItem, txStatus, resetTxStatus, balanceError, resetBalanceError } = usePlayGame();
  const { authStatus, user, authError, signIn, signUp, signOut, checkName, refreshUser } = useAuth();

  const energy = user?.stats?.energy ?? 0;

  // Auto-connect if window.ethereum is present (MiniPay or any injected wallet)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      reconnect();
    }
  }, [reconnect]);

  // When wallet address changes, redirect to home
  useEffect(() => {
    if (prevAddressRef.current && address && prevAddressRef.current !== address) {
      setScreen('home');
    }
    prevAddressRef.current = address;
  }, [address]);

  const handleConnectWallet = useCallback(() => {
    connect({ connector: injected() });
  }, [connect]);

  const callGameStart = useCallback(async () => {
    const authedApi = getAuthedApi(address);
    if (!authedApi) return null;
    const res = await authedApi.game.start.$post();
    if (!res.ok) return null;
    const data = await res.json();
    return data.game_play_id;
  }, [address]);

  const handlePlay = useCallback(async () => {
    audio.initAudio();

    if (energy > 0) {
      const playId = await callGameStart();
      if (playId) {
        setGamePlayId(playId);
        setScreen('game');
      }
      return;
    }

    // energy === 0: buy a session from the contract
    const success = await startPlay();
    if (success) {
      // Refresh user to get updated energy after purchase
      const updatedUser = await refreshUser();
      if (updatedUser?.stats?.energy > 0) {
        const playId = await callGameStart();
        if (playId) {
          setGamePlayId(playId);
          setScreen('game');
        }
      }
    }
  }, [energy, audio, startPlay, callGameStart, refreshUser]);

  const handleExitGame = useCallback(() => {
    setScreen('home');
    refreshUser();
  }, [refreshUser]);

  const handleToggleMute = useCallback(() => {
    audio.toggleMute();
  }, [audio]);

  const handleGoHome = useCallback(() => {
    setScreen('home');
  }, []);

  const handleAddEnergy = useCallback(() => {
    refreshUser();
  }, [refreshUser]);

  // When tx is rejected, close overlay and show toast
  const handleCloseTxOverlay = useCallback(() => {
    resetTxStatus();
  }, [resetTxStatus]);

  // Watch for 'rejected' status to show toast
  useEffect(() => {
    if (txStatus === 'rejected') {
      setShowRejectedToast(true);
      resetTxStatus();
    }
  }, [txStatus, resetTxStatus]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        background: '#dde8f0',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 600,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          background: '#f0f8ff',
          boxShadow: '0 0 60px rgba(2,48,71,0.15)',
        }}
      >
        {screen === 'home' && (
          <HomeScreen
            onPlay={handlePlay}
            onConnectWallet={handleConnectWallet}
            isConnected={isConnected}
            audio={audio}
            energy={energy}
            onNavigate={setScreen}
            authStatus={authStatus}
            user={user}
            authError={authError}
            onSignIn={signIn}
            onSignUp={signUp}
            checkName={checkName}
            balanceError={balanceError}
            resetBalanceError={resetBalanceError}
          />
        )}
        {screen === 'game' && (
          <GameScreen onExit={handleExitGame} audio={audio} gamePlayId={gamePlayId} address={address} />
        )}
        {screen === 'leaderboard' && (
          <LeaderboardScreen onGoHome={handleGoHome} />
        )}
        {screen === 'profile' && (
          <ProfileScreen audio={audio} onToggleMute={handleToggleMute} onGoHome={handleGoHome} />
        )}
        {screen === 'shop' && (
          <ShopScreen
            onGoHome={handleGoHome}
            onAddEnergy={handleAddEnergy}
            buyItem={buyItem}
            balanceError={balanceError}
            resetBalanceError={resetBalanceError}
          />
        )}
        {screen === 'checkin' && (
          <DailyCheckinScreen onGoHome={handleGoHome} onAddEnergy={handleAddEnergy} />
        )}
        {screen === 'helpguide' && (
          <HelpGuideScreen onGoHome={handleGoHome} />
        )}
      </div>

      <TxOverlay txStatus={txStatus} onClose={handleCloseTxOverlay} />

      {showRejectedToast && (
        <Toast
          message="You have rejected"
          onDone={() => setShowRejectedToast(false)}
        />
      )}
    </div>
  );
}
