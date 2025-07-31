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
      name: '🎯 Clássico',
      description: 'Vários tipos de golpe do dia a dia',
      icon: Target,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      emoji: '🎯'
    },
    {
      id: 'tiozao' as const,
      name: '⚡ Modo Tiozão',
      description: 'Golpes do WhatsApp "do jeito brasileiro"',
      icon: Zap,
      color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      emoji: '⚡'
    },
    {
      id: 'empresa' as const,
      name: '🏢 Modo Empresa',
      description: 'Golpes que chegam no trabalho',
      icon: Shield,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      emoji: '🏢'
    },
    {
      id: 'aprendiz' as const,
      name: '🧠 Modo Fácil',
      description: 'Com dicas pra quem tá começando',
      icon: Brain,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      emoji: '🧠'
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
    <div className="p-4 py-8" style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="max-w-2xl w-full my-8">
        {/* Logo e Título */}
        <div className="text-center mb-8">
          <div className="mb-4 relative">
            <div className="text-6xl mb-4 animate-bounce">🛡️</div>
            <div className="absolute -top-2 -right-8 text-3xl animate-pulse">⚡</div>
            <div className="absolute -top-4 -left-6 text-2xl animate-bounce delay-500">🔍</div>
          </div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-3">
            VAI CAIR NO GOLPE? 🤔
          </h1>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            🎮 O jogo que te ensina a não cair em roubada! 
          </p>
          <p className="text-lg text-gray-600">
            Aprenda se divertindo! 💪 Proteja seu dinheiro! 💰
          </p>
        </div>

        {/* Seleção de Modo */}
        <Card className="mb-6 card-hover bg-white/80 backdrop-blur border-2 border-white/50 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-center text-2xl font-bold">
              🎮 Escolha Seu Desafio! 
            </CardTitle>
            <p className="text-center text-indigo-100">Cada modo tem suas pegadinhas!</p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gameModes.map((mode) => {
                return (
                  <div
                    key={mode.id}
                    className={`p-5 rounded-xl border-3 cursor-pointer transition-all transform hover:scale-105 card-hover ${
                      selectedMode === mode.id
                        ? 'border-yellow-400 bg-yellow-50 shadow-xl scale-105'
                        : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-lg'
                    }`}
                    onClick={() => setSelectedMode(mode.id)}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{mode.emoji}</div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{mode.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{mode.description}</p>
                      {selectedMode === mode.id && (
                        <div className="mt-3 text-yellow-600 font-semibold">
                          ✨ Selecionado! ✨
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Regras do Jogo */}
        <Card className="mb-6 card-hover bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300">
          <CardContent className="pt-6">
            <h3 className="font-bold mb-4 text-xl text-gray-800 text-center">
              📋 Como Jogar e Ganhar Pontos:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-white rounded-lg shadow">
                  <span className="text-2xl mr-3">🔍</span>
                  <span className="font-medium">Analise cada mensagem com cuidado</span>
                </div>
                <div className="flex items-center p-3 bg-white rounded-lg shadow">
                  <span className="text-2xl mr-3">✅</span>
                  <span className="font-medium">Decida: CONFIÁVEL ou GOLPE</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                  <span className="text-2xl mr-3">💯</span>
                  <span className="font-medium">Acerto = +100 pontos!</span>
                </div>
                <div className="flex items-center p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                  <span className="text-2xl mr-3">🔥</span>
                  <span className="font-medium">3 seguidos = +50 bônus!</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="grid gap-5">
          {/* Instrução de seleção */}
          <div className="text-center p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-lg font-semibold text-blue-800">
              👆 Primeiro escolha um modo acima, depois clique no botão desejado!
            </p>
          </div>

          {/* Início Rápido */}
          <Button
            onClick={handleQuickStart}
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-5 text-xl font-bold shadow-2xl button-bounce transform hover:scale-105 transition-all"
          >
            <span className="text-2xl mr-3">🚀</span>
            JOGAR AGORA! (10 perguntas - {gameModes.find(m => m.id === selectedMode)?.name || 'Modo Clássico'})
          </Button>

          {/* Modo Níveis */}
          <Button
            onClick={handlePlayWithLevels}
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-5 text-xl font-bold shadow-xl transform hover:scale-105 transition-all"
          >
            <span className="text-2xl mr-3">🏆</span>
            MODO NÍVEIS (100 perguntas - {gameModes.find(m => m.id === selectedMode)?.name || 'Modo Clássico'})
          </Button>

          {/* Modo Desafio */}
          <Button
            onClick={handleChallenge}
            size="lg"
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-5 text-xl font-bold shadow-xl transform hover:scale-105 transition-all"
          >
            <span className="text-2xl mr-3">⚔️</span>
            DESAFIAR AMIGO! ({gameModes.find(m => m.id === selectedMode)?.name || 'Modo Clássico'})
          </Button>

          {/* Biblioteca Educativa */}
          <Button
            onClick={() => useGameStore.setState({ gameState: "education" })}
            size="lg"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-5 text-xl font-bold shadow-xl transform hover:scale-105 transition-all"
          >
            <span className="text-2xl mr-3">📚</span>
            BIBLIOTECA ANTI-GOLPE!
          </Button>
        </div>

        {/* Footer com Dica */}
        <div className="text-center mt-8">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black p-4 rounded-xl shadow-lg">
            <p className="text-lg font-bold">
              💡 "Golpe tá aí, cai quem dorme!" 
            </p>
            <p className="text-sm mt-1">
              Aprenda brincando e proteja sua família! 🛡️💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuScreen;
