
import { useState } from 'react';
import { TrendingUp, Building, Coins, Clock, Target, Info, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export const InvestmentOptions = () => {
  const [activeCategory, setActiveCategory] = useState<'short' | 'mid' | 'long'>('short');
  const [selectedTip, setSelectedTip] = useState<string | null>(null);

  const investmentTips = {
    'Start Small': {
      title: 'Start Small - Build Your Investment Foundation',
      criteria: 'Start Small',
      icon: '🌱',
      investmentOptions: [
        'Micro Investment Apps (Roshan Digital Account)',
        'Mobile Banking Investment Plans',
        'Prize Bonds (PKR 100)',
        'Money Market Funds'
      ],
      expectedReturns: '5-8% initially, growing with experience',
      minimumAmount: 'PKR 100 - PKR 5,000',
      duration: '3-6 months to build confidence',
      riskLevel: 'Very Low - Designed for beginners',
      liquidity: 'Very High - Easy to access and withdraw',
      description: 'Starting small is the best approach for student investors. This strategy allows you to learn the investment basics without risking large amounts. Begin with micro-investments through popular Pakistani apps and platforms, gradually increase your investment amount as you gain experience and confidence. This builds healthy financial habits and compound growth over time.',
      benefits: [
        'Learn investment fundamentals without major risks',
        'Develop disciplined saving habits',
        'Understand market dynamics gradually',
        'Build confidence before larger investments',
        'Compound interest works even with small amounts'
      ],
      tips: [
        'Open accounts with government-backed platforms first',
        'Use automatic investment plans (SIPs)',
        'Track your investments monthly',
        'Reinvest returns to maximize compound growth',
        'Set realistic goals and review quarterly'
      ]
    },
    'Diversify': {
      title: 'Diversify - Spread Your Risk Intelligently',
      criteria: 'Diversify',
      icon: '🎯',
      investmentOptions: [
        'Mix of Fixed Deposits (40%)',
        'Equity Mutual Funds (30%)',
        'Gold or Commodities (20%)',
        'Bonds or Government Securities (10%)'
      ],
      expectedReturns: '8-12% (blended average)',
      minimumAmount: 'PKR 10,000-25,000 across platforms',
      duration: '2-5 years for optimal diversification',
      riskLevel: 'Low to Moderate - Balanced across assets',
      liquidity: 'Medium - Mix of liquid and less liquid assets',
      description: 'The golden rule of investing: never put all eggs in one basket. Diversification is the most effective way to manage investment risk. By spreading your money across different asset classes (stocks, bonds, gold, real estate), sectors, and time horizons, you protect yourself from market downturns in any single area. A well-diversified portfolio can weather market volatility and still generate steady returns.',
      benefits: [
        'Reduces overall portfolio risk significantly',
        'Protects against sector-specific downturns',
        'Provides steady returns across different conditions',
        'Balances high-risk/high-reward with safe investments',
        'Achieves multiple financial goals simultaneously'
      ],
      tips: [
        'Follow the 40-30-20-10 rule for asset allocation',
        'Rebalance portfolio every 6 months',
        'Include both conventional and Islamic options',
        'Consider inflation-protected investments',
        'Review diversification based on changing goals'
      ]
    },
    'Long-term Focus': {
      title: 'Long-term Focus - Patience Pays Off',
      criteria: 'Long-term Focus',
      icon: '🚀',
      investmentOptions: [
        'PSX Stocks (7+ years)',
        'Real Estate Investment (10+ years)',
        'Pension Funds/VPS (20+ years)',
        'Long-term Mutual Funds'
      ],
      expectedReturns: '12-18% annually (over long periods)',
      minimumAmount: 'PKR 5,000-50,000 depending on asset',
      duration: '7-20+ years for maximum returns',
      riskLevel: 'Medium to High - Balanced with time horizon',
      liquidity: 'Low to Very Low - Not meant for quick access',
      description: 'Time is your greatest asset as a young investor. The longer you stay invested, the more compound interest works in your favor. Long-term investing means you can ride out market volatility and benefit from overall market growth. Historical data shows that investors who stay invested for 7+ years almost always see positive returns, regardless of short-term market fluctuations. This is the path to serious wealth building.',
      benefits: [
        'Compound interest becomes exponentially powerful',
        'Weather market volatility with confidence',
        'Benefit from economic growth over decades',
        'Reduce stress by avoiding daily price watching',
        'Potentially 2-5x your money in 10-15 years'
      ],
      tips: [
        'Invest regularly with fixed monthly amounts (SIP)',
        'Ignore short-term market noise and headlines',
        'Reinvest all dividends and returns',
        'Increase investment amount annually',
        'Avoid panic selling during downturns',
        'Review strategy every 2-3 years, not monthly'
      ]
    }
  };

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
            <span>Smart Investment Tips for Students</span>
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">Click on any tip to see detailed investment criteria and strategies</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(investmentTips).map(([key, tip]) => (
              <Dialog key={key}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer p-6 rounded-xl border-2 border-gray-200 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:scale-105 bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-white">
                    <div className="text-4xl mb-3">{tip.icon}</div>
                    <h4 className="font-semibold text-gray-800 mb-3 text-lg">{key}</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      <li>• {tip.minimumAmount}</li>
                      <li>• {tip.duration}</li>
                      <li>• {tip.riskLevel}</li>
                    </ul>
                    <div className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all">
                      Learn More <span>→</span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl">
                      <span className="text-4xl">{tip.icon}</span>
                      {tip.title}
                    </DialogTitle>
                    <DialogDescription className="text-base mt-2">
                      Comprehensive guide to {tip.criteria.toLowerCase()} strategy
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-xs font-semibold text-green-700 uppercase">Expected Returns</p>
                        <p className="text-lg font-bold text-green-600 mt-1">{tip.expectedReturns}</p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-xs font-semibold text-blue-700 uppercase">Minimum Amount</p>
                        <p className="text-lg font-bold text-blue-600 mt-1">{tip.minimumAmount}</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <p className="text-xs font-semibold text-purple-700 uppercase">Duration</p>
                        <p className="text-lg font-bold text-purple-600 mt-1">{tip.duration}</p>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                        <p className="text-xs font-semibold text-orange-700 uppercase">Risk Level</p>
                        <p className="text-lg font-bold text-orange-600 mt-1">{tip.riskLevel}</p>
                      </div>
                    </div>

                    {/* Liquidity */}
                    <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                      <p className="text-xs font-semibold text-cyan-700 uppercase mb-1">Liquidity</p>
                      <p className="text-lg font-bold text-cyan-600">{tip.liquidity}</p>
                    </div>

                    {/* Description */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">{tip.description}</p>
                    </div>

                    {/* Investment Options */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Recommended Investment Options</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {tip.investmentOptions.map((option, idx) => (
                          <div key={idx} className="p-3 bg-gray-100 rounded-lg flex items-center gap-2">
                            <span className="text-lg">💼</span>
                            <span className="text-sm font-medium text-gray-700">{option}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Key Benefits</h4>
                      <div className="space-y-2">
                        {tip.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2">
                            <span className="text-green-600 font-bold mt-1">✓</span>
                            <span className="text-sm text-gray-700">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tips & Best Practices */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-3">Tips & Best Practices</h4>
                      <div className="space-y-2">
                        {tip.tips.map((tipText, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-2 bg-blue-50 rounded">
                            <span className="text-blue-600 font-bold">💡</span>
                            <span className="text-sm text-gray-700">{tipText}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
