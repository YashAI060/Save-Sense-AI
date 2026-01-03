import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { TrendingUp, BarChart3, Coins, Building2, ShieldAlert, Info, DollarSign, Clock, AlertTriangle, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Investment {
  name: string;
  risk: string;
  return: string;
  description: string;
  minimum_amount: string;
  duration: string;
  liquidity: string;
}

const Investment = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/investments");
        const data = await response.json();
        setInvestments(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Investment data load nahi ho saka.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchInvestments();
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'moderate': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getIcon = (name: string) => {
    if (name.includes('Stock')) return <BarChart3 className="w-6 h-6" />;
    if (name.includes('Gold')) return <Coins className="w-6 h-6" />;
    if (name.includes('Real Estate')) return <Building2 className="w-6 h-6" />;
    return <TrendingUp className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-12 transition-colors">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Investment Opportunities</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Apne savings ko grow karein. Pakistan mein maujood mukhtalif investment options ka muwazna karein.
          </p>
        </header>

        <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 p-4 rounded-2xl mb-12 flex items-start gap-4">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
            <ShieldAlert className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h4 className="font-bold text-orange-800 dark:text-orange-300 text-sm">Financial Disclaimer</h4>
              <p className="text-xs text-orange-700 dark:text-orange-400/80 mt-1 leading-relaxed">
                Investment mein hamesha risk hota hai. Koi bhi bara qadam uthane se pehle mukammal research karein ya kisi mahir se mashwara lein. Save Sense AI sirf maloomat faraham karta hai.
              </p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="neumorphic bg-white dark:bg-slate-900 h-32 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {investments.map((inv, idx) => (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <div className="neumorphic bg-white dark:bg-slate-900 p-6 rounded-3xl border border-white/50 dark:border-slate-800 flex flex-col md:flex-row gap-6 items-center group hover:translate-x-2 transition-all duration-300 cursor-pointer">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-800 neumorphic-inset flex-shrink-0">
                      {getIcon(inv.name)}
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{inv.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getRiskColor(inv.risk)} dark:bg-opacity-20`}>
                          {inv.risk} Risk
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl">
                        {inv.description}
                      </p>
                    </div>

                    <div className="text-center md:text-right min-w-[120px]">
                      <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Avg. Return</p>
                      <p className="text-2xl font-black text-green-600 dark:text-green-400">{inv.return}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <div className="p-3 rounded-2xl bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all neumorphic group-hover:shadow-md">
                        <Info className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      {getIcon(inv.name)}
                      {inv.name}
                    </DialogTitle>
                    <DialogDescription>
                      Detailed information about this investment option
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">Expected Return</p>
                          <p className="text-lg font-bold text-green-600">{inv.return}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <div>
                          <p className="text-sm font-medium">Risk Level</p>
                          <p className="text-lg font-bold text-orange-600">{inv.risk}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">Minimum Amount</p>
                          <p className="text-lg font-bold text-blue-600">{inv.minimum_amount}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-purple-600" />
                        <div>
                          <p className="text-sm font-medium">Duration</p>
                          <p className="text-lg font-bold text-purple-600">{inv.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 col-span-2">
                        <Droplets className="w-4 h-4 text-cyan-600" />
                        <div>
                          <p className="text-sm font-medium">Liquidity</p>
                          <p className="text-lg font-bold text-cyan-600">{inv.liquidity}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Description & Tips</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {inv.description}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 dark:text-gray-500">
            More investment types coming soon: Crypto, Commodities, and Peer-to-Peer Lending.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
