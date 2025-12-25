
import { useState } from 'react';
import { Calendar, Bot, Building2, Target, TrendingUp, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/Sidebar';
import { CalendarView } from '@/components/CalendarView';
import { SavingsSummary } from '@/components/SavingsSummary';
import { AIAssistant } from '@/components/AIAssistant';
import { SavingOptions } from '@/components/SavingOptions';
import { InvestmentOptions } from '@/components/InvestmentOptions';
import { DailySavingsSetup } from '@/components/DailySavingsSetup';
import { cn } from '@/lib/utils';

const Index = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [dailySavings, setDailySavings] = useState<Record<number, number>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dailySavingAmount, setDailySavingAmount] = useState<number | null>(null);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  
  const targetAmount = 100000; // PKR 1 Lakh
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  // Calculate total saved
  const totalSaved = Object.values(dailySavings).reduce((sum: number, amount: number) => sum + (amount || 0), 0);
  
  // Calculate estimated days to reach goal based on user's daily amount
  const averageDailySaving = dailySavingAmount || 100;
  const remainingAmount = targetAmount - totalSaved;
  const estimatedDaysLeft = Math.ceil(remainingAmount / averageDailySaving);

  const handleSavingUpdate = (day: number, amount: number) => {
    setDailySavings(prev => ({
      ...prev,
      [day]: amount
    }));
  };

  const handleDailySavingsSetup = (amount: number) => {
    setDailySavingAmount(amount);
    setIsSetupComplete(true);
  };

  // Show setup screen if not completed
  if (!isSetupComplete) {
    return <DailySavingsSetup onSetup={handleDailySavingsSetup} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'calendar':
        return (
          <div className="space-y-6">
            <SavingsSummary 
              totalSaved={totalSaved}
              targetAmount={targetAmount}
              estimatedDaysLeft={estimatedDaysLeft}
            />
            <CalendarView 
              dailySavings={dailySavings}
              onSavingUpdate={handleSavingUpdate}
              month={currentMonth}
              year={currentYear}
            />
          </div>
        );
      case 'ai-assistant':
        return <AIAssistant />;
      case 'saving-options':
        return <SavingOptions />;
      case 'investment-options':
        return <InvestmentOptions />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">PakSaver</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Desktop Header */}
          <div className="hidden lg:block bg-white shadow-sm border-b p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeTab === 'calendar' && 'Daily Savings Tracker'}
                  {activeTab === 'ai-assistant' && 'AI Financial Assistant'}
                  {activeTab === 'saving-options' && 'Pakistani Banking Options'}
                  {activeTab === 'investment-options' && 'Investment Options'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {activeTab === 'calendar' && `Track your daily savings journey to PKR 1,00,000 (${dailySavingAmount} PKR/day target)`}
                  {activeTab === 'ai-assistant' && 'Get personalized financial advice for Pakistan'}
                  {activeTab === 'saving-options' && 'Compare Pakistani banks and digital wallets'}
                  {activeTab === 'investment-options' && 'Explore investment opportunities for different time horizons'}
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>PKR {totalSaved.toLocaleString('en-PK')} saved</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 lg:p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex">
          {[
            { id: 'calendar', icon: Calendar, label: 'Tracker' },
            { id: 'ai-assistant', icon: Bot, label: 'AI Guide' },
            { id: 'saving-options', icon: Building2, label: 'Banks' },
            { id: 'investment-options', icon: TrendingUp, label: 'Invest' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 flex flex-col items-center justify-center py-3 px-2 text-xs transition-colors",
                activeTab === tab.id
                  ? "text-green-600 bg-green-50"
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <tab.icon className="w-5 h-5 mb-1" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
