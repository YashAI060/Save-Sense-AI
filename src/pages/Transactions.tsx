import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { ArrowUpRight, ArrowDownLeft, Search, Filter, Calendar, Download } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'savings';
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'income' | 'expense' | 'savings'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    type: 'income' as 'income' | 'expense' | 'savings',
    category: 'Salary',
    description: '',
    amount: 0,
  });

  const categories = {
    income: ['Salary', 'Freelance', 'Investment Returns', 'Gift', 'Other Income'],
    expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other Expense'],
    savings: ['Emergency Fund', 'Goal Saving', 'Fixed Deposit', 'Investment'],
  };

  const userId = localStorage.getItem('unique_id') || "default_user";

  useEffect(() => {
    loadTransactions();
  }, [userId]);

  const loadTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/transactions/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      }
    } catch (error) {
      console.error('Error loading transactions:', error);
      setTransactions([
        { id: '1', type: 'income', category: 'Salary', description: 'Monthly Salary', amount: 75000, date: '2025-12-28', status: 'completed' },
        { id: '2', type: 'expense', category: 'Food', description: 'Grocery Shopping', amount: 5500, date: '2025-12-27', status: 'completed' },
        { id: '3', type: 'savings', category: 'Emergency Fund', description: 'Monthly Savings', amount: 10000, date: '2025-12-26', status: 'completed' },
        { id: '4', type: 'expense', category: 'Transport', description: 'Petrol', amount: 3000, date: '2025-12-25', status: 'completed' },
        { id: '5', type: 'income', category: 'Freelance', description: 'Web Project', amount: 25000, date: '2025-12-24', status: 'completed' },
        { id: '6', type: 'expense', category: 'Bills', description: 'Electricity Bill', amount: 4500, date: '2025-12-23', status: 'pending' },
        { id: '7', type: 'savings', category: 'Goal Saving', description: 'MacBook Fund', amount: 15000, date: '2025-12-22', status: 'completed' },
        { id: '8', type: 'expense', category: 'Entertainment', description: 'Netflix Subscription', amount: 1500, date: '2025-12-21', status: 'completed' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };

    try {
      await fetch(`http://localhost:8000/api/transactions/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTransaction),
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }

    setTransactions([newTransaction, ...transactions]);
    setShowAddModal(false);
    setFormData({ type: 'income', category: 'Salary', description: '', amount: 0 });
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filter === 'all' || t.type === filter;
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const totalSavings = transactions.filter(t => t.type === 'savings').reduce((sum, t) => sum + t.amount, 0);

  const getIcon = (type: string) => {
    switch (type) {
      case 'income': return <ArrowDownLeft className="w-4 h-4" />;
      case 'expense': return <ArrowUpRight className="w-4 h-4" />;
      case 'savings': return <ArrowDownLeft className="w-4 h-4" />;
      default: return null;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'income': return 'bg-green-50 text-green-500';
      case 'expense': return 'bg-red-50 text-red-500';
      case 'savings': return 'bg-blue-50 text-blue-500';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed]">
        <Navbar />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="neumorphic p-8 text-center">
            <div className="animate-pulse text-gray-600">Loading transactions...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8eef5] to-[#dce4ed]">
      <Navbar />
      
      <main className="px-3 sm:px-6 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="neumorphic p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Income</p>
                <p className="text-2xl font-bold text-green-600">Rs. {totalIncome.toLocaleString()}</p>
              </div>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", getIconColor('income'))}>
                <ArrowDownLeft className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="neumorphic p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">Rs. {totalExpense.toLocaleString()}</p>
              </div>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", getIconColor('expense'))}>
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="neumorphic p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Savings</p>
                <p className="text-2xl font-bold text-blue-600">Rs. {totalSavings.toLocaleString()}</p>
              </div>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", getIconColor('savings'))}>
                <ArrowDownLeft className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        <div className="neumorphic p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-800">Transaction History</h2>
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="savings">Savings</option>
              </select>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600"
              >
                + Add
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Type</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Description</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Category</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-500">Date</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-500">Amount</th>
                  <th className="text-center py-3 px-2 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", getIconColor(transaction.type))}>
                        {getIcon(transaction.type)}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-medium text-gray-800">{transaction.description}</span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <span className={cn(
                        "font-semibold",
                        transaction.type === 'income' ? 'text-green-600' : 
                        transaction.type === 'savings' ? 'text-blue-600' : 'text-red-600'
                      )}>
                        {transaction.type === 'expense' ? '-' : '+'}Rs. {transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        transaction.status === 'completed' ? 'bg-green-100 text-green-600' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
                      )}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No transactions found</p>
            </div>
          )}
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="neumorphic p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Add Transaction</h2>
            
            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => {
                    const type = e.target.value as 'income' | 'expense' | 'savings';
                    setFormData({ 
                      ...formData, 
                      type, 
                      category: categories[type][0] 
                    });
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="savings">Savings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories[formData.type].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter description"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (Rs.)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                  required
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600"
                >
                  Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
