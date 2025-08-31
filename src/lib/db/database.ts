import Dexie, { type Table } from 'dexie';
import {
  type Account,
  type Transaction,
  type Category,
  type Import,
} from '@/types/database';

export class MonaiyDatabase extends Dexie {
  accounts!: Table<Account>;
  transactions!: Table<Transaction>;
  categories!: Table<Category>;
  imports!: Table<Import>;

  constructor() {
    super('monaiy');

    this.version(1).stores({
      accounts: '++id, type, status, createdAt, updatedAt',
      transactions:
        '++id, accountId, date, amount, categoryId, externalId, createdAt, updatedAt',
      categories: '++id, name, type, color, createdAt, updatedAt',
      imports: '++id, type, status, createdAt, updatedAt',
    });

    // Add indexes for better query performance
    this.version(2).stores({
      transactions:
        '++id, accountId, date, amount, categoryId, externalId, createdAt, updatedAt, [accountId+date], [categoryId+date]',
    });

    // Add tags support
    this.version(3).stores({
      transactions:
        '++id, accountId, date, amount, categoryId, externalId, tags, createdAt, updatedAt, [accountId+date], [categoryId+date], [tags+date]',
    });
  }

  // Helper methods for common operations
  async getAccountBalance(accountId: string): Promise<number> {
    const transactions = await this.transactions
      .where('accountId')
      .equals(accountId)
      .toArray();

    return transactions.reduce((sum, tx) => sum + tx.amount, 0);
  }

  async getTransactionsByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<Transaction[]> {
    return await this.transactions
      .where('date')
      .between(startDate, endDate)
      .toArray();
  }

  async getTransactionsByCategory(categoryId: string): Promise<Transaction[]> {
    return await this.transactions
      .where('categoryId')
      .equals(categoryId)
      .toArray();
  }

  async searchTransactions(query: string): Promise<Transaction[]> {
    const lowerQuery = query.toLowerCase();

    return await this.transactions
      .filter(
        tx =>
          tx.description?.toLowerCase().includes(lowerQuery) ||
          tx.counterparty?.toLowerCase().includes(lowerQuery) ||
          tx.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      )
      .toArray();
  }

  async getMonthlyStats(
    year: number,
    month: number
  ): Promise<{
    income: number;
    expenses: number;
    net: number;
  }> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await this.getTransactionsByDateRange(
      startDate,
      endDate
    );

    const income = transactions
      .filter(tx => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = transactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

    return {
      income,
      expenses,
      net: income - expenses,
    };
  }
}

// Export singleton instance
export const db = new MonaiyDatabase();

// Export types for convenience
export type { Account, Transaction, Category, Import };
