import { useState, useCallback } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';
import DailyCheckinScreen from './screens/DailyCheckinScreen';
import HelpGuideScreen from './screens/HelpGuideScreen';
import { useAudio } from './audio/useAudio';

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
  const audio = useAudio();

  const handlePlay = useCallback(() => {
    if (energy <= 0) return;
    const next = energy - 1;
    setEnergy(next);
    saveEnergy(next);
    setScreen('game');
  }, [energy]);

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
    </div>
  );
}
