import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const allQuestionSets = [
  [
    "Bachon ki education ke liye kahan invest karein?",
    "Small investments ke options batayein.",
    "Gold mein invest karna kaisa hai?",
    "Mahine ka budget kaise manage karein?"
  ],
  [
    "Emergency fund kitna hona chahiye?",
    "Fixed deposit ya mutual funds behtar hain?",
    "Ghar khareedne ke liye kitna save karein?",
    "Retirement planning kaise karein?"
  ],
  [
    "Stock market mein invest kaise shuru karein?",
    "SIP kya hoti hai aur kaise kaam karti hai?",
    "Insurance kitna zaroori hai?",
    "Loan lena chahiye ya nahi?"
  ],
  [
    "Tax bachane ke tareeqe batayein?",
    "Side income ke ideas kya hain?",
    "Crypto mein invest karna safe hai?",
    "Monthly kharche kaise kam karein?"
  ]
];

const getQuestionSetForUser = () => {
  const uniqueId = localStorage.getItem('unique_id') || '';
  const savingStartDate = localStorage.getItem('saving_start_date') || '';
  const seed = uniqueId + savingStartDate;
  
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const index = Math.abs(hash) % allQuestionSets.length;
  return allQuestionSets[index];
};

const AIAssistant = () => {
    const [messages, setMessages] = useState<Message[]>([
      { role: 'assistant', content: 'Assalam-o-Alaikum! Main aapka Save Sense AI advisor hoon. Main aapki kya madad kar sakta hoon?' }
    ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();
  
    const [quickQuestions] = useState(() => getQuestionSetForUser());
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const sendMessage = async (content: string) => {
      if (!content.trim()) return;
  
      const userMessage = content.trim();
      setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
      setIsLoading(true);
  
      try {
        const response = await fetch("http://localhost:8000/api/advisor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: userMessage }),
        });
  
        const data = await response.json();
        if (data.response) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        } else {
          throw new Error("Invalid response");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "AI se connect nahi ho saka. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleSend = () => {
      if (!input.trim()) return;
      sendMessage(input);
      setInput("");
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 pb-12 transition-colors">
        <Navbar />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 mb-4 neumorphic-inset">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Powered by Gemini AI</span>
            </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Save Sense AI Assistant</h1>
            <p className="text-gray-500 dark:text-gray-400">Apne financial sawalaat poochein (Hinglish mein)</p>
          </header>
  
          <div className="neumorphic bg-white dark:bg-slate-900 min-h-[500px] flex flex-col rounded-3xl overflow-hidden border border-white/50 dark:border-slate-800">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-h-[600px]">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800 dark:bg-slate-700'
                    }`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white shadow-lg rounded-tr-none' 
                        : 'neumorphic-inset bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-200 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-slate-700 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="p-4 rounded-2xl text-sm bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-gray-400 neumorphic-inset rounded-tl-none italic animate-pulse">
                      Typing...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
  
            {/* Input Area */}
            <div className="p-4 bg-gray-50/50 dark:bg-slate-900/50 border-t border-gray-100 dark:border-slate-800">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Poochein, '1000 rupay kahan invest karun?'"
                  className="neumorphic-inset bg-white dark:bg-slate-950 border-none dark:text-gray-100 h-12 rounded-2xl focus-visible:ring-blue-500"
                />
                <Button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="h-12 w-12 rounded-2xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 shadow-lg p-0"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
  
            {/* Quick Questions System */}
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 px-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                Aksar Pooche Janay Walay Sawalaat (Quick Questions)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(q)}
                    disabled={isLoading}
                    className="text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-white/50 dark:border-slate-800 neumorphic hover:bg-gray-50 dark:hover:bg-slate-800 transition-all duration-300 text-sm text-gray-700 dark:text-gray-200 group flex items-center justify-between gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-medium">{q}</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Send className="w-3.5 h-3.5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

  );
};

export default AIAssistant;
