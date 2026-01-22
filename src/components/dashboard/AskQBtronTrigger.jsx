import React, { useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AskQBtronTrigger({ onClick, className }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClick('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  return (
    <button
      onClick={() => onClick('')}
      className={cn(
        "flex items-center gap-2 bg-white rounded-full border border-gray-200 hover:border-[#2d6a4f]/40 hover:shadow-sm transition-all px-3 py-2 h-10",
        className
      )}
    >
      <Sparkles className="w-4 h-4 text-[#2d6a4f] flex-shrink-0" />
      <span className="text-sm text-gray-500 hidden sm:inline">Ask QBtron…</span>
      <kbd className="hidden lg:inline-flex items-center gap-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 flex-shrink-0 ml-auto">
        ⌘K
      </kbd>
    </button>
  );
}