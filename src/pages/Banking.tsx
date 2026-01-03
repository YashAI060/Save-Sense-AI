import { useState, useEffect, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { Landmark, ArrowUpRight, ShieldCheck, CreditCard, Wallet, Calculator, TrendingUp, Lightbulb, Clock, Target, Rocket } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Bank {
  name: string;
  rate: string;
  type: string;
  description: string;
}

interface BankFeatures {
  [key: string]: {
    features: string[];
    minAmount: number;
  };
}

const bankFeatures: BankFeatures = {
  "Meezan Bank": {
    features: ["Islamic Banking", "Halal Profit", "No Hidden Charges", "24/7 Support"],
    minAmount: 1000
  },
  "HBL": {
    features: ["Wide ATM Network", "Mobile Banking", "Loyalty Rewards", "Quick Transfers"],
    minAmount: 500
  },
  "UBL": {
    features: ["Online Banking", "Low Fees", "Business Accounts", "International Cards"],
    minAmount: 1000
  },
  "Bank Alfalah": {
    features: ["Cashback Offers", "Digital Wallet", "Free Insurance", "Priority Banking"],
    minAmount: 2000
  },
  "MCB": {
    features: ["Corporate Banking", "Investment Plans", "Secure Transactions", "Loan Facility"],
    minAmount: 1000
  },
  "Faysal Bank": {
    features: ["Islamic Products", "Auto Finance", "Home Loans", "Deposit Protection"],
    minAmount: 500
  },
  "Allied Bank": {
    features: ["Savings Plus", "Term Deposits", "Pensioner Accounts", "Child Accounts"],
    minAmount: 1000
  },
  "Askari Bank": {
    features: ["Defence Banking", "Special Rates", "Easy Loans", "Secure Cards"],
    minAmount: 1500
  },
  "Standard Chartered": {
    features: ["International Access", "Premium Services", "Wealth Management", "Travel Benefits"],
    minAmount: 5000
  },
  "JS Bank": {
    features: ["Digital First", "Student Accounts", "Microfinance", "Quick Approval"],
    minAmount: 500
  },
  "JazzCash": {
    features: ["Mobile Wallet", "Bill Payments", "Easy Transfer", "No Bank Needed"],
    minAmount: 100
  },
  "Easypaisa": {
    features: ["Instant Payments", "Utility Bills", "Mobile Top-up", "Merchant Pay"],
    minAmount: 100
  }
};

const getDefaultFeatures = () => ({
  features: ["Savings Account", "Online Banking", "ATM Card", "Customer Support"],
  minAmount: 1000
});

const Banking = () => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [monthlySaving, setMonthlySaving] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const { toast } = useToast();

  const calculateBankReturn = (bank: Bank) => {
    const monthly = parseFloat(monthlySaving) || 0;
    const months = parseFloat(duration) || 0;
    if (monthly <= 0 || months <= 0) return null;

    const rateStr = bank.rate.replace('%', '').replace(' p.a.', '').trim();
    const rate = parseFloat(rateStr) / 100;
    const monthlyRate = rate / 12;
    
    let total = 0;
    for (let i = 0; i < months; i++) {
      total = (total + monthly) * (1 + monthlyRate);
    }
    const investment = monthly * months;
    const profit = total - investment;
    
    return { totalReturn: total, profit, investment };
  };

  const totalInvestment = useMemo(() => {
    const monthly = parseFloat(monthlySaving) || 0;
    const months = parseFloat(duration) || 0;
    return monthly * months;
  }, [monthlySaving, duration]);

  const bestReturnBank = useMemo(() => {
    if (banks.length === 0 || !monthlySaving || !duration) return null;
    
    const monthly = parseFloat(monthlySaving) || 0;
    const months = parseFloat(duration) || 0;
    if (monthly <= 0 || months <= 0) return null;

    let bestBank = banks[0];
    let bestReturn = 0;

    banks.forEach(bank => {
      const rateStr = bank.rate.replace('%', '').replace(' p.a.', '').trim();
      const rate = parseFloat(rateStr) / 100;
      const monthlyRate = rate / 12;
      
      let total = 0;
      for (let i = 0; i < months; i++) {
        total = (total + monthly) * (1 + monthlyRate);
      }
      const profit = total - (monthly * months);
      
      if (profit > bestReturn) {
        bestReturn = profit;
        bestBank = bank;
      }
    });

    const rateStr = bestBank.rate.replace('%', '').replace(' p.a.', '').trim();
    const rate = parseFloat(rateStr) / 100;
    const monthlyRate = rate / 12;
    let totalAmount = 0;
    for (let i = 0; i < months; i++) {
      totalAmount = (totalAmount + monthly) * (1 + monthlyRate);
    }

    return {
      bank: bestBank,
      totalReturn: totalAmount,
      profit: totalAmount - (monthly * months)
    };
  }, [banks, monthlySaving, duration]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/banks");
        const data = await response.json();
        setBanks(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Banking data load nahi ho saka.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanks();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Islamic': return <ShieldCheck className="w-6 h-6 text-green-500" />;
      case 'Wallet': return <Wallet className="w-6 h-6 text-orange-500" />;
      default: return <Landmark className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-12 transition-colors">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <header className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Banking Options</h1>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Pakistan ke top banks aur unke latest saving rates. Apne paise ko sahi jagah rakh kar munafa kamayein.
            </p>
          </header>

          {/* Saving Calculator */}
          <div className="mb-12 neumorphic bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-white/50 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/30">
                <Calculator className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Saving Calculator</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Row 1: Monthly Saving & Total Investment */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Monthly Saving Amount (PKR)</label>
                <input
                  type="number"
                  value={monthlySaving}
                  onChange={(e) => setMonthlySaving(e.target.value)}
                  placeholder="e.g., 10000"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Investment</label>
                <div className="w-full px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 font-bold text-lg">
                  PKR {totalInvestment.toLocaleString()}
                </div>
              </div>

              {/* Row 2: Duration & Best Return Option */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Duration (Months)</label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 12"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">Best Return Option</label>
                {bestReturnBank ? (
                  <div className="w-full px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-bold text-blue-700 dark:text-blue-400">{bestReturnBank.bank.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300">{bestReturnBank.bank.rate}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Total Return: <span className="font-bold text-green-600 dark:text-green-400">PKR {Math.round(bestReturnBank.totalReturn).toLocaleString()}</span>
                      <span className="ml-2 text-xs">(Profit: PKR {Math.round(bestReturnBank.profit).toLocaleString()})</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-400 dark:text-gray-500 text-sm">
                    Enter amount & duration to see best option
                  </div>
                )}
              </div>
            </div>
          </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="neumorphic bg-white dark:bg-slate-900 h-64 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {banks.map((bank, idx) => {
                const bankReturn = calculateBankReturn(bank);
                const features = bankFeatures[bank.name] || getDefaultFeatures();
                const isBestBank = bestReturnBank && bestReturnBank.bank.name === bank.name;
                
                return (
                <div key={idx} className={`relative neumorphic bg-white dark:bg-slate-900 p-6 rounded-3xl border group hover:translate-y-[-4px] transition-all duration-300 ${isBestBank ? 'border-green-500 border-2 ring-2 ring-green-500/20' : 'border-white/50 dark:border-slate-800'}`}>
                  {isBestBank && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg">
                      BEST RETURN
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 neumorphic-inset">
                      {getIcon(bank.type)}
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Profit Rate</p>
                      <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{bank.rate}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{bank.name}</h3>
                  <div className="inline-block px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase mb-3">
                    {bank.type} Banking
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {features.features.map((feature, i) => (
                      <span key={i} className="px-2 py-1 text-[10px] font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-lg">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-xl p-3 mb-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Min Amount:</span>
                      <span className="font-bold text-gray-700 dark:text-gray-300">PKR {features.minAmount.toLocaleString()}</span>
                    </div>
                    
                    {bankReturn ? (
                      <>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Total Return:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">PKR {Math.round(bankReturn.totalReturn).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Profit:</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">PKR {Math.round(bankReturn.profit).toLocaleString()}</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-xs text-gray-400 dark:text-gray-500 text-center py-1">
                        Enter amount & duration above to see returns
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                    {bank.description}
                  </p>

                  <button className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg ${isBestBank ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-800 dark:bg-blue-600 text-white hover:bg-gray-700 dark:hover:bg-blue-700'}`}>
                    Visit Website
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              )})}
            </div>
        )}

          {/* Smart Investment Tips */}
          <div className="mt-16 neumorphic bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-white/50 dark:border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-900/30">
                <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Smart Investment Tips</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Short Term */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-blue-500/20">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Short Term</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">1-6 Months</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    <span>Emergency fund ke liye ideal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    <span>Liquid assets mein invest karein</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    <span>Savings account ya money market</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-blue-200 dark:border-blue-700">
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Recommended: JazzCash, Easypaisa</p>
                </div>
              </div>

              {/* Mid Term */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-purple-500"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-purple-500/20">
                    <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Mid Term</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">6-24 Months</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                    <span>Goals ke liye planning (car, vacation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                    <span>Fixed deposits best option</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                    <span>Higher profit rates available</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-purple-200 dark:border-purple-700">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">Recommended: HBL, UBL, MCB</p>
                </div>
              </div>

              {/* Long Term */}
              <div className="relative p-5 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 border border-green-200 dark:border-green-800 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-xl bg-green-500/20">
                    <Rocket className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-100">Long Term</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">24+ Months</p>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    <span>Retirement ya house ke liye</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    <span>Islamic banking for halal profit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    <span>Maximum compound interest benefit</span>
                  </li>
                </ul>
                <div className="mt-4 pt-3 border-t border-green-200 dark:border-green-700">
                  <p className="text-xs font-semibold text-green-600 dark:text-green-400">Recommended: Meezan Bank, Faysal Bank</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 neumorphic bg-cyan-400 dark:bg-blue-950 p-8 rounded-[2rem] text-black dark:text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold mb-2">Need a custom recommendation?</h2>
              <p className="text-black/80 dark:text-blue-100">Hamara AI Assistant aapki zaroorat ke mutabiq behtareen bank suggest kar sakta hai.</p>
            </div>
              <button 
                onClick={() => window.location.href = '/ai-assistant'}
                className="px-8 py-4 bg-black dark:bg-white text-white dark:text-blue-600 rounded-2xl font-bold hover:bg-gray-900 dark:hover:bg-blue-50 transition-colors whitespace-nowrap shadow-xl"
              >
                Ask Save Sense AI
              </button>
          </div>
      </div>
    </div>
  );
};

export default Banking;
