import { openDatabaseSync } from 'expo-sqlite';

import { dbName } from '@/db/index';
import { type Transaction } from '@/types/entities/transaction';

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

export async function update(transaction: Transaction) {
  const updateObj = Object.keys(transaction)
    .reduce((acc, key) => {
      if (key !== 'id') {
        acc.fields.push(`${key} = ?`);
        acc.values.push(transaction[key]);
      }
      return acc;
    }, { values: [], fields: [] })

  const db = openDatabaseSync('test.db');
  const sql = `
    UPDATE transactions
    SET ${updateObj.fields.join(', ')}
    WHERE id = ?
  `;

  try {
    await db.runAsync(sql, [...updateObj.values, transaction.id]);
  } catch(e) {
    console.log(e);
    throw new Error(JSON.stringify(e));
  }
}

export async function create({
  transactionTypeId,
  title,
  amount,
  notice = '',
  transactionDate,
  categoryId,
}: Omit<Transaction, 'id'>) {
  const db = openDatabaseSync(dbName);

  try {
    await db.runAsync(`
    INSERT INTO transactions (transactionTypeId, amount, transactionDate, title, notice, categoryId, currencyCode)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [transactionTypeId, amount * 100, transactionDate, title, notice, categoryId, 933]);
  } catch (e) {
    console.log(e);
  }
}

export async function getTransactionsByMonth(
  date: Date,
  limit: number,
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
      ORDER BY t.transactionDate DESC
      LIMIT ?
      `,
      [yearMonth, limit]
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

export async function getAllTransactionsAmount() {
  const db = openDatabaseSync(dbName);

  try {
    const res = db.getAllAsync(`
      SELECT
        SUM(CASE WHEN transactionTypeId = 1 THEN amount ELSE 0 END) as expencesAmount,
        SUM(CASE WHEN transactionTypeId = 2 THEN amount ELSE 0 END) as incomeAmount,
        COUNT() as count
      FROM
        transactions
    `);

    return res;
  } catch (e) {
    console.log(e);
  }
}