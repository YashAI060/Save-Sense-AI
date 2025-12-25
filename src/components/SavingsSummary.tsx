
import { Target, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SavingsSummaryProps {
  totalSaved: number;
  targetAmount: number;
  estimatedDaysLeft: number;
}

export const SavingsSummary = ({ totalSaved, targetAmount, estimatedDaysLeft }: SavingsSummaryProps) => {
  const progressPercentage = (totalSaved / targetAmount) * 100;
  const currentDate = new Date();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Progress Ring Card */}
      <Card className="md:col-span-1 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90">
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900">
                {progressPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-600">Progress to Goal</div>
          <div className="text-xs text-gray-500 mt-1">PKR {totalSaved.toLocaleString('en-PK')} saved</div>
        </CardContent>
      </Card>

      {/* Monthly Summary */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">This {monthName}</div>
              <div className="text-xs text-gray-600">Total Saved</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            PKR {totalSaved.toLocaleString('en-PK')}
          </div>
        </CardContent>
      </Card>

      {/* Time to Goal */}
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Days to Goal</div>
              <div className="text-xs text-gray-600">At current pace</div>
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {estimatedDaysLeft > 0 ? estimatedDaysLeft : 0}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            ~{Math.ceil(estimatedDaysLeft / 30)} months
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
