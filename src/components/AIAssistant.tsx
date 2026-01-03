import { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const AIAssistant = () => {
  // Messages State
    const [messages, setMessages] = useState<Message[]>([
      {
        id: '1',
        text: "Assalam-o-Alaikum! Main hoon Save Sense AI advisor. 🤖\nMujhse Pakistani banks, savings ya investments ke baare mein kuch bhi poocho!",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state for AI

  const quickQuestions = [
    "Best bank for students in Pakistan?",
    "How to save PKR 300 daily?",
    "EasyPaisa vs JazzCash comparison?",
    "Halal investment options?"
  ];

  // --- MAIN FUNCTION: Sends data to Python Backend ---
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // 1. User ka message list mein add karo
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true); // Loading shuru...

    try {
      // 2. Python Backend ko call lagao
      const response = await fetch("http://127.0.0.1:8000/api/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage.text }),
      });

      const data = await response.json();

      // 3. AI ka jawab list mein add karo
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, mujhe server se koi jawab nahi mila.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error connecting to backend:", error);
      // Agar backend band ho to yeh error dikhao
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "⚠️ Server Offline: Please ensure 'uvicorn main:app' is running in backend folder.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false); // Loading khatam
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    // Optional: Auto-send on click logic here if needed
  };

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Chat Messages */}
        <Card className="shadow-lg border-t-4 border-t-blue-600 dark:border-t-blue-500 neumorphic overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-gray-100 dark:border-slate-800">
              <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-400">
                <Bot className="w-6 h-6" />
                <span>Save Sense AI Assistant</span>
              </CardTitle>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Powered by Save Sense Intelligence</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white dark:bg-slate-950">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      message.isBot
                        ? 'bg-gray-100 dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-tl-none neumorphic-button'
                        : 'bg-blue-600 text-white rounded-tr-none shadow-blue-200 dark:shadow-none'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.isBot && (
                        <Bot className="w-4 h-4 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      )}
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.text}
                      </div>
                      {!message.isBot && (
                        <User className="w-4 h-4 mt-1 text-blue-100 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 dark:bg-slate-900 px-4 py-2 rounded-2xl flex items-center space-x-2 text-gray-500 dark:text-gray-400 text-sm neumorphic-inset">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Save Sense AI soch raha hai...</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>


      {/* Quick Questions */}
      <Card className="neumorphic dark:bg-slate-900/50 border-none">
        <CardHeader>
          <CardTitle className="text-lg dark:text-gray-100">Quick Questions for Pakistani Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                className="text-left h-auto p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 transition-colors border-gray-200 dark:border-slate-800 dark:text-gray-300 neumorphic-button"
                onClick={() => handleQuickQuestion(question)}
                disabled={isLoading}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card className="neumorphic dark:bg-slate-900/50 border-none">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me about Pakistani banks, saving tips..."
              className="flex-1 dark:bg-slate-950 dark:border-slate-800 dark:text-gray-200"
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              className="px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading || !inputMessage.trim()}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};