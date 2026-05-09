import { useState, useCallback, useEffect, useRef } from 'react';
import { useAccount, useReconnect } from 'wagmi';
import { modal } from './wagmi';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import DailyCheckinScreen from './screens/DailyCheckinScreen';
import HelpGuideScreen from './screens/HelpGuideScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from './screens/TermsOfServiceScreen';
import { useAudio } from './audio/useAudio';
import { usePlayGame } from './hooks/usePlayGame';
import { useAuth } from './hooks/useAuth';
import { getAuthedApi } from './api';
import { processPendingRequests } from './pendingRequests';
import { TxOverlay, Toast } from './components/TxOverlay';
import { BannedOverlay } from './components/BannedOverlay';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [gamePlayId, setGamePlayId] = useState(null);
  const [showRejectedToast, setShowRejectedToast] = useState(false);
  const [showNoEnergyModal, setShowNoEnergyModal] = useState(false);
  const audio = useAudio();

  const { isConnected, address } = useAccount();
  const prevAddressRef = useRef(address);
  const { reconnect } = useReconnect();
  const { startPlay, buyItem, txStatus, resetTxStatus, balanceError, resetBalanceError } = usePlayGame();
  const { authStatus, user, authError, banned, signIn, signUp, signOut, checkName, refreshUser, rename } = useAuth();

  const energy = user?.stats?.energy ?? 0;

  // Backend stats can lag a few seconds after game start/end; schedule a
  // delayed refresh so the home screen reflects updated numbers.
  const refreshTimerRef = useRef(null);
  const scheduleRefreshUser = useCallback(() => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
    refreshTimerRef.current = setTimeout(() => {
      refreshTimerRef.current = null;
      refreshUser();
    }, 3000);
  }, [refreshUser]);

  useEffect(() => () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
  }, []);

  // Auto-connect if window.ethereum is present (MiniPay or any injected wallet)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      reconnect();
    }
  }, [reconnect]);

  // Refresh user data whenever the home screen is shown for a signed-in user.
  useEffect(() => {
    if (screen === 'home' && authStatus === 'signed_in') {
      refreshUser();
    }
  }, [screen, authStatus, refreshUser]);

  // When wallet address changes, redirect to home
  useEffect(() => {
    if (prevAddressRef.current && address && prevAddressRef.current !== address) {
      setScreen('home');
    }
    prevAddressRef.current = address;
  }, [address]);

  // Replay any queued game_end / purchase_submit requests left over from a
  // previous session (e.g. user refreshed mid-flight).
  useEffect(() => {
    if (authStatus === 'signed_in' && address) {
      processPendingRequests(address);
    }
  }, [authStatus, address]);

  const handleConnectWallet = useCallback(() => {
    modal.open();
  }, []);

  const callGameStart = useCallback(async () => {
    const authedApi = getAuthedApi(address);
    if (!authedApi) return null;
    const res = await authedApi.game.start.$post();
    if (!res.ok) return null;
    const data = await res.json();
    scheduleRefreshUser();
    return data.game_play_id;
  }, [address, scheduleRefreshUser]);

  const handleGameEnded = useCallback(() => {
    scheduleRefreshUser();
  }, [scheduleRefreshUser]);

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

  const handlePlayAgain = useCallback(async () => {
    const updatedUser = await refreshUser();
    const currentEnergy = updatedUser?.stats?.energy ?? 0;
    if (currentEnergy <= 0) {
      setShowNoEnergyModal(true);
      return null;
    }
    const playId = await callGameStart();
    if (playId) {
      setGamePlayId(playId);
      return playId;
    }
    return null;
  }, [callGameStart, refreshUser]);

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
          <GameScreen onExit={handleExitGame} onPlayAgain={handlePlayAgain} onGameEnded={handleGameEnded} audio={audio} gamePlayId={gamePlayId} address={address} />
        )}
        {screen === 'leaderboard' && (
          <LeaderboardScreen onGoHome={handleGoHome} address={address} user={user} />
        )}
        {screen === 'profile' && (
          <ProfileScreen
            audio={audio}
            onToggleMute={handleToggleMute}
            onGoHome={handleGoHome}
            address={address}
            checkName={checkName}
            onRename={rename}
          />
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
        {screen === 'privacy' && (
          <PrivacyPolicyScreen onGoHome={handleGoHome} />
        )}
        {screen === 'terms' && (
          <TermsOfServiceScreen onGoHome={handleGoHome} />
        )}
      </div>

      <TxOverlay txStatus={txStatus} onClose={handleCloseTxOverlay} />

      {banned && <BannedOverlay onSignOut={signOut} />}

      {showRejectedToast && (
        <Toast
          message="You have rejected"
          onDone={() => setShowRejectedToast(false)}
        />
      )}

      {showNoEnergyModal && (
        <NoEnergyModal
          onConfirm={() => {
            setShowNoEnergyModal(false);
            setScreen('home');
          }}
        />
      )}
    </div>
  );
}

function NoEnergyModal({ onConfirm }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 950,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(2,48,71,0.55)',
        backdropFilter: 'blur(4px)',
        animation: 'noEnergyFade 0.2s ease',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18,
          minWidth: 280,
          maxWidth: 340,
          boxShadow: '0 24px 64px rgba(2,48,71,0.2)',
          animation: 'noEnergyPop 0.25s ease',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#f59e0b">
            <path d="M11 21h-1l1-7H7.5c-.58 0-.57-.32-.38-.66.19-.34.05-.08.07-.12C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .56.33.47.51l-.07.15C12.96 17.55 11 21 11 21z" />
          </svg>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: 17,
            fontWeight: 700,
            color: '#0f172a',
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          You have no energy left
        </p>

        <button
          onClick={onConfirm}
          style={{
            background: 'linear-gradient(135deg, #f97316, #fbbf24)',
            color: 'white',
            border: 'none',
            borderRadius: 12,
            padding: '12px 32px',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            marginTop: 4,
          }}
        >
          OK
        </button>
      </div>

      <style>{`
        @keyframes noEnergyFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes noEnergyPop {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
