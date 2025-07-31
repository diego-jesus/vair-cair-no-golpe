import { useState, useEffect } from "react";
import { useGameStore } from "../../lib/stores/useGameStore";
import { useAudio } from "../../lib/stores/useAudio";
import MessageBubble from "./MessageBubble";
import Timer from "./Timer";
import ScoreDisplay from "./ScoreDisplay";
import { Button } from "../ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";

const GameScreen = () => {
  const {
    currentMessage,
    currentRound,
    totalRounds,
    timeLeft,
    score,
    combo,
    gameMode,
    submitAnswer,
    endGame,
    messages,
    currentMessageIndex
  } = useGameStore();

  const { playHit, playSuccess } = useAudio();
  const [isAnswering, setIsAnswering] = useState(false);

  // Auto end game when time runs out
  useEffect(() => {
    if (timeLeft <= 0 && !isAnswering) {
      endGame();
    }
  }, [timeLeft, endGame, isAnswering]);

  const handleAnswer = async (answer: 'confiavel' | 'golpe') => {
    if (isAnswering) return;
    
    setIsAnswering(true);
    const isCorrect = submitAnswer(answer);
    
    // Play sound based on result
    if (isCorrect) {
      playSuccess();
    } else {
      playHit();
    }

    // Small delay before showing feedback
    setTimeout(() => {
      setIsAnswering(false);
    }, 500);
  };

  if (!currentMessage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Carregando mensagem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-lg">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h2 className="text-xl font-semibold">Vai Cair no Golpe?</h2>
            <p className="text-green-100 text-sm capitalize">Modo: {gameMode}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Rodada {currentRound} de {totalRounds}</p>
            <Timer timeLeft={timeLeft} />
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4">
          <ScoreDisplay score={score} combo={combo} />
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-gray-300 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentMessageIndex + 1) / messages.length) * 100}%` }}
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              Mensagem {currentMessageIndex + 1} de {messages.length}
            </p>
          </div>

          {/* Message */}
          <MessageBubble message={currentMessage} gameMode={gameMode} />

          {/* Answer Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button
              onClick={() => handleAnswer('confiavel')}
              disabled={isAnswering}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold min-w-[150px]"
            >
              <CheckCircle className="mr-2 h-6 w-6" />
              Confiável
            </Button>
            
            <Button
              onClick={() => handleAnswer('golpe')}
              disabled={isAnswering}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold min-w-[150px]"
            >
              <AlertTriangle className="mr-2 h-6 w-6" />
              Golpe
            </Button>
          </div>

          {/* Tip for Aprendiz Mode */}
          {gameMode === 'aprendiz' && currentMessage.dica && (
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    <strong>💡 Dica:</strong> {currentMessage.dica}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
