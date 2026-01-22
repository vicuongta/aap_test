import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

export default function AskQBtronInput() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    try {
      // Store the message in sessionStorage to pass to Chat page
      sessionStorage.setItem('qbtron_draft_message', query.trim());
      navigate(createPageUrl('Chat'));
    } catch (error) {
      toast.error("Couldn't open chat—try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 px-3 py-2 flex items-center gap-2 shadow-sm">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-600 mb-0.5">Ask QBtron</p>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask anything… (e.g., 'What should I focus on today?')"
          className="w-full text-sm text-gray-900 placeholder:text-gray-400 bg-transparent border-0 outline-none p-0"
        />
      </div>
      <button
        type="submit"
        disabled={!query.trim()}
        className="w-8 h-8 rounded-lg bg-[#2d6a4f] hover:bg-[#1b4332] disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors flex-shrink-0"
      >
        <Send className="w-4 h-4 text-white" />
      </button>
    </form>
  );
}