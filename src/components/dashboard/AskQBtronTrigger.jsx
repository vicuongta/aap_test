import React, { useEffect } from 'react';
import { Sparkles, MessageCircle } from 'lucide-react';
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
        "group relative flex items-center gap-2 rounded-full px-4 h-12 transition-all duration-300",
        "bg-gradient-to-r from-[#0d3320] via-[#1F4E3D] to-[#40916c]",
        "hover:from-[#0a2618] hover:via-[#163a2e] hover:to-[#2d6a4f]",
        "shadow-sm shadow-[#2d6a4f]/20 hover:shadow-md hover:shadow-[#2d6a4f]/30",
        className
      )}
    >
      {/* Sparkle icon */}
      <Sparkles className="w-5 h-5 text-white/90 group-hover:text-white group-hover:animate-pulse" />

      {/* Text */}
      <span className="text-sm font-medium text-white/90 group-hover:text-white hidden sm:inline truncate">
        Ask QBtron...
      </span>

      {/* Keyboard shortcut */}

    </button>
  );
}