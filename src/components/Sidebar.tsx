
import { Calendar, Bot, Building2, Target, X, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    {
      id: 'calendar',
      icon: Calendar,
      label: 'Daily Tracker',
      description: 'Log your daily savings'
    },
    {
      id: 'ai-assistant',
      icon: Bot,
      label: 'AI Assistant',
      description: 'Financial guidance for Pakistan'
    },
    {
      id: 'saving-options',
      icon: Building2,
      label: 'Banking Options',
      description: 'Pakistani banks & wallets'
    },
    {
      id: 'investment-options',
      icon: TrendingUp,
      label: 'Investment Options',
      description: 'Short, mid & long-term investments'
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-600 to-blue-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Save Sense</h1>
                  <p className="text-green-100 text-sm">Smart Finance Tracker</p>
                </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onClose();
              }}
              className={cn(
                "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200 group",
                activeTab === item.id
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                activeTab === item.id
                  ? "bg-green-100 text-green-600"
                  : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
              )}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* Goal Progress */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">PKR 1,00,000</div>
            <div className="text-sm text-gray-600">Your Savings Goal</div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full w-1/4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
