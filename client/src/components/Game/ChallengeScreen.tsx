import { useState } from "react";
import { useGameStore } from "../../lib/stores/useGameStore";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ArrowLeft, Users, Copy, CheckCircle, UserPlus, Sword } from "lucide-react";

const ChallengeScreen = () => {
  const { 
    challengeCode, 
    createChallenge, 
    joinChallenge, 
    resetGame,
    setGameMode 
  } = useGameStore();
  
  const [joinCode, setJoinCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedMode, setSelectedMode] = useState<'classico' | 'tiozao' | 'empresa' | 'aprendiz'>('classico');

  const handleCreateChallenge = () => {
    setGameMode(selectedMode);
    const code = createChallenge();
    console.log('Código do desafio criado:', code);
  };

  const handleJoinChallenge = () => {
    if (joinCode.length === 6) {
      joinChallenge(joinCode.toUpperCase());
    }
  };

  const copyCode = async () => {
    if (challengeCode) {
      try {
        await navigator.clipboard.writeText(challengeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar código:', err);
      }
    }
  };

  const shareChallenge = () => {
    const text = `Desafie-me no "Vai Cair no Golpe?"! Use o código: ${challengeCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Desafio - Vai Cair no Golpe?',
        text: text,
        url: window.location.href,
      });
    } else {
      copyCode();
    }
  };

  const gameModes = [
    {
      id: 'classico' as const,
      name: 'Clássico',
      description: 'Mensagens variadas',
      icon: '🎯',
      color: 'bg-blue-500'
    },
    {
      id: 'tiozao' as const,
      name: 'Tiozão',
      description: 'Estilo WhatsApp',
      icon: '⚡',
      color: 'bg-yellow-500'
    },
    {
      id: 'empresa' as const,
      name: 'Empresa',
      description: 'Fraudes corporativas',
      icon: '🛡️',
      color: 'bg-purple-500'
    },
    {
      id: 'aprendiz' as const,
      name: 'Aprendiz',
      description: 'Com dicas',
      icon: '🧠',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
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
              <h1 className="text-2xl font-bold text-gray-800">Modo Desafio</h1>
              <p className="text-gray-600">Desafie um amigo online!</p>
            </div>
            
            <div></div>
          </div>
        </div>

        {!challengeCode ? (
          <>
            {/* Create Challenge */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="h-6 w-6 text-orange-600" />
                  Criar Desafio
                </CardTitle>
                <p className="text-gray-600">
                  Crie um código de desafio e compartilhe com um amigo
                </p>
              </CardHeader>
              <CardContent>
                {/* Mode Selection */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Escolha o modo do desafio:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {gameModes.map((mode) => (
                      <div
                        key={mode.id}
                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedMode === mode.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedMode(mode.id)}
                      >
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{mode.icon}</span>
                          <div>
                            <p className="font-semibold text-sm">{mode.name}</p>
                            <p className="text-xs text-gray-600">{mode.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCreateChallenge}
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Criar Código de Desafio
                </Button>
              </CardContent>
            </Card>

            {/* Join Challenge */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-6 w-6 text-blue-600" />
                  Entrar em Desafio
                </CardTitle>
                <p className="text-gray-600">
                  Digite o código que seu amigo compartilhou
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Input
                    placeholder="Digite o código (6 letras)"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="text-center text-lg font-mono tracking-widest"
                  />
                  <Button
                    onClick={handleJoinChallenge}
                    disabled={joinCode.length !== 6}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Entrar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Challenge Code Created */
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-green-600">
                Desafio Criado!
              </CardTitle>
              <p className="text-center text-gray-600">
                Compartilhe este código com seu amigo
              </p>
            </CardHeader>
            <CardContent className="text-center">
              {/* Challenge Code Display */}
              <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-dashed">
                <div className="text-4xl font-mono font-bold text-gray-800 tracking-widest mb-3">
                  {challengeCode}
                </div>
                <p className="text-sm text-gray-600">Código do Desafio</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={copyCode}
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                      Código Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-5 w-5" />
                      Copiar Código
                    </>
                  )}
                </Button>

                <Button
                  onClick={shareChallenge}
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Compartilhar Desafio
                </Button>
              </div>

              {/* Waiting Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="animate-pulse">
                  <div className="text-2xl mb-2">⏳</div>
                  <p className="font-semibold text-blue-800">Aguardando oponente...</p>
                  <p className="text-sm text-blue-600">
                    O jogo começará assim que seu amigo entrar com o código
                  </p>
                </div>
              </div>

              {/* Challenge Rules */}
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800 mb-2">📋 Regras do Desafio</h4>
                <ul className="text-sm text-yellow-700 text-left space-y-1">
                  <li>• Ambos jogadores respondem as mesmas 10 perguntas</li>
                  <li>• Ganha quem fizer mais pontos</li>
                  <li>• Tempo limite de 30 segundos por pergunta</li>
                  <li>• Combo de acertos vale bônus extra</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChallengeScreen;