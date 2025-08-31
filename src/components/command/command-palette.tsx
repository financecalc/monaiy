'use client';

import { useEffect, useState } from 'react';
import {
  Search,
  FileText,
  Settings,
  Wallet,
  BarChart3,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
  shortcut?: string;
}

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const commands: CommandItem[] = [
  {
    id: 'connect-bank',
    name: 'Bank verbinden',
    description: 'Neue Bank über FinTS verbinden',
    icon: Wallet,
    action: () => console.log('Connect bank'),
    shortcut: '⌘B',
  },
  {
    id: 'import-csv',
    name: 'CSV importieren',
    description: 'Transaktionsdaten aus CSV importieren',
    icon: FileText,
    action: () => console.log('Import CSV'),
    shortcut: '⌘I',
  },
  {
    id: 'view-transactions',
    name: 'Umsätze anzeigen',
    description: 'Alle Transaktionen durchsuchen',
    icon: FileText,
    action: () => console.log('View transactions'),
    shortcut: '⌘T',
  },
  {
    id: 'view-accounts',
    name: 'Konten anzeigen',
    description: 'Alle verknüpften Konten anzeigen',
    icon: Wallet,
    action: () => console.log('View accounts'),
    shortcut: '⌘A',
  },
  {
    id: 'view-analytics',
    name: 'Analysen öffnen',
    description: 'Finanzanalysen und Charts anzeigen',
    icon: BarChart3,
    action: () => console.log('View analytics'),
    shortcut: '⌘L',
  },
  {
    id: 'view-budgets',
    name: 'Budgets öffnen',
    description: 'Budgetverwaltung öffnen',
    icon: TrendingUp,
    action: () => console.log('View budgets'),
    shortcut: '⌘G',
  },
  {
    id: 'settings',
    name: 'Einstellungen',
    description: 'App-Einstellungen öffnen',
    icon: Settings,
    action: () => console.log('Open settings'),
    shortcut: '⌘,',
  },
];

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredCommands = commands.filter(
    command =>
      command.name.toLowerCase().includes(query.toLowerCase()) ||
      command.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            onOpenChange(false);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onOpenChange(false);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, selectedIndex, filteredCommands, onOpenChange]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-background rounded-lg shadow-lg border border-border">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <input
              type="text"
              placeholder="Befehle durchsuchen..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground"
              autoFocus
            />
            <div className="text-xs text-muted-foreground">⌘K</div>
          </div>

          {/* Command List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                Keine Befehle gefunden.
              </div>
            ) : (
              filteredCommands.map((command, index) => (
                <button
                  key={command.id}
                  onClick={() => {
                    command.action();
                    onOpenChange(false);
                  }}
                  className={cn(
                    'w-full flex items-center px-4 py-3 text-left hover:bg-accent transition-colors',
                    index === selectedIndex && 'bg-accent'
                  )}
                >
                  <command.icon className="h-5 w-5 text-muted-foreground mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{command.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {command.description}
                    </div>
                  </div>
                  {command.shortcut && (
                    <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {command.shortcut}
                    </div>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
