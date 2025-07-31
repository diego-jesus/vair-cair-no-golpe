import { Trophy, Zap } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  combo: number;
}

const ScoreDisplay = ({ score, combo }: ScoreDisplayProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Trophy className="h-6 w-6 text-yellow-600 mr-2" />
        <div>
          <p className="text-2xl font-bold text-gray-800">{score.toLocaleString()}</p>
          <p className="text-sm text-gray-600">pontos</p>
        </div>
      </div>
      
      {combo > 0 && (
        <div className="flex items-center bg-orange-100 px-3 py-2 rounded-full">
          <Zap className="h-5 w-5 text-orange-600 mr-2" />
          <div className="text-center">
            <p className="text-lg font-bold text-orange-800">{combo}x</p>
            <p className="text-xs text-orange-600">combo</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreDisplay;
