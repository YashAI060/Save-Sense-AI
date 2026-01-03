import { ProgressCircle } from './ProgressCircle';

interface ProgressCardProps {
  totalSaved: number;
  targetAmount: number;
}

export function ProgressCard({ totalSaved, targetAmount }: ProgressCardProps) {
  const percentage = Math.min((totalSaved / targetAmount) * 100, 100);
  
  return (
      <div className="neumorphic p-6 flex flex-col items-center">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">Progress to Goal</h3>
        <ProgressCircle percentage={percentage} size={160} strokeWidth={10} />
        <div className="mt-4 w-full">
          <div className="neumorphic-inset h-3 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>PKR {totalSaved.toLocaleString()}</span>
            <span>PKR {targetAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

  );
}
