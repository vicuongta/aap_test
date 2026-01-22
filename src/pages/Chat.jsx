import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const quickPrompts = [
  "Plan my day",
  "What's urgent this week?",
  "Break down my next assignment",
  "How should I study today?"
];

const mockResponses = {
  default: "I'm QBtron, your AI study assistant! I can help you plan your schedule, prioritize tasks, and stay organized. What would you like help with?",
  plan: "Based on your schedule, I recommend focusing on your Binary Search Trees assignment (due in 2 days) this morning, then reviewing for your Linear Algebra quiz later. You have a 2-hour block free from 2-4 PM—perfect for deep work on CS301.",
  urgent: "You have 3 high-priority items this week:\n\n1. Binary Search Trees Assignment (CS301) - Due in 2 days\n2. Linear Algebra Quiz (MATH201) - Due in 5 days\n3. Research Paper Draft (ENG102) - Due in 7 days\n\nI'd suggest tackling the CS301 assignment first since it's closest and marked high priority.",
  assignment: "Let's break down your Binary Search Trees assignment:\n\n1. Review lecture notes on BST operations (30 min)\n2. Practice implementing insert/delete (1 hour)\n3. Complete the coding problems (1.5 hours)\n4. Test and debug (1 hour)\n\nTotal estimated time: 4 hours. Want me to add these as tasks to your schedule?",
  study: "For today, I recommend:\n\n🎯 Morning (9-11 AM): Work on CS301 assignment while your energy is high\n📚 Afternoon (2-3 PM): Review PSYCH101 reading\n💪 Evening (6-7 PM): Quick review session for MATH201 quiz\n\nThis balances urgent deadlines with consistent progress across all courses."
};

function MessageBubble({ message, isUser }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#2d6a4f] flex items-center justify-center mr-2 flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-wrap",
          isUser
            ? "bg-[#2d6a4f] text-white"
            : "bg-white border border-gray-100 text-gray-900"
        )}
      >
        {message}
      </div>
    </motion.div>
  );
}

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasLoadedDraft = useRef(false);

  const mockUser = {
    full_name: 'Alex Johnson',
    email: 'alex.johnson@university.edu'
  };

  useEffect(() => {
    // Check for draft message from Dashboard
    if (!hasLoadedDraft.current) {
      const draftMessage = sessionStorage.getItem('qbtron_draft_message');
      if (draftMessage) {
        sessionStorage.removeItem('qbtron_draft_message');
        hasLoadedDraft.current = true;
        handleSendMessage(draftMessage);
      }
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('plan') || msg.includes('day')) return mockResponses.plan;
    if (msg.includes('urgent') || msg.includes('week')) return mockResponses.urgent;
    if (msg.includes('assignment') || msg.includes('break down')) return mockResponses.assignment;
    if (msg.includes('study') || msg.includes('focus')) return mockResponses.study;
    return mockResponses.default;
  };

  const handleSendMessage = async (messageText) => {
    const text = messageText || input.trim();
    if (!text) return;

    // Add user message
    setMessages(prev => [...prev, { text, isUser: true }]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickPrompt = (prompt) => {
    handleSendMessage(prompt);
  };

  return (
    <AppLayout user={mockUser} title="QBtron Chat" breadcrumb="Dashboard / AI Chat">
      <div className="max-w-4xl mx-auto h-[calc(100vh-200px)] flex flex-col">
        {/* Quick Prompts - only show when no messages */}
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4"
          >
            <p className="text-sm text-gray-500 mb-3">Quick prompts:</p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickPrompt(prompt)}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 hover:border-[#2d6a4f] hover:bg-[#2d6a4f]/5 text-sm text-gray-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Messages Area */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#2d6a4f]/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#2d6a4f]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hi, I'm QBtron!
              </h3>
              <p className="text-gray-500 max-w-md">
                I can help you plan your schedule, prioritize tasks, and stay organized. Ask me anything about your studies!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <MessageBubble key={index} message={message.text} isUser={message.isUser} />
                ))}
              </AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#2d6a4f] flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3">
                    <Loader2 className="w-5 h-5 text-[#2d6a4f] animate-spin" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask QBtron anything..."
            className="flex-1 border-0 focus-visible:ring-0 text-base"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-[#2d6a4f] hover:bg-[#1b4332] rounded-xl px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </AppLayout>
  );
}