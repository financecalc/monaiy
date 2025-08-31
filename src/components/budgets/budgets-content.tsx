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
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Plus,
  Target,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Settings,
  Trash2,
  Edit,
} from 'lucide-react';

interface Budget {
  id: string;
  name: string;
  amount: number;
  spent: number;
  period: 'monthly' | 'yearly';
  category: string;
  color: string;
  isActive: boolean;
}

const mockBudgets: Budget[] = [
  {
    id: '1',
    name: 'Lebensmittel',
    amount: 500,
    spent: 320,
    period: 'monthly',
    category: 'Essen & Trinken',
    color: 'bg-green-500',
    isActive: true,
  },
  {
    id: '2',
    name: 'Transport',
    amount: 300,
    spent: 280,
    period: 'monthly',
    category: 'Mobilität',
    color: 'bg-blue-500',
    isActive: true,
  },
  {
    id: '3',
    name: 'Unterhaltung',
    amount: 200,
    spent: 180,
    period: 'monthly',
    category: 'Freizeit',
    color: 'bg-purple-500',
    isActive: true,
  },
  {
    id: '4',
    name: 'Urlaub',
    amount: 2000,
    spent: 0,
    period: 'yearly',
    category: 'Reisen',
    color: 'bg-orange-500',
    isActive: true,
  },
  {
    id: '5',
    name: 'Kleidung',
    amount: 150,
    spent: 200,
    period: 'monthly',
    category: 'Mode',
    color: 'bg-red-500',
    isActive: true,
  },
];

