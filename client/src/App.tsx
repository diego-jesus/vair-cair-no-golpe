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
    <div className="menu-gradient font-inter" style={{ minHeight: '100vh', width: '100%', overflow: 'visible', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        {renderCurrentScreen()}
      </div>
      {/* Rodapé com informações de licença */}
      <footer className="bg-gray-800/90 backdrop-blur text-white text-center py-3 px-4 text-sm">
        <p>
          Projeto aberto sob licença Apache 2.0. © 2025 Diego Oliveira. Não é autorizado o uso do nome ou identidade visual sem permissão.
        </p>
      </footer>
    </div>
  );
}

export default App;
