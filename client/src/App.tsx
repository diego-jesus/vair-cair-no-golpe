import { useState, useEffect } from "react";
import { useGameStore } from "./lib/stores/useGameStore";
import MenuScreen from "./components/Game/MenuScreen";
import GameScreen from "./components/Game/GameScreen";
import FeedbackScreen from "./components/Game/FeedbackScreen";
import ResultScreen from "./components/Game/ResultScreen";
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
      case 'playing':
        return <GameScreen />;
      case 'feedback':
        return <FeedbackScreen />;
      case 'result':
        return <ResultScreen />;
      default:
        return <MenuScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-inter">
      {renderCurrentScreen()}
    </div>
  );
}

export default App;
