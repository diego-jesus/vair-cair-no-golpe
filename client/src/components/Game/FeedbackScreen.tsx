import { useEffect } from "react";
import { useGameStore } from "../../lib/stores/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { CheckCircle, XCircle, Target, Zap } from "lucide-react";

const FeedbackScreen = () => {
  const {
    lastAnswer,
    currentMessage,
    score,
    combo,
    nextRound,
    currentRound,
    totalRounds
  } = useGameStore();

  const isCorrect = lastAnswer?.isCorrect || false;
  const explanation = currentMessage?.explicacao || '';

  // Auto advance after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextRound();
    }, 3000);

    return () => clearTimeout(timer);
  }, [nextRound]);

  // Frases de impacto baseadas no resultado
  const getImpactPhrase = () => {
    if (isCorrect) {
      const phrases = [
        "Mandou bem! 🎯",
        "Caça-golpes no pedaço! 🕵️",
        "Você não cai nessa! 💪",
        "Esperto demais! 🧠",
        "Top demais! 🔥"
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    } else {
      const phrases = [
        "Vacilou, perdeu o FGTS! 💸",
        "Caiu na lábia do golpista! 😅",
        "Quase caiu no golpe do Zap! 📱",
        "Opa! Cuidado aí! ⚠️",
        "Golpe detectado tarde demais! 🚨"
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-8 text-center">
          {/* Result Icon and Message */}
          <div className="mb-6">
            {isCorrect ? (
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            ) : (
              <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
            )}
            
            <h2 className={`text-3xl font-bold mb-2 ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}>
              {isCorrect ? 'Correto!' : 'Errou!'}
            </h2>
            
            <p className="text-xl text-gray-700 mb-4">
              {getImpactPhrase()}
            </p>
          </div>

          {/* Score Update */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-center items-center gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Pontos Ganhos</p>
                <p className={`text-2xl font-bold ${
                  lastAnswer?.pointsEarned >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {lastAnswer?.pointsEarned >= 0 ? '+' : ''}{lastAnswer?.pointsEarned}
                </p>
              </div>
              
              {combo >= 3 && (
                <div className="text-center">
                  <Zap className="h-6 w-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-sm text-orange-600">Combo Bônus!</p>
                  <p className="text-lg font-bold text-orange-600">+50</p>
                </div>
              )}
              
              <div className="text-center">
                <Target className="h-6 w-6 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-blue-600">{score}</p>
              </div>
            </div>
          </div>

          {/* Explanation */}
          {explanation && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Explicação:</h4>
              <p className="text-blue-800 text-left">{explanation}</p>
            </div>
          )}

          {/* Correct Answer */}
          <div className="mb-6 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">
              Resposta correta: <span className="font-semibold capitalize">
                {currentMessage?.resposta}
              </span>
            </p>
          </div>

          {/* Progress */}
          <div className="mb-6">
            <p className="text-gray-600">
              Rodada {currentRound} de {totalRounds}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentRound / totalRounds) * 100}%` }}
              />
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={nextRound}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
          >
            {currentRound >= totalRounds ? 'Ver Resultado Final' : 'Próxima Mensagem'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackScreen;
