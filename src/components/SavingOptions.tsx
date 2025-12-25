
import { useState } from 'react';
import { Building2, TrendingUp, Clock, Calculator, Smartphone, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export const SavingOptions = () => {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [duration, setDuration] = useState(12); // months

  const savingOptions = [
    {
      bank: 'EasyPaisa',
      type: 'Mobile Wallet',
      interestRate: 6.0,
      color: 'green',
      minAmount: 100,
      category: 'digital',
      features: ['No minimum balance', 'Mobile banking', 'Bill payments', 'Easy transfers']
    },
    {
      bank: 'JazzCash',
      type: 'Digital Wallet',
      interestRate: 5.5,
      color: 'red',
      minAmount: 50,
      category: 'digital',
      features: ['Instant transfers', 'Mobile top-up', 'Utility bills', 'QR payments']
    },
    {
      bank: 'HBL',
      type: 'Student Account',
      interestRate: 7.5,
      color: 'blue',
      minAmount: 1000,
      category: 'traditional',
      features: ['Student benefits', 'ATM network', 'Online banking', 'Debit card']
    },
    {
      bank: 'UBL',
      type: 'Youth Savings',
      interestRate: 7.0,
      color: 'purple',
      minAmount: 500,
      category: 'traditional',
      features: ['Youth account', 'Low charges', 'Branch network', 'Digital banking']
    },
    {
      bank: 'Meezan Bank',
      type: 'Islamic Savings',
      interestRate: 6.8,
      color: 'orange',
      minAmount: 1000,
      category: 'islamic',
      features: ['Shariah compliant', 'Profit sharing', 'Islamic banking', 'Halal investment']
    },
    {
      bank: 'Allied Bank',
      type: 'Regular Savings',
      interestRate: 6.5,
      color: 'indigo',
      minAmount: 500,
      category: 'traditional',
      features: ['Wide network', 'Good support', 'Multiple products', 'Student friendly']
    }
  ];

  const calculateReturns = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    const amount = principal * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate * (1 + monthlyRate);
    return amount;
  };

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'border-green-200 bg-green-50',
      red: 'border-red-200 bg-red-50',
      blue: 'border-blue-200 bg-blue-50',
      purple: 'border-purple-200 bg-purple-50',
      orange: 'border-orange-200 bg-orange-50',
      indigo: 'border-indigo-200 bg-indigo-50'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getBestOption = () => {
    return savingOptions.reduce((best, current) => 
      calculateReturns(monthlyAmount, current.interestRate, duration) > 
      calculateReturns(monthlyAmount, best.interestRate, duration) 
        ? current : best
    );
  };

  const bestOption = getBestOption();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'digital':
        return Smartphone;
      case 'islamic':
        return Building2;
      default:
        return CreditCard;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Calculator Card */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="w-6 h-6" />
            <span>Pakistani Savings Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Monthly Saving Amount (PKR)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">PKR</span>
                  <Input
                    id="amount"
                    type="number"
                    value={monthlyAmount}
                    onChange={(e) => setMonthlyAmount(Number(e.target.value))}
                    className="pl-12"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="duration">Duration (Months)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Total Investment</div>
                <div className="text-2xl font-bold text-gray-900">
                  PKR {(monthlyAmount * duration).toLocaleString('en-PK')}
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600">Best Return ({bestOption.bank})</div>
                <div className="text-2xl font-bold text-green-700">
                  PKR {calculateReturns(monthlyAmount, bestOption.interestRate, duration).toLocaleString('en-PK')}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-sm font-medium text-gray-700">Filter by type:</span>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center">
            <Smartphone className="w-3 h-3 mr-1" />
            Digital Wallets
          </span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs flex items-center">
            <CreditCard className="w-3 h-3 mr-1" />
            Traditional Banks
          </span>
          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs flex items-center">
            <Building2 className="w-3 h-3 mr-1" />
            Islamic Banking
          </span>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {savingOptions.map((option, index) => {
          const returns = calculateReturns(monthlyAmount, option.interestRate, duration);
          const profit = returns - (monthlyAmount * duration);
          const isBest = option.bank === bestOption.bank;
          const CategoryIcon = getCategoryIcon(option.category);

          return (
            <Card 
              key={index} 
              className={cn(
                "relative transition-all duration-200 hover:shadow-lg",
                getColorClasses(option.color),
                isBest && "ring-2 ring-green-400 ring-opacity-60"
              )}
            >
              {isBest && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BEST RETURN
                  </span>
                </div>
              )}
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{option.bank}</CardTitle>
                    <p className="text-sm text-gray-600">{option.type}</p>
                  </div>
                  <CategoryIcon className="w-8 h-8 text-gray-400" />
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {option.category === 'islamic' ? 'Profit Rate' : 'Interest Rate'}
                  </span>
                  <span className="text-lg font-bold text-green-600">
                    {option.interestRate}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Min. Amount</span>
                  <span className="text-sm">PKR {option.minAmount.toLocaleString('en-PK')}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Total Returns</span>
                    <span className="text-lg font-bold">
                      PKR {returns.toLocaleString('en-PK')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Profit</span>
                    <span className="text-sm font-medium text-green-600">
                      +PKR {profit.toLocaleString('en-PK')}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="text-sm font-medium mb-2">Features</div>
                  <div className="flex flex-wrap gap-1">
                    {option.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="text-xs bg-white bg-opacity-70 px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pakistani Investment Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Smart Investment Tips for Pakistani Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Getting Started</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Start with EasyPaisa/JazzCash for daily savings</li>
                <li>• Keep PKR 10,000-20,000 for emergencies</li>
                <li>• Compare bank rates and charges</li>
                <li>• Use student accounts for lower fees</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Advanced Options</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Consider Islamic banking for halal options</li>
                <li>• Look into National Savings Schemes</li>
                <li>• Explore mutual funds after PKR 50,000</li>
                <li>• Diversify across multiple banks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
