'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  BarChart3,
  CreditCard,
  FileText,
  Home,
  Settings,
  TrendingUp,
  Wallet,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Konten', href: '/accounts', icon: Wallet },
  { name: 'Umsätze', href: '/transactions', icon: FileText },
  { name: 'Analysen', href: '/analytics', icon: BarChart3 },
  { name: 'Budgets', href: '/budgets', icon: TrendingUp },
  { name: 'Import', href: '/import', icon: CreditCard },
  { name: 'Einstellungen', href: '/settings', icon: Settings },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-card border-r border-border">
      {/* Logo */}
      <div className="flex items-center h-16 px-6 border-b border-border">
        <h1 className="text-xl font-bold text-primary">monaiy</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="text-xs text-muted-foreground text-center">v0.1.0</div>
      </div>
    </div>
  );
}