export function BudgetsContent() {
  const [budgets, setBudgets] = useState<Budget[]>(mockBudgets);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.amount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const totalRemaining = totalBudget - totalSpent;
  const overallProgress = (totalSpent / totalBudget) * 100;

  const overBudgetBudgets = budgets.filter(
    budget => budget.spent > budget.amount
  );
  const nearLimitBudgets = budgets.filter(budget => {
    const percentage = (budget.spent / budget.amount) * 100;
    return percentage >= 80 && percentage < 100;
  });

  const handleCreateBudget = (newBudget: Omit<Budget, 'id'>) => {
    const budget: Budget = {
      ...newBudget,
      id: Date.now().toString(),
      isActive: true,
    };
    setBudgets([...budgets, budget]);
    setShowCreateForm(false);
  };

  const handleUpdateBudget = (updatedBudget: Budget) => {
    setBudgets(
      budgets.map(b => (b.id === updatedBudget.id ? updatedBudget : b))
    );
    setEditingBudget(null);
  };

  const handleDeleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id));
  };

  const toggleBudgetStatus = (id: string) => {
    setBudgets(
      budgets.map(b => (b.id === id ? { ...b, isActive: !b.isActive } : b))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budgets</h1>
          <p className="text-muted-foreground">
            Setzen Sie Ausgabenlimits und verfolgen Sie Ihre Ausgaben
          </p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Neues Budget
        </Button>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gesamt Budget</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {totalBudget.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ausgegeben</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {totalSpent.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verbleibend</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-green-600' : 'text-red-600'}`}
            >
              {totalRemaining.toLocaleString('de-DE', {
                style: 'currency',
                currency: 'EUR',
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fortschritt</CardTitle>
            <div className="h-4 w-4 text-purple-600">
              <Target className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {overallProgress.toFixed(1)}%
            </div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(overBudgetBudgets.length > 0 || nearLimitBudgets.length > 0) && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Budget-Warnungen
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {overBudgetBudgets.map(budget => (
              <div
                key={budget.id}
                className="flex items-center justify-between p-3 bg-red-100 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${budget.color}`}></div>
                  <span className="font-medium text-red-800">
                    {budget.name}
                  </span>
                </div>
                <Badge>
                  {((budget.spent / budget.amount) * 100).toFixed(1)}%
                  überschritten
                </Badge>
              </div>
            ))}
            {nearLimitBudgets.map(budget => (
              <div
                key={budget.id}
                className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${budget.color}`}></div>
                  <span className="font-medium text-yellow-800">
                    {budget.name}
                  </span>
                </div>
                <Badge>
                  {((budget.spent / budget.amount) * 100).toFixed(1)}% erreicht
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Budgets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {budgets.map(budget => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onEdit={() => setEditingBudget(budget)}
            onDelete={() => handleDeleteBudget(budget.id)}
            onToggleStatus={() => toggleBudgetStatus(budget.id)}
          />
        ))}
      </div>

      {/* Create/Edit Form */}
      {(showCreateForm || editingBudget) && (
        <BudgetForm
          budget={editingBudget}
          onSubmit={editingBudget ? handleUpdateBudget : handleCreateBudget}
          onCancel={() => {
            setShowCreateForm(false);
            setEditingBudget(null);
          }}
        />
      )}
    </div>
  );
}

function BudgetCard({
  budget,
  onEdit,
  onDelete,
  onToggleStatus,
}: {
  budget: Budget;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}) {
  const percentage = (budget.spent / budget.amount) * 100;
  const isOverBudget = percentage > 100;
  const isNearLimit = percentage >= 80 && percentage < 100;

  return (
    <Card className={`${!budget.isActive ? 'opacity-60' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 rounded-full ${budget.color}`}></div>
            <CardTitle className="text-lg">{budget.name}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={onToggleStatus}>
              {budget.isActive ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <Settings className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
            <Button size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
        <CardDescription className="flex items-center gap-2">
          <Badge>{budget.category}</Badge>
          <Badge>
            {budget.period === 'monthly' ? 'Monatlich' : 'Jährlich'}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Ausgegeben</span>
          <span className="font-medium">
            {budget.spent.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Limit</span>
          <span className="font-medium">
            {budget.amount.toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fortschritt</span>
            <span
              className={`font-medium ${
                isOverBudget
                  ? 'text-red-600'
                  : isNearLimit
                    ? 'text-yellow-600'
                    : 'text-green-600'
              }`}
            >
              {percentage.toFixed(1)}%
            </span>
          </div>
          <Progress
            value={Math.min(percentage, 100)}
            className={`${
              isOverBudget
                ? 'bg-red-200'
                : isNearLimit
                  ? 'bg-yellow-200'
                  : 'bg-green-200'
            }`}
          />
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Verbleibend</span>
          <span
            className={`font-medium ${
              budget.amount - budget.spent >= 0
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {(budget.amount - budget.spent).toLocaleString('de-DE', {
              style: 'currency',
              currency: 'EUR',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function BudgetForm({
  budget,
  onSubmit,
  onCancel,
}: {
  budget: Budget | null;
  onSubmit: (budget: Budget) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    name: budget?.name || '',
    amount: budget?.amount || 0,
    period: budget?.period || 'monthly',
    category: budget?.category || '',
    color: budget?.color || 'bg-blue-500',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (budget) {
      onSubmit({ ...budget, ...formData });
    } else {
      onSubmit(formData as Budget);
    }
  };

  const colorOptions = [
    { value: 'bg-blue-500', label: 'Blau' },
    { value: 'bg-green-500', label: 'Grün' },
    { value: 'bg-red-500', label: 'Rot' },
    { value: 'bg-yellow-500', label: 'Gelb' },
    { value: 'bg-purple-500', label: 'Lila' },
    { value: 'bg-orange-500', label: 'Orange' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-indigo-500', label: 'Indigo' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {budget ? 'Budget bearbeiten' : 'Neues Budget erstellen'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="z.B. Lebensmittel"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Betrag</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={e =>
                  setFormData({
                    ...formData,
                    amount: parseFloat(e.target.value) || 0,
                  })
                }
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="period">Zeitraum</Label>
              <select
                id="period"
                value={formData.period}
                onChange={e =>
                  setFormData({
                    ...formData,
                    period: e.target.value as 'monthly' | 'yearly',
                  })
                }
                className="w-full px-3 py-2 border border-input rounded-md"
              >
                <option value="monthly">Monatlich</option>
                <option value="yearly">Jährlich</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={e =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="z.B. Essen & Trinken"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Farbe</Label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map(color => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, color: color.value })
                  }
                  className={`w-8 h-8 rounded-full ${color.value} border-2 ${
                    formData.color === color.value
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                  title={color.label}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" onClick={onCancel}>
              Abbrechen
            </Button>
            <Button type="submit">
              {budget ? 'Aktualisieren' : 'Erstellen'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
