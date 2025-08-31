'use client';

import { Plus, TrendingUp, TrendingDown, Wallet, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data - will be replaced with real data from IndexedDB
const mockAccounts = [
  {
    id: '1',
    name: 'Girokonto',
    balance: 2450.67,
    type: 'checking',
    lastSync: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sparkonto',
    balance: 12500.0,
    type: 'savings',
    lastSync: '2024-01-14',
  },
  {
    id: '3',
    name: 'Kreditkarte',
    balance: -125.3,
    type: 'credit',
    lastSync: '2024-01-15',
  },
];

const mockStats = {
  monthlyIncome: 3200.0,
  monthlyExpenses: 1850.45,
  netSavings: 1349.55,
};

export function DashboardOverview() {
  const totalBalance = mockAccounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Willkommen zurück!</h1>
          <p className="text-muted-foreground">
            Hier ist eine Übersicht Ihrer Finanzen
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Bank verbinden
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Gesamtguthaben
                </p>
                <p className="text-2xl font-bold">
                  {formatCurrency(totalBalance)}
                </p>
              </div>
              <Wallet className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Einnahmen (Monat)
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(mockStats.monthlyIncome)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Ausgaben (Monat)
                </p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(mockStats.monthlyExpenses)}
                </p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Konten</CardTitle>
              <CardDescription>
                Übersicht aller verknüpften Konten
              </CardDescription>
            </div>
            <span className="text-sm text-muted-foreground">
              {mockAccounts.length} Konten
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAccounts.map(account => (
              <div
                key={account.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={cn(
                      'p-2 rounded-full',
                      account.type === 'checking' &&
                        'bg-blue-100 text-blue-600',
                      account.type === 'savings' &&
                        'bg-green-100 text-green-600',
                      account.type === 'credit' &&
                        'bg-orange-100 text-orange-600'
                    )}
                  >
                    <Wallet className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Zuletzt synchronisiert: {account.lastSync}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      'text-lg font-semibold',
                      account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                    )}
                  >
                    {formatCurrency(account.balance)}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {account.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Transaktionen importieren</h3>
                <p className="text-sm text-muted-foreground">
                  CSV-Dateien von Ihrer Bank hochladen
                </p>
              </div>
            </div>
            <Button className="w-full mt-4">Import starten</Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Budget erstellen</h3>
                <p className="text-sm text-muted-foreground">
                  Neue Budgetkategorien anlegen
                </p>
              </div>
            </div>
            <Button className="w-full mt-4">Budget erstellen</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
