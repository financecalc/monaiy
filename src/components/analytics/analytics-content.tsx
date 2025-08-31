'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Heart,
  BookOpen,
  Zap,
  AlertTriangle,
} from 'lucide-react';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  net: number;
  categoryBreakdown: {
    [key: string]: number;
  };
}

const mockMonthlyData: MonthlyData[] = [
  {
    month: 'Januar 2024',
    income: 4700,
    expenses: 2850,
    net: 1850,
    categoryBreakdown: {
      Lebensmittel: 450,
      Transport: 320,
      Wohnen: 1200,
      Unterhaltung: 180,
      Gesundheit: 120,
      Bildung: 80,
      Sonstiges: 500,
    },
  },
  {
    month: 'Dezember 2023',
    income: 4200,
    expenses: 3100,
    net: 1100,
    categoryBreakdown: {
      Lebensmittel: 520,
      Transport: 280,
      Wohnen: 1200,
      Unterhaltung: 250,
      Gesundheit: 150,
      Bildung: 100,
      Sonstiges: 600,
    },
  },
  {
    month: 'November 2023',
    income: 4200,
    expenses: 2950,
    net: 1250,
    categoryBreakdown: {
      Lebensmittel: 480,
      Transport: 300,
      Wohnen: 1200,
      Unterhaltung: 200,
      Gesundheit: 120,
      Bildung: 90,
      Sonstiges: 560,
    },
  },
];

const categoryIcons: { [key: string]: React.ReactNode } = {
  Lebensmittel: <Utensils className="h-4 w-4" />,
  Transport: <Car className="h-4 w-4" />,
  Wohnen: <Home className="h-4 w-4" />,
  Unterhaltung: <Heart className="h-4 w-4" />,
  Gesundheit: <Zap className="h-4 w-4" />,
  Bildung: <BookOpen className="h-4 w-4" />,
  Sonstiges: <ShoppingCart className="h-4 w-4" />,
};

export function AnalyticsContent() {
  const [selectedPeriod, setSelectedPeriod] = useState('3');
  const [selectedMonth, setSelectedMonth] = useState('0');

  const currentData = mockMonthlyData[parseInt(selectedMonth)];
  const periodData = mockMonthlyData.slice(0, parseInt(selectedPeriod));

  const totalIncome = periodData.reduce((sum, month) => sum + month.income, 0);
  const totalExpenses = periodData.reduce(
    (sum, month) => sum + month.expenses,
    0
  );
  const totalNet = totalIncome - totalExpenses;
  const averageMonthlyExpenses = totalExpenses / periodData.length;

  const topCategories = currentData
    ? Object.entries(currentData.categoryBreakdown)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
    : [];

  const savingsRate = ((totalNet / totalIncome) * 100).toFixed(1);

  if (!currentData) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Keine Daten verfügbar</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analysen</h1>
        <p className="text-muted-foreground">
          Gewinnen Sie Einblicke in Ihre Finanzen und Ausgabenmuster
        </p>
      </div>

      {/* Period Selection */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center">
            <span className="text-sm font-medium">Zeitraum:</span>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Monat</SelectItem>
                <SelectItem value="3">3 Monate</SelectItem>
                <SelectItem value="6">6 Monate</SelectItem>
                <SelectItem value="12">12 Monate</SelectItem>
              </SelectContent>
            </Select>

            <span className="text-sm font-medium ml-4">Monat:</span>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mockMonthlyData.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month.month}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gesamt Einnahmen
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalIncome.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Ø{' '}
              {Math.round(totalIncome / periodData.length).toLocaleString(
                'de-DE',
                { style: 'currency', currency: 'EUR' }
              )}{' '}
              pro Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gesamt Ausgaben
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalExpenses.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Ø{' '}
              {Math.round(averageMonthlyExpenses).toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}{' '}
              pro Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Netto</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalNet >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {totalNet.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
            <p className="text-xs text-muted-foreground">
              Ø{' '}
              {Math.round(totalNet / periodData.length).toLocaleString(
                'de-DE',
                { style: 'currency', currency: 'EUR' }
              )}{' '}
              pro Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sparrate</CardTitle>
            <div className="h-4 w-4 text-purple-600">
              <BarChart3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${parseFloat(savingsRate) >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {savingsRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              {totalNet >= 0 ? 'Positiv' : 'Negativ'} in diesem Zeitraum
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Overview Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Monatliche Übersicht
          </CardTitle>
          <CardDescription>
            Einnahmen, Ausgaben und Netto über den gewählten Zeitraum
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {periodData.map((month, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium">{month.month}</div>

                <div className="flex-1 flex gap-2">
                  <div className="flex-1 bg-green-100 rounded h-8 flex items-center justify-center">
                    <span className="text-xs font-medium text-green-700">
                      +
                      {month.income.toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                  <div className="flex-1 bg-red-100 rounded h-8 flex items-center justify-center">
                    <span className="text-xs font-medium text-red-700">
                      -
                      {month.expenses.toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                  <div
                    className={`flex-1 rounded h-8 flex items-center justify-center ${
                      month.net >= 0 ? 'bg-blue-100' : 'bg-orange-100'
                    }`}
                  >
                    <span
                      className={`text-xs font-medium ${
                        month.net >= 0 ? 'text-blue-700' : 'text-orange-700'
                      }`}
                    >
                      {month.net >= 0 ? '+' : ''}
                      {month.net.toLocaleString('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Ausgaben nach Kategorie
            </CardTitle>
            <CardDescription>
              Top 5 Ausgabenkategorien im {currentData.month}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCategories.map(([category, amount]) => {
                const percentage = (
                  (amount / currentData.expenses) *
                  100
                ).toFixed(1);
                return (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {categoryIcons[category]}
                      <span className="font-medium">{category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {amount.toLocaleString('de-DE', {
                          style: 'currency',
                          currency: 'EUR',
                        })}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Trends & Insights
            </CardTitle>
            <CardDescription>
              Automatische Erkenntnisse zu Ihren Ausgaben
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">
                    Ausgaben gesunken
                  </p>
                  <p className="text-sm text-green-700">
                    Ihre Ausgaben sind im Vergleich zum Vormonat um 8% gesunken.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">
                    Lebensmittel optimiert
                  </p>
                  <p className="text-sm text-blue-700">
                    Sie geben 15% weniger für Lebensmittel aus als im
                    Durchschnitt.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">
                    Transport erhöht
                  </p>
                  <p className="text-sm text-yellow-700">
                    Ihre Transportkosten sind um 12% gestiegen. Prüfen Sie
                    Alternativen.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Button>
              <BarChart3 className="mr-2 h-4 w-4" />
              Detaillierte Analyse
            </Button>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Zeitraum vergleichen
            </Button>
            <Button>
              <TrendingUp className="mr-2 h-4 w-4" />
              Ziele setzen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
