import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { GameMessage, getMessagesByMode, shuffleMessages } from "../../data/messages";

export type GameState = "menu" | "playing" | "feedback" | "result";
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
  
  // Actions
  setGameMode: (mode: GameMode) => void;
  startGame: () => void;
  submitAnswer: (answer: 'confiavel' | 'golpe') => boolean;
  nextRound: () => void;
  endGame: () => void;
  resetGame: () => void;
  
  // Timer
  tickTimer: () => void;
}

export const useGameStore = create<GameStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    gameState: "menu",
    gameMode: "classico",
    
    messages: [],
    currentMessageIndex: 0,
    currentMessage: null,
    
    currentRound: 1,
    totalRounds: 10,
    timeLeft: 30,
    
    score: 0,
    combo: 0,
    correctAnswers: 0,
    lastAnswer: null,
    
    // Actions
    setGameMode: (mode) => set({ gameMode: mode }),
    
    startGame: () => {
      const state = get();
      const availableMessages = getMessagesByMode(state.gameMode);
      const shuffledMessages = shuffleMessages(availableMessages).slice(0, state.totalRounds);
      
      set({
        gameState: "playing",
        messages: shuffledMessages,
        currentMessageIndex: 0,
        currentMessage: shuffledMessages[0],
        currentRound: 1,
        timeLeft: 30,
        score: 0,
        combo: 0,
        correctAnswers: 0,
        lastAnswer: null
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
      
      // Decrease time as rounds progress (minimum 10 seconds)
      const newTimeLeft = Math.max(10, 30 - Math.floor(state.currentRound / 2) * 5);
      
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
        messages: [],
        currentMessageIndex: 0,
        currentMessage: null,
        currentRound: 1,
        totalRounds: 10,
        timeLeft: 30,
        score: 0,
        combo: 0,
        correctAnswers: 0,
        lastAnswer: null
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
