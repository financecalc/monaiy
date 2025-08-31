'use client';

import { useState } from 'react';
import { Search, Command, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CommandPalette } from '@/components/command/command-palette';

export function DashboardHeader() {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between h-16 px-6 border-b border-border bg-background">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Suche nach Umsätzen, Konten..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-muted border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Command Palette Trigger */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md',
              'hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary'
            )}
          >
            <Command className="h-4 w-4" />
            <span className="hidden sm:inline">⌘K</span>
          </button>

          {/* Notifications */}
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
            <Bell className="h-5 w-5" />
          </button>

          {/* User Menu */}
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
            <User className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette open={isCommandOpen} onOpenChange={setIsCommandOpen} />
    </>
  );
}
