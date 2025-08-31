export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'other';
  status: 'active' | 'inactive' | 'pending';
  balance: number;
  currency: string;
  bankName?: string;
  accountNumber?: string;
  iban?: string;
  bic?: string;
  lastSync?: Date;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  externalId?: string;
  date: Date;
  valueDate?: Date;
  amount: number;
  currency: string;
  description?: string;
  counterparty?: string;
  categoryId?: string;
  tags: string[];
  type: 'income' | 'expense' | 'transfer' | 'other';
  status: 'completed' | 'pending' | 'cancelled';
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense' | 'transfer';
  color: string;
  icon?: string;
  parentId?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Import {
  id: string;
  type: 'csv' | 'pdf' | 'fints' | 'paypal';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  fileName?: string;
  fileSize?: number;
  source: string;
  transactionCount?: number;
  errorMessage?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Budget {
  id: string;
  name: string;
  amount: number;
  currency: string;
  period: 'monthly' | 'yearly' | 'custom';
  startDate: Date;
  endDate?: Date;
  categoryIds: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetProgress {
  budgetId: string;
  spent: number;
  remaining: number;
  percentage: number;
  isOverBudget: boolean;
}

// Zod schemas for validation
export const AccountSchema = {
  id: 'string',
  name: 'string',
  type: 'string',
  status: 'string',
  balance: 'number',
  currency: 'string',
  bankName: 'string?',
  accountNumber: 'string?',
  iban: 'string?',
  bic: 'string?',
  lastSync: 'Date?',
  metadata: 'object?',
  createdAt: 'Date',
  updatedAt: 'Date',
} as const;

export const TransactionSchema = {
  id: 'string',
  accountId: 'string',
  externalId: 'string?',
  date: 'Date',
  valueDate: 'Date?',
  amount: 'number',
  currency: 'string',
  description: 'string?',
  counterparty: 'string?',
  categoryId: 'string?',
  tags: 'array',
  type: 'string',
  status: 'string',
  metadata: 'object?',
  createdAt: 'Date',
  updatedAt: 'Date',
} as const;

export const CategorySchema = {
  id: 'string',
  name: 'string',
  type: 'string',
  color: 'string',
  icon: 'string?',
  parentId: 'string?',
  isDefault: 'boolean',
  createdAt: 'Date',
  updatedAt: 'Date',
} as const;

export const ImportSchema = {
  id: 'string',
  type: 'string',
  status: 'string',
  fileName: 'string?',
  fileSize: 'number?',
  source: 'string',
  transactionCount: 'number?',
  errorMessage: 'string?',
  metadata: 'object?',
  createdAt: 'Date',
  updatedAt: 'Date',
} as const;
