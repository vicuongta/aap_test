import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, Loader2, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const quickPrompts = [
  "Plan my day",
  "What's urgent?",
  "Break down my next assignment",
  "How much work this week?"
];

const mockResponses = {
  default: "I'm QBtron, your AI study assistant! I can help you plan your schedule, prioritize tasks, and stay organized. What would you like help with?",
  plan: "Based on your schedule, I recommend focusing on your Binary Search Trees assignment (due in 2 days) this morning, then reviewing for your Linear Algebra quiz later. You have a 2-hour block free from 2-4 PM—perfect for deep work on CS301.",
  urgent: "You have 3 high-priority items this week:\n\n1. Binary Search Trees Assignment (CS301) - Due in 2 days\n2. Linear Algebra Quiz (MATH201) - Due in 5 days\n3. Research Paper Draft (ENG102) - Due in 7 days\n\nI'd suggest tackling the CS301 assignment first since it's closest and marked high priority.",
  assignment: "Let's break down your Binary Search Trees assignment:\n\n1. Review lecture notes on BST operations (30 min)\n2. Practice implementing insert/delete (1 hour)\n3. Complete the coding problems (1.5 hours)\n4. Test and debug (1 hour)\n\nTotal estimated time: 4 hours. Want me to add these as tasks to your schedule?",
  study: "For today, I recommend:\n\n🎯 Morning (9-11 AM): Work on CS301 assignment while your energy is high\n📚 Afternoon (2-3 PM): Review PSYCH101 reading\n💪 Evening (6-7 PM): Quick review session for MATH201 quiz\n\nThis balances urgent deadlines with consistent progress across all courses.",
  week: "This week you have:\n• 7 total assignments/tasks\n• 3 high-priority deadlines\n• Estimated 24 hours of work\n\nYou have 5 full days until your first major deadline, so pace yourself at ~4-5 hours per day."
};

function MessageBubble({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex gap-2 mb-3", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#2d6a4f] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap",
          isUser
            ? "bg-[#2d6a4f] text-white"
            : "bg-white border border-gray-200 text-gray-900"
        )}
      >
        {message}
      </div>
    </motion.div>
  );
}

export default function ChatPopup({ open, onOpenChange, initialMessage }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    if (open && initialMessage && messages.length === 0) {
      handleSendMessage(initialMessage);
    }
  }, [open, initialMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('plan') || msg.includes('day') || msg.includes('today')) return mockResponses.plan;
    if (msg.includes('urgent')) return mockResponses.urgent;
    if (msg.includes('assignment') || msg.includes('break down')) return mockResponses.assignment;
    if (msg.includes('study') || msg.includes('focus')) return mockResponses.study;
    if (msg.includes('week') || msg.includes('much work')) return mockResponses.week;
    return mockResponses.default;
  };

  const handleSendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text) return;

    setMessages(prev => [...prev, { text, isUser: true }]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  const handleExpand = () => {
    sessionStorage.setItem('qbtron_messages', JSON.stringify(messages));
    navigate(createPageUrl('Chat'));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[520px] h-[580px] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">QBtron Chat</DialogTitle>
              <p className="text-xs text-gray-500 mt-0.5">Ask about your schedule, tasks, and deadlines</p>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-gray-600"
                onClick={handleExpand}
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4 bg-[#f6f8f6]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center mb-3">
                <Sparkles className="w-7 h-7 text-[#2d6a4f]" />
              </div>
              <p className="text-sm text-gray-500 mb-4 max-w-xs">
                Ask something like: "What's urgent this week?"
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-3 py-1.5 rounded-full bg-white border border-gray-200 hover:border-[#2d6a4f] hover:bg-[#2d6a4f]/5 text-xs text-gray-700 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <AnimatePresence>
                {messages.map((message, index) => (
                  <MessageBubble key={index} message={message.text} isUser={message.isUser} />
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 mb-3"
                >
                  <div className="w-7 h-7 rounded-full bg-[#2d6a4f] flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2">
                    <Loader2 className="w-4 h-4 text-[#2d6a4f] animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="px-5 py-4 border-t border-gray-200 flex-shrink-0 bg-white">
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question…"
              className="flex-1 border-gray-200 focus-visible:ring-[#2d6a4f]"
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-lg px-4"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}