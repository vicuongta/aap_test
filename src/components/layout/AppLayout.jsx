import React, { useState } from 'react';
import PermanentSidebar from '@/components/navigation/PermanentSidebar';
import AppHeader from '@/components/navigation/AppHeader';
import { cn } from '@/lib/utils';

export default function AppLayout({ children, user, title, breadcrumb, className }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="h-screen flex bg-[#f6f8f6] overflow-hidden">
      {/* Fixed Permanent Sidebar - Always visible, collapsible */}
      <PermanentSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content Area - Flex column layout */}
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300 overflow-hidden",
        sidebarCollapsed ? "ml-[72px]" : "ml-[270px]"
      )}>
        <AppHeader user={user} title={title} breadcrumb={breadcrumb} />

        {/* Main Content: fills remaining space */}
        <main className={cn("flex-1 flex flex-col overflow-hidden p-3 lg:p-5", className)}>
          {children}
        </main>
      </div>
    </div>
  );
}