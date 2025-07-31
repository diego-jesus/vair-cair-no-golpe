import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameMessage, getMessagesByMode, shuffleMessages } from "../../data/messages";

export type GameState = "menu" | "level-select" | "playing" | "feedback" | "result" | "challenge" | "challenge-waiting" | "challenge-playing" | "education";
export type GameMode = "classico" | "tiozao" | "empresa" | "aprendiz";

interface LastAnswer {
  answer: 'confiavel' | 'golpe';
  isCorrect: boolean;
  pointsEarned: number;
}

interface GameStore {
  // Game state
  gameState: GameState;
  gameMode: GameMode;
  currentLevel: number;
  
  // Game data
  messages: GameMessage[];
  currentMessageIndex: number;
  currentMessage: GameMessage | null;
  
  // Round info
  currentRound: number;
  totalRounds: number;
  timeLeft: number;
  
  // Score and progress
  score: number;
  combo: number;
  correctAnswers: number;
  lastAnswer: LastAnswer | null;
  
  // Challenge mode
  challengeCode: string | null;
  isChallenger: boolean;
  opponentScore: number;
  challengeResults: any | null;
  
  // Actions
  setGameState: (state: GameState) => void;
  setGameMode: (mode: GameMode) => void;
  setCurrentLevel: (level: number) => void;
  startGame: (level?: number) => void;
  submitAnswer: (answer: 'confiavel' | 'golpe') => boolean;
  nextRound: () => void;
  endGame: () => void;
  resetGame: () => void;
  goToLevelSelect: () => void;
  
  // Challenge actions
  createChallenge: () => string;
  joinChallenge: (code: string) => void;
  
  // Timer
  tickTimer: () => void;
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    gameState: "menu",
    gameMode: "classico",
    currentLevel: 1,
    
    messages: [],
    currentMessageIndex: 0,
    currentMessage: null,
    
    currentRound: 1,
    totalRounds: 10,
    timeLeft: 45,
    
    score: 0,
    combo: 0,
    correctAnswers: 0,
    lastAnswer: null,
    
    // Challenge state
    challengeCode: null,
    isChallenger: false,
    opponentScore: 0,
    challengeResults: null,
    
    // Actions
    setGameState: (state) => set({ gameState: state }),
    
    setGameMode: (mode) => set({ gameMode: mode }),
    
    setCurrentLevel: (level) => set({ currentLevel: level }),
    
    goToLevelSelect: () => set({ gameState: "level-select" }),
    
    startGame: (level) => {
      const state = get();
      const currentGameLevel = level || state.currentLevel;
      const availableMessages = getMessagesByMode(state.gameMode);
      
      // Ensure balanced mix of golpe and confiavel messages
      const golpeMessages = availableMessages.filter(m => m.resposta === 'golpe');
      const confiavelMessages = availableMessages.filter(m => m.resposta === 'confiavel');
      
      // For each level, select 5 golpe + 5 confiavel messages
      const selectedGolpe = shuffleMessages(golpeMessages).slice(0, 5);
      const selectedConfiavel = shuffleMessages(confiavelMessages).slice(0, 5);
      const levelMessages = shuffleMessages([...selectedGolpe, ...selectedConfiavel]);
      
      set({
        gameState: "playing",
        currentLevel: currentGameLevel,
        messages: levelMessages,
        currentMessageIndex: 0,
        currentMessage: levelMessages[0],
        currentRound: 1,
        timeLeft: 45,
        score: 0,
        combo: 0,
        correctAnswers: 0,
        lastAnswer: null
      });
    },
    
    createChallenge: () => {
      const code = Math.random().toString(36).substr(2, 6).toUpperCase();
      set({ 
        challengeCode: code,
        isChallenger: true,
        gameState: "challenge-waiting"
      });
      return code;
    },
    
    joinChallenge: (code) => {
      set({ 
        challengeCode: code,
        isChallenger: false,
        gameState: "challenge-playing"
      });
    },
    
    submitAnswer: (answer) => {
      const state = get();
      if (!state.currentMessage) return false;
      
      const isCorrect = state.currentMessage.resposta === answer;
      let pointsEarned = isCorrect ? 100 : -200;
      let newCombo = isCorrect ? state.combo + 1 : 0;
      let newScore = state.score + pointsEarned;
      
      // Combo bonus every 3 correct answers
      if (newCombo > 0 && newCombo % 3 === 0) {
        pointsEarned += 50;
        newScore += 50;
      }
      
      const newCorrectAnswers = isCorrect ? state.correctAnswers + 1 : state.correctAnswers;
      
      set({
        gameState: "feedback",
        score: newScore,
        combo: newCombo,
        correctAnswers: newCorrectAnswers,
        lastAnswer: {
          answer,
          isCorrect,
          pointsEarned
        }
      });
      
      return isCorrect;
    },
    
    nextRound: () => {
      const state = get();
      
      if (state.currentRound >= state.totalRounds) {
        set({ gameState: "result" });
        return;
      }
      
      const nextIndex = state.currentMessageIndex + 1;
      const nextMessage = state.messages[nextIndex];
      
      // Decrease time as rounds progress (minimum 20 seconds)
      const newTimeLeft = Math.max(20, 45 - Math.floor(state.currentRound / 2) * 5);
      
      set({
        gameState: "playing",
        currentRound: state.currentRound + 1,
        currentMessageIndex: nextIndex,
        currentMessage: nextMessage,
        timeLeft: newTimeLeft,
        lastAnswer: null
      });
    },
    
    endGame: () => {
      set({ gameState: "result" });
    },
    
    resetGame: () => {
      set({
        gameState: "menu",
        gameMode: "classico",
        currentLevel: 1,
        messages: [],
        currentMessageIndex: 0,
        currentMessage: null,
        currentRound: 1,
        totalRounds: 10,
        timeLeft: 45,
        score: 0,
        combo: 0,
        correctAnswers: 0,
        lastAnswer: null,
        challengeCode: null,
        isChallenger: false,
        opponentScore: 0,
        challengeResults: null
      });
    },
    
    tickTimer: () => {
      const state = get();
      if (state.gameState === "playing" && state.timeLeft > 0) {
        set({ timeLeft: state.timeLeft - 1 });
      }
    }
  }))
);

// Timer subscription - runs every second when game is playing
let timerInterval: NodeJS.Timeout | null = null;

useGameStore.subscribe(
  (state) => state.gameState,
  (gameState) => {
    if (gameState === "playing") {
      // Start timer
      timerInterval = setInterval(() => {
        useGameStore.getState().tickTimer();
      }, 1000);
    } else {
      // Stop timer
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
    }
  }
);
