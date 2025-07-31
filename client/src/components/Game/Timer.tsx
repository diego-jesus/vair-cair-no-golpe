import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface TimerProps {
  timeLeft: number;
}

const Timer = ({ timeLeft }: TimerProps) => {
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (timeLeft <= 5 && timeLeft > 0) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const getTimerStyle = () => {
    if (timeLeft <= 5) return 'bg-red-500 text-white border-red-700 animate-pulse';
    if (timeLeft <= 10) return 'bg-yellow-500 text-black border-yellow-700';
    return 'bg-green-500 text-white border-green-700';
  };

  const getTimerEmoji = () => {
    if (timeLeft <= 5) return '⚠️';
    if (timeLeft <= 10) return '⏰';
    return '⏱️';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center px-4 py-2 rounded-full border-2 font-bold shadow-lg transform ${shake ? 'animate-bounce' : ''} ${getTimerStyle()}`}>
      <span className="text-lg mr-2">{getTimerEmoji()}</span>
      <span className="text-lg font-mono font-black">
        {formatTime(timeLeft)}
      </span>
      {timeLeft <= 5 && (
        <span className="ml-2 text-sm font-bold animate-pulse">
          RÁPIDO!
        </span>
      )}
    </div>
  );
};

export default Timer;
