import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ProgressCard } from '@/components/ProgressCard';
import { DaysToGoalCard } from '@/components/DaysToGoalCard';
import { MonthlySummaryCard } from '@/components/MonthlySummaryCard';
import { SavingsCalendar } from '@/components/SavingsCalendar';
import { AddSavingsCard } from '@/components/AddSavingsCard';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Index = () => {
  const [allSavings, setAllSavings] = useState<Record<string, Record<number, number>>>({});
  const [loading, setLoading] = useState(true);
  const storedDailySaving = localStorage.getItem('daily_saving');
  const [dailySavingRate, setDailySavingRate] = useState(storedDailySaving ? parseInt(storedDailySaving) : 1000);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const uniqueId = localStorage.getItem('unique_id') || "default_user";
  const userId = uniqueId;
  const targetAmount = 100000;

  const getMonthKey = (month: number, year: number) => `${year}-${month}`;
  const currentMonthKey = getMonthKey(currentMonth, currentYear);

  const currentMonthSavings = allSavings[currentMonthKey] || {};

  useEffect(() => {
    const loadSavingsData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/savings/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setAllSavings(data.savings || {});
        }
      } catch (error) {
        console.error("Error loading savings data:", error);
        setAllSavings({});
      } finally {
        setLoading(false);
      }
    };

    loadSavingsData();
  }, [userId]);

  useEffect(() => {
    const saveSavingsData = async () => {
      if (loading) return;

      try {
        await fetch(`http://localhost:8000/api/savings/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ savings: allSavings }),
        });
      } catch (error) {
        console.error("Error saving savings data:", error);
      }
    };

    saveSavingsData();
  }, [allSavings, userId, loading]);

  const totalSavedThisMonth = Object.values(currentMonthSavings).reduce((sum: number, amount: number) => sum + (amount || 0), 0);
  const remainingAmount = Math.max(targetAmount - totalSavedThisMonth, 0);
  
  const calculateDaysToGoal = () => {
    if (dailySavingRate <= 0) return 0;
    if (remainingAmount <= 0) return 0;
    return Math.ceil(remainingAmount / dailySavingRate);
  };

  const estimatedDaysLeft = calculateDaysToGoal();

  const handleSavingUpdate = (day: number, amount: number, month: number, year: number) => {
    const monthKey = getMonthKey(month, year);
    setAllSavings(prev => ({
      ...prev,
      [monthKey]: {
        ...(prev[monthKey] || {}),
        [day]: ((prev[monthKey] || {})[day] || 0) + amount
      }
    }));
  };

  const handleAddTodaySaving = (amount: number) => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    handleSavingUpdate(day, amount, month, year);
    setDailySavingRate(amount);
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handleMonthChange = (month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed] flex items-center justify-center">
        <div className="neumorphic p-8 text-center">
          <div className="animate-pulse text-gray-600">Loading your savings data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed] dark:from-slate-950 dark:to-slate-900 transition-colors">
      <Navbar />
      
      <main className="px-3 sm:px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-1">
            <ProgressCard 
              totalSaved={totalSavedThisMonth} 
              targetAmount={targetAmount} 
            />
            <AddSavingsCard onAddSaving={handleAddTodaySaving} />
            <div className="hidden lg:block">
              <DaysToGoalCard 
                daysRemaining={estimatedDaysLeft}
                dailyRate={dailySavingRate}
                remainingAmount={remainingAmount}
              />
            </div>
          </div>

          <div className="lg:col-span-9 space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="sm:col-span-2">
                <MonthlySummaryCard 
                  month={MONTH_NAMES[currentMonth]}
                  year={currentYear}
                  totalAmount={totalSavedThisMonth}
                  targetAmount={targetAmount}
                />
              </div>
              <div className="sm:col-span-1">
                <DaysToGoalCard 
                  daysRemaining={estimatedDaysLeft} 
                  variant="compact"
                  dailyRate={dailySavingRate}
                  remainingAmount={remainingAmount}
                />
              </div>
            </div>

            <SavingsCalendar 
              dailySavings={currentMonthSavings}
              onSavingUpdate={(day, amount) => handleSavingUpdate(day, amount, currentMonth, currentYear)}
              month={currentMonth}
              year={currentYear}
              onMonthChange={handleMonthChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
