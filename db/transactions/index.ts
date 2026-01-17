import { openDatabaseSync } from 'expo-sqlite';

import { dbName } from '@/db/index';

import type { Transaction } from '@/types/entities/transaction';

export async function createExpence({
  title,
  amount,
  notice,
  date,
  categoryId,
}) {
  const dateString = date instanceof Date ? date.toISOString() : date;
  const db = openDatabaseSync(dbName);

  try {
    await db.runAsync(`
    INSERT INTO transactions (transactionTypeId, amount, transactionDate, title, notice, categoryId, currencyCode)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [1, amount * 100, dateString, title, notice, categoryId, 933]);
  } catch (e) {
    console.log(e);
  }
}

export async function createIncome({
  title,
  amount,
  notice,
  date,
  categoryId,
}) {
  const dateString = date instanceof Date ? date.toISOString() : date;
  const db = openDatabaseSync(dbName);

  try {
    await db.runAsync(`
    INSERT INTO transactions (transactionTypeId, amount, transactionDate, title, notice, categoryId, currencyCode)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [2, amount * 100, dateString, title, notice, categoryId, 933]);
  } catch (e) {
    console.log(e);
  }
}

export async function getTransactionsByMonth(
  date: Date,
): Promise<Array<Transaction>>{
  const db = openDatabaseSync(dbName);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${year}-${month}`;

  try {
    const transactions = await db.getAllAsync <Transaction>(
      `SELECT
        t.id,
        t.amount,
        t.transactionDate,
        t.categoryId,
        t.title,
        t.notice,
        t.transactionTypeId,
        c.color,
        c.title AS categoryTitle,
        c.iconId
      FROM transactions AS t
      LEFT JOIN categories AS c ON c.id = t.categoryId
      WHERE strftime('%Y-%m', t.transactionDate) = ?
      ORDER BY t.transactionDate DESC`,
      [yearMonth]
    );

    return transactions;
  } catch(e) {
    throw new Error(JSON.stringify(e))
    return [] as Array<Transaction>;
  }
};

export async function deleteRecordById(id: number) {
  const db = openDatabaseSync(dbName);
  try {
    db.runAsync(`
    DELETE FROM transactions WHERE id = ?
    `,
      [id],
    );
  } catch (e) {
    console.log(e);
  }
  
}

export async function getTransacrionsByType(
  type: number,
  period: Date,
) {
  const db = openDatabaseSync(dbName);
  const year = period.getFullYear();
  const month = String(period.getMonth() + 1).padStart(2, '0');
  const yearMonth = `${year}-${month}`;

  try {
    const expensesByCategory = await db.getAllAsync(
      `SELECT
      c.id,
      c.title,
      c.color,
      c.iconId,
      SUM(t.amount) AS total,
      COUNT(t.id) AS transactionCount
   FROM transactions t
   JOIN categories c ON c.id = t.categoryId
   WHERE
     t.transactionTypeId = ?
     AND strftime('%Y-%m', t.transactionDate) = ?
   GROUP BY c.id
   ORDER BY total DESC`,
      [type, yearMonth]
    );

    return expensesByCategory
  } catch (e) {
    console.log(e)
    return [];
  }
}