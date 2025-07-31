import { useState, useEffect } from "react";
import { useGameStore } from "./lib/stores/useGameStore";
import MenuScreen from "./components/Game/MenuScreen";
import LevelSelectScreen from "./components/Game/LevelSelectScreen";
import GameScreen from "./components/Game/GameScreen";
import FeedbackScreen from "./components/Game/FeedbackScreen";
import ResultScreen from "./components/Game/ResultScreen";
import ChallengeScreen from "./components/Game/ChallengeScreen";
import EducationScreen from "./components/Game/EducationScreen";
import { useAudio } from "./lib/stores/useAudio";
import "@fontsource/inter";

function App() {
  const { gameState } = useGameStore();
  const { setHitSound, setSuccessSound } = useAudio();

  // Load audio files
  useEffect(() => {
    const hitAudio = new Audio('/sounds/hit.mp3');
    const successAudio = new Audio('/sounds/success.mp3');
    
    hitAudio.preload = 'auto';
    successAudio.preload = 'auto';
    
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
  }, [setHitSound, setSuccessSound]);

  const renderCurrentScreen = () => {
    switch (gameState) {
      case 'menu':
        return <MenuScreen />;
      case 'level-select':
        return <LevelSelectScreen />;
      case 'playing':
        return <GameScreen />;
      case 'feedback':
        return <FeedbackScreen />;
      case 'result':
        return <ResultScreen />;
      case 'challenge':
      case 'challenge-waiting':
        return <ChallengeScreen />;
      case 'challenge-playing':
        return <GameScreen />;
      case 'education':
        return <EducationScreen />;
      default:
        return <MenuScreen />;
    }
  };

  return (
    <div className="menu-gradient font-inter" style={{ minHeight: '100vh', width: '100%', overflow: 'visible' }}>
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
