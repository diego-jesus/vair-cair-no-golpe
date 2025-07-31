import { useGameStore } from "../../lib/stores/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Trophy, RotateCcw, Share2, Target, Zap, Award } from "lucide-react";

const ResultScreen = () => {
  const {
    score,
    totalRounds,
    correctAnswers,
    resetGame,
    gameMode
  } = useGameStore();

  const accuracy = Math.round((correctAnswers / totalRounds) * 100);

  // Determinar o nível de "confiança digital"
  const getConfidenceLevel = () => {
    if (accuracy >= 90) return { level: "Caça-Golpes Master", emoji: "🏆", color: "text-yellow-600" };
    if (accuracy >= 80) return { level: "Especialista Digital", emoji: "🛡️", color: "text-green-600" };
    if (accuracy >= 70) return { level: "Navegador Experiente", emoji: "🎯", color: "text-blue-600" };
    if (accuracy >= 60) return { level: "Usuário Consciente", emoji: "👍", color: "text-purple-600" };
    if (accuracy >= 50) return { level: "Aprendiz Cauteloso", emoji: "🤔", color: "text-orange-600" };
    return { level: "Precisa Treinar Mais", emoji: "📚", color: "text-red-600" };
  };

  const confidenceLevel = getConfidenceLevel();

  const getMotivationalMessage = () => {
    if (accuracy >= 90) {
      return "Incrível! Você é praticamente imune a golpes digitais!";
    }
    if (accuracy >= 80) {
      return "Muito bem! Você tem ótima percepção para identificar golpes!";
    }
    if (accuracy >= 70) {
      return "Bom trabalho! Continue praticando para ficar ainda melhor!";
    }
    if (accuracy >= 60) {
      return "No caminho certo! Com mais prática você será um expert!";
    }
    if (accuracy >= 50) {
      return "Você está aprendendo! Continue jogando para melhorar!";
    }
    return "Não desista! A prática leva à perfeição na segurança digital!";
  };

  const shareScore = () => {
    const text = `Acabei de jogar "Vai Cair no Golpe?" e obtive ${accuracy}% de acertos! Sou um ${confidenceLevel.level}! 🎮🛡️`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Vai Cair no Golpe?',
        text: text,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Resultado copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-blue-50">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center pb-2">
          <div className="mb-4">
            <Trophy className="h-16 w-16 text-yellow-600 mx-auto" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Jogo Finalizado!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          {/* Score Section */}
          <div className="mb-8 p-6 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-600">{score}</p>
                <p className="text-sm text-gray-600">Pontos</p>
              </div>
              
              <div>
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-600">{correctAnswers}/{totalRounds}</p>
                <p className="text-sm text-gray-600">Acertos</p>
              </div>
              
              <div>
                <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-600">{accuracy}%</p>
                <p className="text-sm text-gray-600">Precisão</p>
              </div>
            </div>
          </div>

          {/* Confidence Level */}
          <div className="mb-6 p-6 bg-white border-2 border-gray-200 rounded-lg">
            <div className="text-4xl mb-3">{confidenceLevel.emoji}</div>
            <h3 className={`text-2xl font-bold mb-2 ${confidenceLevel.color}`}>
              {confidenceLevel.level}
            </h3>
            <p className="text-gray-700 text-lg">
              {getMotivationalMessage()}
            </p>
          </div>

          {/* Game Mode Info */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              <strong>Modo jogado:</strong> <span className="capitalize">{gameMode}</span>
            </p>
          </div>

          {/* Fun Facts */}
          <div className="mb-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 Você sabia?</h4>
            <p className="text-yellow-700 text-sm">
              {accuracy >= 80 
                ? "Pessoas como você, com alta consciência sobre golpes digitais, ajudam a proteger amigos e família!"
                : "A cada jogo, você fica mais preparado contra golpes reais. Continue praticando!"
              }
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={resetGame}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Jogar Novamente
            </Button>
            
            <Button
              onClick={shareScore}
              variant="outline"
              size="lg"
              className="px-8 py-3"
            >
              <Share2 className="mr-2 h-5 w-5" />
              Compartilhar Resultado
            </Button>
          </div>

          {/* Final Message */}
          <div className="mt-8 text-center">
            <div className="text-2xl mb-2">🛡️</div>
            <p className="text-gray-600 font-medium">
              Mantenha-se sempre alerta contra golpes digitais!
            </p>
            <p className="text-sm text-gray-500 mt-2 italic">
              "Na dúvida, não clique. Na certeza, desconfie!"
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultScreen;
