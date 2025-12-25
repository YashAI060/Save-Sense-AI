
import { useState } from 'react';
import { TrendingUp, Building, Coins, Clock, Target, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export const InvestmentOptions = () => {
  const [activeCategory, setActiveCategory] = useState<'short' | 'mid' | 'long'>('short');

  const investmentCategories = {
    short: {
      title: 'Short-term Investments',
      subtitle: '3 months to 2 years',
      color: 'green',
      icon: Coins,
      options: [
        {
          name: 'National Savings Regular Income Certificate',
          returns: '8.5%',
          minAmount: 'PKR 100,000',
          duration: '6 months - 1 year',
          risk: 'Very Low',
          liquidity: 'High',
          description: 'Government backed certificates with quarterly returns'
        },
        {
          name: 'Bank Fixed Deposits',
          returns: '6-8%',
          minAmount: 'PKR 10,000',
          duration: '3-12 months',
          risk: 'Very Low',
          liquidity: 'Medium',
          description: 'Safe bank deposits with guaranteed returns'
        },
        {
          name: 'Money Market Funds',
          returns: '5-7%',
          minAmount: 'PKR 5,000',
          duration: '1-6 months',
          risk: 'Low',
          liquidity: 'Very High',
          description: 'Liquid funds investing in short-term securities'
        },
        {
          name: 'Prize Bonds',
          returns: 'Variable',
          minAmount: 'PKR 100',
          duration: 'Flexible',
          risk: 'Very Low',
          liquidity: 'High',
          description: 'Government bonds with prize draws'
        }
      ]
    },
    mid: {
      title: 'Mid-term Investments',
      subtitle: '2 to 7 years',
      color: 'blue',
      icon: Target,
      options: [
        {
          name: 'Mutual Funds (Equity)',
          returns: '10-15%',
          minAmount: 'PKR 1,000',
          duration: '2-5 years',
          risk: 'Medium',
          liquidity: 'Medium',
          description: 'Diversified equity funds for medium-term growth'
        },
        {
          name: 'Pakistan Investment Bonds (PIBs)',
          returns: '9-11%',
          minAmount: 'PKR 100,000',
          duration: '3-10 years',
          risk: 'Low',
          liquidity: 'Medium',
          description: 'Government bonds with fixed coupon rates'
        },
        {
          name: 'Corporate Term Deposits',
          returns: '8-12%',
          minAmount: 'PKR 50,000',
          duration: '1-5 years',
          risk: 'Medium',
          liquidity: 'Low',
          description: 'Corporate deposits with higher returns'
        },
        {
          name: 'Gold Investment',
          returns: '8-12%',
          minAmount: 'PKR 10,000',
          duration: '2-7 years',
          risk: 'Medium',
          liquidity: 'Medium',
          description: 'Physical gold or gold funds as hedge against inflation'
        }
      ]
    },
    long: {
      title: 'Long-term Investments',
      subtitle: '7+ years',
      color: 'purple',
      icon: Building,
      options: [
        {
          name: 'Real Estate Investment',
          returns: '12-18%',
          minAmount: 'PKR 500,000',
          duration: '10+ years',
          risk: 'Medium-High',
          liquidity: 'Low',
          description: 'Property investment for long-term capital appreciation'
        },
        {
          name: 'Stock Market (PSX)',
          returns: '12-20%',
          minAmount: 'PKR 5,000',
          duration: '7+ years',
          risk: 'High',
          liquidity: 'High',
          description: 'Direct equity investment in Pakistan Stock Exchange'
        },
        {
          name: 'Pension Funds (VPS)',
          returns: '10-14%',
          minAmount: 'PKR 1,000/month',
          duration: '20+ years',
          risk: 'Medium',
          liquidity: 'Very Low',
          description: 'Voluntary Pension Scheme for retirement planning'
        },
        {
          name: 'Business Investment',
          returns: '15-25%',
          minAmount: 'PKR 100,000',
          duration: '5+ years',
          risk: 'High',
          liquidity: 'Very Low',
          description: 'Starting or investing in business ventures'
        },
        {
          name: 'Education Investment',
          returns: '20%+',
          minAmount: 'PKR 50,000',
          duration: '4-6 years',
          risk: 'Medium',
          liquidity: 'Low',
          description: 'Investing in skills and higher education'
        }
      ]
    }
  };

  const getCurrentCategory = () => investmentCategories[activeCategory];
  const currentCategory = getCurrentCategory();

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'border-green-200 bg-green-50 text-green-700',
      blue: 'border-blue-200 bg-blue-50 text-blue-700',
      purple: 'border-purple-200 bg-purple-50 text-purple-700'
    };
    return colorMap[color];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Very Low':
      case 'Low':
        return 'text-green-600 bg-green-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Medium-High':
      case 'High':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <TrendingUp className="w-7 h-7" />
            <span>Investment Options for Pakistani Students</span>
          </CardTitle>
          <p className="text-green-100">
            Grow your savings with these investment opportunities designed for different time horizons
          </p>
        </CardHeader>
      </Card>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(investmentCategories).map(([key, category]) => {
          const IconComponent = category.icon;
          const isActive = activeCategory === key;
          
          return (
            <Button
              key={key}
              variant={isActive ? "default" : "outline"}
              size="lg"
              onClick={() => setActiveCategory(key as 'short' | 'mid' | 'long')}
              className={cn(
                "flex-1 min-w-[200px] h-16 flex-col space-y-1",
                isActive && "bg-gradient-to-r from-green-600 to-blue-600"
              )}
            >
              <div className="flex items-center space-x-2">
                <IconComponent className="w-5 h-5" />
                <span className="font-semibold">{category.title}</span>
              </div>
              <span className="text-xs opacity-80">{category.subtitle}</span>
            </Button>
          );
        })}
      </div>

      {/* Investment Table */}
      <Card className={cn("shadow-lg", getColorClasses(currentCategory.color))}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl">
            <currentCategory.icon className="w-6 h-6" />
            <span>{currentCategory.title}</span>
          </CardTitle>
          <p className="text-sm opacity-80">
            Investment options suitable for {currentCategory.subtitle} investment horizon
          </p>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Investment Option</TableHead>
                  <TableHead>Expected Returns</TableHead>
                  <TableHead>Minimum Amount</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Liquidity</TableHead>
                  <TableHead className="w-[300px]">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCategory.options.map((option, index) => (
                  <TableRow key={index} className="hover:bg-white hover:bg-opacity-50">
                    <TableCell className="font-medium">
                      {option.name}
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {option.returns}
                    </TableCell>
                    <TableCell>{option.minAmount}</TableCell>
                    <TableCell>{option.duration}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        getRiskColor(option.risk)
                      )}>
                        {option.risk}
                      </span>
                    </TableCell>
                    <TableCell>{option.liquidity}</TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {option.description}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Investment Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="w-5 h-5" />
            <span>Investment Tips for Students</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Start Small</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Begin with PKR 1,000-5,000</li>
                <li>• Use systematic investment plans</li>
                <li>• Focus on regular savings first</li>
                <li>• Learn before investing large amounts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Diversify</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Don't put all money in one place</li>
                <li>• Mix different risk levels</li>
                <li>• Consider Islamic vs conventional</li>
                <li>• Balance liquidity needs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-700 mb-2">Long-term Focus</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Time in market beats timing market</li>
                <li>• Compound interest is powerful</li>
                <li>• Stay invested through volatility</li>
                <li>• Review and adjust annually</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
