import { useState } from "react";
import { useGameStore } from "../../lib/stores/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowLeft, Star, Lock, Play } from "lucide-react";

const LevelSelectScreen = () => {
  const { gameMode, setCurrentLevel, startGame, resetGame } = useGameStore();
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Para demonstração, vamos simular níveis desbloqueados
  // Em uma implementação real, isso viria de um sistema de progresso
  const unlockedLevels = 10; // Todos os níveis desbloqueados para demo

  const levels = Array.from({ length: 10 }, (_, i) => ({
    number: i + 1,
    difficulty: i < 3 ? 'Fácil' : i < 6 ? 'Médio' : i < 9 ? 'Difícil' : 'Expert',
    description: `Nível ${i + 1} - Mix de fraudes e mensagens confiáveis`,
    isUnlocked: i < unlockedLevels,
    stars: Math.floor(Math.random() * 4) // Simular estrelas ganhas (0-3)
  }));

  const handleStartLevel = () => {
    setCurrentLevel(selectedLevel);
    startGame(selectedLevel);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return 'text-green-600 bg-green-50';
      case 'Médio': return 'text-yellow-600 bg-yellow-50';
      case 'Difícil': return 'text-orange-600 bg-orange-50';
      case 'Expert': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getModeIcon = () => {
    switch (gameMode) {
      case 'classico': return '🎯';
      case 'tiozao': return '⚡';
      case 'empresa': return '🛡️';
      case 'aprendiz': return '🧠';
      default: return '🎮';
    }
  };

  const getModeName = () => {
    switch (gameMode) {
      case 'classico': return 'Clássico';
      case 'tiozao': return 'Tiozão';
      case 'empresa': return 'Empresa';
      case 'aprendiz': return 'Aprendiz';
      default: return 'Modo';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              onClick={resetGame}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Menu
            </Button>
            
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800">Seleção de Níveis</h1>
              <p className="text-gray-600">
                {getModeIcon()} Modo {getModeName()}
              </p>
            </div>
            
            <div></div> {/* Spacer */}
          </div>
        </div>

        {/* Level Grid */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Escolha seu Nível</CardTitle>
            <p className="text-center text-gray-600">
              Cada nível tem 10 perguntas com mix de fraudes e mensagens confiáveis
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {levels.map((level) => (
                <div
                  key={level.number}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedLevel === level.number
                      ? 'border-green-500 bg-green-50'
                      : level.isUnlocked
                      ? 'border-gray-200 hover:border-gray-300 bg-white'
                      : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-50'
                  }`}
                  onClick={() => level.isUnlocked && setSelectedLevel(level.number)}
                >
                  <div className="text-center">
                    {level.isUnlocked ? (
                      <>
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                          {level.number}
                        </div>
                        
                        {/* Stars */}
                        <div className="flex justify-center mb-2">
                          {[1, 2, 3].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= level.stars
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        
                        {/* Difficulty */}
                        <div className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(level.difficulty)}`}>
                          {level.difficulty}
                        </div>
                      </>
                    ) : (
                      <>
                        <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <div className="text-lg font-bold text-gray-400">
                          {level.number}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Selected Level Info */}
        {selectedLevel && levels[selectedLevel - 1]?.isUnlocked && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Nível {selectedLevel} - {levels[selectedLevel - 1].difficulty}
                </h3>
                <p className="text-gray-600 mb-4">
                  {levels[selectedLevel - 1].description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">10</div>
                    <div className="text-sm text-gray-600">Perguntas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">5+5</div>
                    <div className="text-sm text-gray-600">Golpe + Confiável</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">30s</div>
                    <div className="text-sm text-gray-600">Por pergunta</div>
                  </div>
                </div>

                <Button
                  onClick={handleStartLevel}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Começar Nível {selectedLevel}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <h4 className="font-semibold text-gray-800 mb-3">Seu Progresso</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-green-600 font-semibold">Níveis Completos</div>
                  <div className="text-2xl font-bold text-green-700">{unlockedLevels - 1}/10</div>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="text-yellow-600 font-semibold">Estrelas Coletadas</div>
                  <div className="text-2xl font-bold text-yellow-700">
                    {levels.reduce((acc, level) => acc + level.stars, 0)}/30
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-blue-600 font-semibold">Nível Atual</div>
                  <div className="text-2xl font-bold text-blue-700">{unlockedLevels}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LevelSelectScreen;