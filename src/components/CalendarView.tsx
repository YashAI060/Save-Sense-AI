
import { useState } from 'react';
import { Plus, Edit2, Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface CalendarViewProps {
  dailySavings: Record<number, number>;
  onSavingUpdate: (day: number, amount: number) => void;
  month: number;
  year: number;
}

export const CalendarView = ({ dailySavings, onSavingUpdate, month, year }: CalendarViewProps) => {
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState('');

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const today = new Date().getDate();
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const isCurrentMonth = month === currentMonth && year === currentYear;

  const handleDayClick = (day: number) => {
    if (editingDay === day) {
      // Save the amount
      const amount = parseFloat(editAmount) || 0;
      onSavingUpdate(day, amount);
      setEditingDay(null);
      setEditAmount('');
    } else {
      // Start editing
      setEditingDay(day);
      setEditAmount(dailySavings[day]?.toString() || '');
    }
  };

  const getDayStatus = (day: number) => {
    const hasAmount = dailySavings[day] > 0;
    const isPast = isCurrentMonth ? day < today : true;
    const isToday = isCurrentMonth && day === today;
    
    if (isToday) return 'today';
    if (hasAmount) return 'saved';
    if (isPast) return 'missed';
    return 'upcoming';
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'today':
        return 'bg-green-100 border-2 border-green-500 text-green-900';
      case 'saved':
        return 'bg-blue-100 border-blue-300 text-blue-900';
      case 'missed':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-600';
    }
  };

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add all days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardTitle className="text-center">
          {new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}
        </CardTitle>
        <p className="text-center text-green-100 text-sm">Track your daily savings in PKR</p>
      </CardHeader>
      <CardContent className="p-6">
        {/* Week headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={index} className="aspect-square" />;
            }

            const status = getDayStatus(day);
            const amount = dailySavings[day] || 0;
            const isEditing = editingDay === day;

            return (
              <div
                key={day}
                className={cn(
                  "aspect-square border rounded-lg p-2 cursor-pointer transition-all duration-200 hover:shadow-md",
                  getStatusStyles(status),
                  isEditing && "ring-2 ring-green-400"
                )}
                onClick={() => handleDayClick(day)}
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="text-sm font-medium">{day}</div>
                  
                  {isEditing ? (
                    <div className="flex flex-col space-y-1">
                      <Input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        placeholder="PKR"
                        className="h-6 text-xs p-1"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                      />
                      <Check className="w-3 h-3 mx-auto text-green-600" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {amount > 0 ? (
                        <div className="text-xs font-bold">PKR {amount}</div>
                      ) : (
                        <Plus className="w-3 h-3 opacity-50" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border border-green-500 rounded"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span>Saved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-50 border border-red-200 rounded"></div>
            <span>Missed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-50 border border-gray-200 rounded"></div>
            <span>Upcoming</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
