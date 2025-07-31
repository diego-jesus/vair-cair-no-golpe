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
    <div className="min-h-screen game-gradient flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white p-4 shadow-2xl">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold">🎯 VAI CAIR NO GOLPE?</h2>
            <p className="text-pink-100 text-sm font-semibold capitalize">
              🎮 Modo: {gameMode === 'classico' ? '🎯 Clássico' : 
                       gameMode === 'tiozao' ? '⚡ Tiozão' : 
                       gameMode === 'empresa' ? '🏢 Empresa' : '🧠 Aprendiz'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-pink-100 font-semibold">🎲 Rodada {currentRound} de {totalRounds}</p>
            <Timer timeLeft={timeLeft} />
          </div>
        </div>
      </div>

      {/* Score Display */}
      <div className="bg-white/90 backdrop-blur shadow-xl border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <div className="text-center bg-green-100 p-3 rounded-xl shadow">
                <p className="text-xs text-green-700 font-semibold">💰 PONTUAÇÃO</p>
                <p className="text-2xl font-black text-green-600">{score}</p>
              </div>
              <div className="text-center bg-orange-100 p-3 rounded-xl shadow">
                <p className="text-xs text-orange-700 font-semibold">🔥 COMBO</p>
                <p className="text-xl font-black text-orange-600">{combo}x</p>
              </div>
              <div className="text-center bg-blue-100 p-3 rounded-xl shadow">
                <p className="text-xs text-blue-700 font-semibold">✅ ACERTOS</p>
                <p className="text-xl font-black text-blue-600">{correctAnswers}/{currentRound - 1}</p>
              </div>
            </div>
            
            <Button 
              onClick={returnToMenu}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold px-4 py-2 rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              🏠 MENU
            </Button>
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {/* Progress Bar */}
          <div className="mb-6 bg-white/80 p-4 rounded-xl shadow-lg">
            <div className="bg-gray-200 rounded-full h-4 border-2 border-gray-300">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-full rounded-full transition-all duration-500 flex items-center justify-end"
                style={{ width: `${((currentMessageIndex + 1) / messages.length) * 100}%` }}
              >
                <span className="text-white text-xs font-bold mr-2">
                  {Math.round(((currentMessageIndex + 1) / messages.length) * 100)}%
                </span>
              </div>
            </div>
            <p className="text-center text-lg font-bold text-gray-700 mt-3">
              📱 Mensagem {currentMessageIndex + 1} de {messages.length}
            </p>
          </div>

          {/* Message */}
          <MessageBubble message={currentMessage} gameMode={gameMode} />

          {/* Answer Buttons */}
          <div className="flex gap-6 justify-center mt-8">
            <Button
              onClick={() => handleAnswer('confiavel')}
              disabled={isAnswering}
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-6 text-xl font-bold min-w-[180px] shadow-2xl transform hover:scale-110 transition-all duration-200 border-4 border-green-300"
            >
              <span className="text-2xl mr-3">✅</span>
              CONFIÁVEL
            </Button>
            
            <Button
              onClick={() => handleAnswer('golpe')}
              disabled={isAnswering}
              size="lg"
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-10 py-6 text-xl font-bold min-w-[180px] shadow-2xl transform hover:scale-110 transition-all duration-200 border-4 border-red-300"
            >
              <span className="text-2xl mr-3">🚨</span>
              É GOLPE!
            </Button>
          </div>

          {/* Tip for Aprendiz Mode */}
          {gameMode === 'aprendiz' && currentMessage.dica && (
            <div className="mt-6 p-5 bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-yellow-400 rounded-xl shadow-lg">
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-800 mb-2">
                  💡 DICA ESPECIAL PARA VOCÊ:
                </p>
                <p className="text-base text-yellow-900 font-semibold leading-relaxed">
                  {currentMessage.dica}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameScreen;
