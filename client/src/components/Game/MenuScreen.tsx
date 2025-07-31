import { useState } from "react";
import { useGameStore } from "../../lib/stores/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Shield, Target, Brain, Zap, Trophy, Users } from "lucide-react";

const MenuScreen = () => {
  const { startGame, setGameMode, goToLevelSelect } = useGameStore();
  const [selectedMode, setSelectedMode] = useState<'classico' | 'tiozao' | 'empresa' | 'aprendiz'>('classico');

  const gameModes = [
    {
      id: 'classico' as const,
      name: 'Clássico',
      description: 'Mensagens variadas de golpes comuns',
      icon: Target,
      color: 'bg-blue-500'
    },
    {
      id: 'tiozao' as const,
      name: 'Modo Tiozão',
      description: 'Estilo WhatsApp com erros de português',
      icon: Zap,
      color: 'bg-yellow-500'
    },
    {
      id: 'empresa' as const,
      name: 'Modo Empresa',
      description: 'Focado em fraudes corporativas',
      icon: Shield,
      color: 'bg-purple-500'
    },
    {
      id: 'aprendiz' as const,
      name: 'Modo Aprendiz',
      description: 'Com dicas para iniciantes',
      icon: Brain,
      color: 'bg-green-500'
    }
  ];

  const handleQuickStart = () => {
    setGameMode(selectedMode);
    startGame();
  };

  const handlePlayWithLevels = () => {
    setGameMode(selectedMode);
    goToLevelSelect();
  };

  const handleChallenge = () => {
    setGameMode(selectedMode);
    // Navigate to challenge screen - the store will handle this
    useGameStore.setState({ gameState: "challenge" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="mb-4">
            <Shield className="h-16 w-16 text-green-600 mx-auto" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Vai Cair no Golpe?
          </h1>
          <p className="text-gray-600 text-lg">
            Teste sua habilidade para identificar golpes digitais
          </p>
        </div>

        {/* Seleção de Modo */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Escolha o Modo de Jogo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameModes.map((mode) => {
                const IconComponent = mode.icon;
                return (
                  <div
                    key={mode.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedMode === mode.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <div className="flex items-center mb-2">
                      <div className={`p-2 rounded-full ${mode.color} text-white mr-3`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h3 className="font-semibold text-gray-800">{mode.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{mode.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Regras do Jogo */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3 text-gray-800">Como Jogar:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Analise cada mensagem apresentada</li>
              <li>• Decida se é CONFIÁVEL ✅ ou GOLPE 🚨</li>
              <li>• Acerto: +100 pontos / Erro: -200 pontos</li>
              <li>• Combo de 3 acertos: +50 bônus</li>
              <li>• O tempo diminui a cada fase</li>
            </ul>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="grid gap-4">
          {/* Início Rápido */}
          <Button
            onClick={handleQuickStart}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold"
          >
            🚀 Jogo Rápido (10 perguntas)
          </Button>

          {/* Modo Níveis */}
          <Button
            onClick={handlePlayWithLevels}
            size="lg"
            variant="outline"
            className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
          >
            <Trophy className="mr-2 h-6 w-6" />
            Jogar por Níveis (10 níveis)
          </Button>

          {/* Modo Desafio */}
          <Button
            onClick={handleChallenge}
            size="lg"
            variant="outline"
            className="border-2 border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 text-lg font-semibold"
          >
            <Users className="mr-2 h-6 w-6" />
            Desafiar um Amigo
          </Button>
        </div>

        {/* Footer com Dica */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 italic">
            "Golpe tá aí, cai quem dorme!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
