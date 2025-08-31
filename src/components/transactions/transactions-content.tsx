'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  Tag,
  Calendar,
  Wallet,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  account: string;
  category: string;
  tags: string[];
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2024-01-15',
    description: 'Gehalt Januar 2024',
    amount: 3500.0,
    type: 'income',
    account: 'Sparkasse Girokonto',
    category: 'Einkommen',
    tags: ['Gehalt', 'Monatlich'],
  },
  {
    id: '2',
    date: '2024-01-14',
    description: 'Einkauf Rewe',
    amount: -89.45,
    type: 'expense',
    account: 'Sparkasse Girokonto',
    category: 'Lebensmittel',
    tags: ['Lebensmittel', 'Wocheneinkauf'],
  },
  {
    id: '3',
    date: '2024-01-13',
    description: 'Netflix Abonnement',
    amount: -17.99,
    type: 'expense',
    account: 'PayPal',
    category: 'Unterhaltung',
    tags: ['Streaming', 'Abonnement'],
  },
  {
    id: '4',
    date: '2024-01-12',
    description: 'Tankstelle Shell',
    amount: -65.8,
    type: 'expense',
    account: 'Sparkasse Girokonto',
    category: 'Transport',
    tags: ['Benzin', 'Auto'],
  },
  {
    id: '5',
    date: '2024-01-11',
    description: 'Freelance Projekt',
    amount: 1200.0,
    type: 'income',
    account: 'PayPal',
    category: 'Einkommen',
    tags: ['Freelance', 'Projekt'],
  },
];

export function TransactionsContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const accounts = useMemo(
    () => Array.from(new Set(mockTransactions.map(t => t.account))),
    []
  );

  const categories = useMemo(
    () => Array.from(new Set(mockTransactions.map(t => t.category))),
    []
  );

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter(transaction => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        transaction.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesAccount =
        selectedAccount === 'all' || transaction.account === selectedAccount;
      const matchesCategory =
        selectedCategory === 'all' || transaction.category === selectedCategory;
      const matchesType =
        selectedType === 'all' || transaction.type === selectedType;

      return matchesSearch && matchesAccount && matchesCategory && matchesType;
    });
  }, [searchQuery, selectedAccount, selectedCategory, selectedType]);

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const netAmount = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Umsätze</h1>
        <p className="text-muted-foreground">
          Übersicht aller Ihrer Finanztransaktionen
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Einnahmen</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalIncome.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausgaben</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalExpenses.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Netto</CardTitle>
            <div
              className={`h-4 w-4 ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {netAmount >= 0 ? <TrendingUp /> : <TrendingDown />}
            </div>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {netAmount.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Suche & Filter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Nach Beschreibung oder Tags suchen..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedAccount} onValueChange={setSelectedAccount}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Konto auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Konten</SelectItem>
                {accounts.map(account => (
                  <SelectItem key={account} value={account}>
                    {account}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kategorie auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Kategorien</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Typ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                <SelectItem value="income">Einnahmen</SelectItem>
                <SelectItem value="expense">Ausgaben</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaktionen</CardTitle>
              <CardDescription>
                {filteredTransactions.length} von {mockTransactions.length}{' '}
                Transaktionen
              </CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Neue Transaktion
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Keine Transaktionen gefunden
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTransactions.map(transaction => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-shrink-0">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === 'income'
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {transaction.type === 'income' ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate">{transaction.description}</p>
              <Badge className="text-xs">{transaction.category}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(transaction.date).toLocaleDateString('de-DE')}
              </span>
              <span className="flex items-center gap-1">
                <Wallet className="h-3 w-3" />
                {transaction.account}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div
              className={`font-bold ${
                transaction.type === 'income'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {transaction.type === 'income' ? '+' : '-'}
              {Math.abs(transaction.amount).toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {transaction.tags.map(tag => (
              <Badge key={tag} className="text-xs">
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>

          <Button size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t space-y-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Buchungstag:</span>
              <span className="ml-2 text-muted-foreground">
                {new Date(transaction.date).toLocaleDateString('de-DE')}
              </span>
            </div>
            <div>
              <span className="font-medium">Kategorie:</span>
              <span className="ml-2 text-muted-foreground">
                {transaction.category}
              </span>
            </div>
            <div>
              <span className="font-medium">Konto:</span>
              <span className="ml-2 text-muted-foreground">
                {transaction.account}
              </span>
            </div>
            <div>
              <span className="font-medium">Tags:</span>
              <span className="ml-2 text-muted-foreground">
                {transaction.tags.join(', ')}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm">
              <Tag className="mr-2 h-4 w-4" />
              Tags bearbeiten
            </Button>
            <Button size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Kategorie ändern
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
