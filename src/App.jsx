import { useState, useCallback } from 'react';
import Navigation from './components/Navigation';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useAudio } from './audio/useAudio';

export default function App() {
  const [screen, setScreen] = useState('home');
  const audio = useAudio();

  const handlePlay = useCallback(() => {
    setScreen('game');
  }, []);

  const handleExitGame = useCallback(() => {
    setScreen('home');
  }, []);

  const handleToggleMute = useCallback(() => {
    audio.toggleMute();
  }, [audio]);

  const isGame = screen === 'game';

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
          <HomeScreen onPlay={handlePlay} audio={audio} />
        )}
        {screen === 'game' && (
          <GameScreen onExit={handleExitGame} audio={audio} />
        )}
        {screen === 'leaderboard' && (
          <LeaderboardScreen />
        )}
        {screen === 'profile' && (
          <ProfileScreen audio={audio} onToggleMute={handleToggleMute} />
        )}

        {!isGame && (
          <Navigation screen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
}
