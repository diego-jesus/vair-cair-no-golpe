import { GameMessage } from "../data/messages";

// Utility functions for game mechanics

export const calculateTimeForRound = (round: number): number => {
  // Start with 30 seconds, decrease by 2.5 seconds every 2 rounds
  // Minimum of 10 seconds
  const baseTime = 30;
  const reduction = Math.floor((round - 1) / 2) * 2.5;
  return Math.max(10, baseTime - reduction);
};

export const formatScore = (score: number): string => {
  return score.toLocaleString('pt-BR');
};

export const getConfidenceLevelByAccuracy = (accuracy: number) => {
  if (accuracy >= 90) return {
    level: "Caça-Golpes Master",
    emoji: "🏆",
    color: "text-yellow-600",
    description: "Você é praticamente imune a golpes digitais!"
  };
  
  if (accuracy >= 80) return {
    level: "Especialista Digital",
    emoji: "🛡️",
    color: "text-green-600",
    description: "Você tem ótima percepção para identificar golpes!"
  };
  
  if (accuracy >= 70) return {
    level: "Navegador Experiente",
    emoji: "🎯",
    color: "text-blue-600",
    description: "Bom trabalho! Continue praticando para ficar ainda melhor!"
  };
  
  if (accuracy >= 60) return {
    level: "Usuário Consciente",
    emoji: "👍",
    color: "text-purple-600",
    description: "No caminho certo! Com mais prática você será um expert!"
  };
  
  if (accuracy >= 50) return {
    level: "Aprendiz Cauteloso",
    emoji: "🤔",
    color: "text-orange-600",
    description: "Você está aprendendo! Continue jogando para melhorar!"
  };
  
  return {
    level: "Precisa Treinar Mais",
    emoji: "📚",
    color: "text-red-600",
    description: "Não desista! A prática leva à perfeição na segurança digital!"
  };
};

export const getRandomImpactPhrase = (isCorrect: boolean): string => {
  const correctPhrases = [
    "Mandou bem! 🎯",
    "Caça-golpes no pedaço! 🕵️",
    "Você não cai nessa! 💪",
    "Esperto demais! 🧠",
    "Top demais! 🔥",
    "Sacou na hora! 👏",
    "Expert em segurança! 🔒"
  ];
  
  const incorrectPhrases = [
    "Vacilou, perdeu o FGTS! 💸",
    "Caiu na lábia do golpista! 😅",
    "Quase caiu no golpe do Zap! 📱",
    "Opa! Cuidado aí! ⚠️",
    "Golpe detectado tarde demais! 🚨",
    "Essa pegou você! 😬",
    "Golpista: 1 x Você: 0 😵"
  ];
  
  const phrases = isCorrect ? correctPhrases : incorrectPhrases;
  return phrases[Math.floor(Math.random() * phrases.length)];
};

export const getGameModeDescription = (mode: string): string => {
  switch (mode) {
    case 'classico':
      return 'Mensagens variadas de golpes comuns do dia a dia';
    case 'tiozao':
      return 'Estilo WhatsApp com erros de português e muito emoji';
    case 'empresa':
      return 'Focado em fraudes corporativas e phishing empresarial';
    case 'aprendiz':
      return 'Modo com dicas para quem está começando a aprender';
    default:
      return 'Modo de jogo personalizado';
  }
};

export const validateMessage = (message: GameMessage): boolean => {
  return !!(
    message.id &&
    message.texto &&
    message.resposta &&
    message.categoria &&
    message.tipo &&
    message.explicacao &&
    message.modos &&
    message.modos.length > 0
  );
};

export const getScoreColor = (score: number): string => {
  if (score >= 1000) return 'text-green-600';
  if (score >= 500) return 'text-blue-600';
  if (score >= 0) return 'text-gray-600';
  return 'text-red-600';
};

export const shouldShowComboAnimation = (combo: number): boolean => {
  return combo > 0 && combo % 3 === 0;
};

// Função para detectar se é um dispositivo móvel
export const isMobileDevice = (): boolean => {
  return window.innerWidth <= 768;
};

// Função para vibrar o dispositivo (se suportado)
export const vibrateDevice = (pattern: number | number[] = 100): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

// Função para copiar texto para clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Erro ao copiar para clipboard:', err);
    return false;
  }
};
