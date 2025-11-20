import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hi! I'm Rajesh's AI Assistant. Ask me anything about his experience, skills, or education." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const response = await sendMessageToGemini(userMessage);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-secondary text-white rounded-full shadow-lg shadow-secondary/40 hover:bg-secondary/80 transition-all hover:scale-105 flex items-center justify-center"
        aria-label="Chat with AI"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] bg-surface rounded-2xl shadow-2xl shadow-slate-400/50 dark:shadow-black/50 border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300 max-h-[600px] h-[500px] backdrop-blur-xl">
          {/* Header */}
          <div className="bg-slate-50 dark:bg-white/5 p-4 flex items-center gap-3 border-b border-slate-200 dark:border-white/10">
            <div className="p-2 bg-secondary/20 rounded-lg">
              <Sparkles size={20} className="text-secondary" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white font-bold text-sm">Ask AI about Rajesh</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs">Powered by Gemini 2.5 Flash</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-background/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-secondary text-white rounded-br-none shadow-lg shadow-secondary/20'
                      : 'bg-surface border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface p-3 rounded-2xl rounded-bl-none border border-slate-200 dark:border-white/10 shadow-sm">
                  <Loader2 size={20} className="animate-spin text-secondary" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-surface border-t border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-black/20 rounded-full px-4 py-2 border border-slate-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-secondary/50 focus-within:border-secondary transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about experience, skills..."
                className="flex-1 bg-transparent border-none focus:outline-none text-slate-900 dark:text-slate-200 text-sm placeholder:text-slate-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-secondary disabled:text-slate-400 hover:scale-110 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;