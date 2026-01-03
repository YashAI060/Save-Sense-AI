import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SavingsCalendarProps {
  dailySavings: Record<number, number>;
  onSavingUpdate: (day: number, amount: number) => void;
  month: number;
  year: number;
  onMonthChange?: (month: number, year: number) => void;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function SavingsCalendar({ dailySavings, onSavingUpdate, month, year, onMonthChange }: SavingsCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addAmount, setAddAmount] = useState('');
  
  const today = new Date();
  const isCurrentMonth = currentMonth === today.getMonth() && currentYear === today.getFullYear();

  useEffect(() => {
    if (isCurrentMonth) {
      setSelectedDay(today.getDate());
    } else {
      setSelectedDay(1);
    }
  }, [currentMonth, currentYear]);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  const prevMonth = () => {
    let newMonth = currentMonth;
    let newYear = currentYear;
    
    if (currentMonth === 0) {
      newMonth = 11;
      newYear = currentYear - 1;
    } else {
      newMonth = currentMonth - 1;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };

  const nextMonth = () => {
    let newMonth = currentMonth;
    let newYear = currentYear;
    
    if (currentMonth === 11) {
      newMonth = 0;
      newYear = currentYear + 1;
    } else {
      newMonth = currentMonth + 1;
    }
    
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    onMonthChange?.(newMonth, newYear);
  };

  const hasSaving = (day: number) => dailySavings[day] && dailySavings[day] > 0;
  const getSaving = (day: number) => dailySavings[day] || 0;

  const handleAddSaving = () => {
    if (selectedDay && addAmount) {
      const amount = parseInt(addAmount);
      if (amount > 0) {
        onSavingUpdate(selectedDay, amount);
        setAddAmount('');
        setShowAddModal(false);
      }
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 sm:h-16" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const isSelected = selectedDay === day;
      const hasEntry = hasSaving(day);
      const savingAmount = getSaving(day);

      days.push(
        <div
          key={day}
          onClick={() => {
            setSelectedDay(day);
            if (hasEntry) {
              setShowAddModal(true);
            }
          }}
          className={cn(
            "h-14 sm:h-16 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all relative p-1",
            isSelected && "bg-blue-500 text-white shadow-lg",
            isToday && !isSelected && "ring-2 ring-blue-400 text-blue-600 dark:text-blue-400 font-semibold",
            !isSelected && !isToday && "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
          )}
        >
          <span className={cn(
            "text-sm",
            isSelected ? "font-bold" : ""
          )}>{day}</span>
          {hasEntry && (
            <span className={cn(
              "text-[10px] sm:text-xs mt-0.5 truncate max-w-full px-1",
              isSelected ? "text-blue-100" : "text-green-600 dark:text-green-400 font-medium"
            )}>
              PKR {savingAmount >= 1000 ? `${(savingAmount/1000).toFixed(1)}k` : savingAmount}
            </span>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="neumorphic p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
          {MONTH_NAMES[currentMonth]} {currentYear}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
          <div key={i} className="h-10 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-400 dark:text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {selectedDay && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl neumorphic-inset">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {hasSaving(selectedDay) 
                  ? `Saved: PKR ${getSaving(selectedDay).toLocaleString()}`
                  : 'No savings recorded'
                }
              </p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 flex items-center gap-2 shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      )}

      {showAddModal && selectedDay && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[110] p-4">
          <div className="neumorphic bg-white dark:bg-slate-900 p-6 w-full max-w-sm border border-white/50 dark:border-slate-800">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Add Savings</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {MONTH_NAMES[currentMonth]} {selectedDay}, {currentYear}
            </p>
            
            {hasSaving(selectedDay) && (
              <p className="text-sm text-green-600 dark:text-green-400 mb-4">
                Current: PKR {getSaving(selectedDay).toLocaleString()}
              </p>
            )}

            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              placeholder="Enter amount in PKR"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              autoFocus
            />

            <div className="grid grid-cols-3 gap-2 mb-4">
              {[500, 1000, 2000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setAddAmount(amount.toString())}
                  className="py-2 px-3 rounded-lg border border-gray-200 dark:border-slate-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                >
                  PKR {amount}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddAmount('');
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSaving}
                className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 shadow-lg"
              >
                Add Savings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
