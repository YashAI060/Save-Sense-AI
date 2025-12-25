
import { useState } from 'react';
import { Target, Calculator, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DailySavingsSetupProps {
  onSetup: (dailyAmount: number) => void;
}

export const DailySavingsSetup = ({ onSetup }: DailySavingsSetupProps) => {
  const [dailyAmount, setDailyAmount] = useState(100);
  const targetAmount = 100000;

  const estimatedDays = Math.ceil(targetAmount / dailyAmount);
  const estimatedMonths = Math.ceil(estimatedDays / 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSetup(dailyAmount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Welcome to PakSaver!</CardTitle>
          <p className="text-green-100">Let's set up your daily savings plan</p>
        </CardHeader>
        
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="dailyAmount" className="text-lg font-medium">
                How much can you save daily?
              </Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  PKR
                </span>
                <Input
                  id="dailyAmount"
                  type="number"
                  min="10"
                  max="10000"
                  value={dailyAmount}
                  onChange={(e) => setDailyAmount(Number(e.target.value) || 100)}
                  className="pl-12 text-lg h-12"
                  placeholder="100"
                />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Minimum PKR 10, Maximum PKR 10,000 per day
              </p>
            </div>

            {/* Estimation Display */}
            <div className="bg-green-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2 text-green-700">
                <Calculator className="w-5 h-5" />
                <span className="font-medium">Your Savings Plan</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{estimatedDays}</div>
                  <div className="text-sm text-gray-600">Days to Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{estimatedMonths}</div>
                  <div className="text-sm text-gray-600">Months</div>
                </div>
              </div>
              
              <div className="text-center pt-2 border-t border-green-200">
                <div className="text-lg font-bold text-green-700">
                  PKR {targetAmount.toLocaleString('en-PK')} Goal
                </div>
                <div className="text-sm text-gray-600">
                  At PKR {dailyAmount} per day
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 h-12 text-lg"
            >
              Start My Savings Journey
              <TrendingUp className="w-5 h-5 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
