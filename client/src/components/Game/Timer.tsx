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

  const getTimerColor = () => {
    if (timeLeft <= 5) return 'text-red-400';
    if (timeLeft <= 10) return 'text-yellow-400';
    return 'text-green-100';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`flex items-center ${getTimerColor()} ${shake ? 'animate-pulse' : ''}`}>
      <Clock className="h-4 w-4 mr-2" />
      <span className="text-lg font-mono font-semibold">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default Timer;
