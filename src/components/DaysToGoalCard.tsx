import { Target, Calendar, TrendingUp } from 'lucide-react';

interface DaysToGoalCardProps {
  daysRemaining: number;
  variant?: 'default' | 'compact';
  dailyRate?: number;
  remainingAmount?: number;
}

export function DaysToGoalCard({ daysRemaining, variant = 'default', dailyRate = 1000, remainingAmount = 0 }: DaysToGoalCardProps) {
    if (variant === 'compact') {
      return (
        <div className="neumorphic p-6 text-center h-full flex flex-col justify-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Days to Goal</h3>
          </div>
          <span className="text-5xl font-bold text-blue-500">{daysRemaining}</span>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            at PKR {dailyRate.toLocaleString()}/day
          </p>
        </div>
      );
    }
  
    return (
      <div className="neumorphic p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Days to Goal</h3>
        </div>
        <div className="flex items-center justify-center mb-4">
          <span className="text-6xl font-bold text-blue-500">{daysRemaining}</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <span>Daily saving rate:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">PKR {dailyRate.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
            <span>Remaining:</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">PKR {remainingAmount.toLocaleString()}</span>
          </div>
          <div className="pt-2 border-t border-gray-100 dark:border-slate-800 flex items-center gap-1 text-green-600 dark:text-green-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium">
              {daysRemaining > 0 
                ? `Save PKR ${dailyRate.toLocaleString()} daily to reach 1 Lac PKR`
                : 'Goal achieved!'
              }
            </span>
          </div>
        </div>
      </div>

  );
}
