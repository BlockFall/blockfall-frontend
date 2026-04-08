import { useState, useCallback, useEffect } from 'react';
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
import { TxOverlay, Toast } from './components/TxOverlay';

function getEnergy() {
  const stored = localStorage.getItem('blockfall_energy');
  if (stored === null) return 10;
  return parseInt(stored, 10);
}

function saveEnergy(value) {
  localStorage.setItem('blockfall_energy', String(value));
}

export default function App() {
  const [screen, setScreen] = useState('home');
  const [energy, setEnergy] = useState(getEnergy);
  const [showRejectedToast, setShowRejectedToast] = useState(false);
  const audio = useAudio();

  const { isConnected } = useAccount();
  const { connect } = useConnect();
  const { reconnect } = useReconnect();
  const { startPlay, txStatus, resetTxStatus } = usePlayGame();

  // Auto-connect if window.ethereum is present (MiniPay or any injected wallet)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      reconnect();
    }
  }, [reconnect]);

  const handleConnectWallet = useCallback(() => {
    connect({ connector: injected() });
  }, [connect]);

  const handlePlay = useCallback(async () => {
    if (energy <= 0) return;
    audio.initAudio();

    const success = await startPlay();
    if (success) {
      const next = energy - 1;
      setEnergy(next);
      saveEnergy(next);
      setScreen('game');
    }
  }, [energy, audio, startPlay]);

  const handleExitGame = useCallback(() => {
    setScreen('home');
  }, []);

  const handleToggleMute = useCallback(() => {
    audio.toggleMute();
  }, [audio]);

  const handleGoHome = useCallback(() => {
    setScreen('home');
  }, []);

  const handleAddEnergy = useCallback((amount) => {
    const next = energy + amount;
    setEnergy(next);
    saveEnergy(next);
  }, [energy]);

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
          />
        )}
        {screen === 'game' && (
          <GameScreen onExit={handleExitGame} audio={audio} />
        )}
        {screen === 'leaderboard' && (
          <LeaderboardScreen onGoHome={handleGoHome} />
        )}
        {screen === 'profile' && (
          <ProfileScreen audio={audio} onToggleMute={handleToggleMute} onGoHome={handleGoHome} />
        )}
        {screen === 'shop' && (
          <ShopScreen onGoHome={handleGoHome} onAddEnergy={handleAddEnergy} />
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
