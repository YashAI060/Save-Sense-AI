import { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';

interface AddSavingsCardProps {
  onAddSaving: (amount: number) => void;
}

export function AddSavingsCard({ onAddSaving }: AddSavingsCardProps): JSX.Element {
  const [amount, setAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const quickAmounts = [500, 1000, 2000, 5000];

  const handleAdd = () => {
    const value = parseInt(amount);
    if (value > 0) {
      onAddSaving(value);
      setAmount('');
      setIsAdding(false);
    }
  };

  const handleQuickAdd = (value: number) => {
    onAddSaving(value);
  };

    return (
      <div className="neumorphic p-6">
        <div className="flex items-center gap-2 mb-4">
          <Wallet className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Add Today's Savings</h3>
        </div>
  
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickAmounts.map((value) => (
            <button
              key={value}
              onClick={() => handleQuickAdd(value)}
              className="neumorphic-button py-2 px-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              +PKR {value.toLocaleString()}
            </button>
          ))}
        </div>
  
        {isAdding ? (
          <div className="space-y-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in PKR"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-slate-800 dark:bg-slate-950 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 py-2 px-4 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 font-medium hover:bg-gray-50 dark:hover:bg-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 py-2 px-4 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 shadow-lg"
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Custom Amount
          </button>
        )}
      </div>

  );
}
