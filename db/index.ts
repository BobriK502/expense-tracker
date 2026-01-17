
import { type SQLiteDatabase, openDatabaseAsync } from 'expo-sqlite';
import { seedExpenceCategories, seedIncomeCategories } from '@/db/categories/index';

export const dbName = 'test.db';

async function initDatabase(db: SQLiteDatabase) {
  try {
    await db.execAsync('PRAGMA foreign_keys = ON;');
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactionTypes (
      id INTEGER PRIMARY KEY NOT NULL,
      title TEXT NOT NULL
    );
  `);
    await db.execAsync(`
    INSERT INTO transactionTypes (title, id) VALUES ('expence', 1);
    INSERT INTO transactionTypes (title, id) VALUES ('income', 2);
  `);
    await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY NOT NULL,
      transactionTypeId INTEGER NOT NULL,
      amount REAL NOT NULL,
      transactionDate TEXT NOT NULL,
      title TEXT NOT NULL,
      notice TEXT,
      categoryId TEXT,
      FOREIGN KEY (transactionTypeId) REFERENCES transactionTypes (id) ON DELETE CASCADE
    );
  `);
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY NOT NULL,
        color TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        transactionTypeId INTEGER NOT NULL,
        iconId TEXT NOT NULL,
        system INTEGER DEFAULT 0,
        FOREIGN KEY (transactionTypeId) REFERENCES transactionTypes (id) ON DELETE CASCADE
      );
    `);
    await seedExpenceCategories();
    await seedIncomeCategories();
  } catch (e) {
    console.log(e)
  }
};

async function migrationV2(db: SQLiteDatabase) {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY NOT NULL,
        color TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        transactionTypeId INTEGER NOT NULL,
        iconId TEXT NOT NULL,
        system INTEGER DEFAULT 0,
        FOREIGN KEY (transactionTypeId) REFERENCES transactionTypes (id) ON DELETE CASCADE
      );
    `);

  const hasColumn = (await db.getAllAsync("PRAGMA table_info(transactions);"))
    .some(col => col.name === 'categoryId');

  if (!hasColumn) {
    await db.execAsync("ALTER TABLE transactions ADD COLUMN categoryId TEXT;");
    await db.execAsync(
      "CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(categoryId);"
    );
    await seedExpenceCategories();
    await seedIncomeCategories();
  }
}

async function migrationV3(db: SQLiteDatabase) {
  await db.withExclusiveTransactionAsync(async (tnx) => {
    const hasColumn = (await tnx.getAllAsync("PRAGMA table_info(transactions);"))
      .some(col => col.name === 'currencyCode');

    if (!hasColumn) {
      await tnx.execAsync("ALTER TABLE transactions ADD COLUMN currencyCode INTEGER NOT NULL DEFAULT 933;");
    }

    await tnx.execAsync(`
    UPDATE transactions SET amount = amount * 100
    `)

    await tnx.execAsync(
      `
       CREATE TABLE IF NOT EXISTS categories1 (
        id INTEGER PRIMARY KEY NOT NULL,
        color TEXT NOT NULL,
        title TEXT NOT NULL UNIQUE,
        description TEXT,
        transactionTypeId INTEGER NOT NULL,
        iconId TEXT NOT NULL,
        system INTEGER DEFAULT 0,
        FOREIGN KEY (transactionTypeId) REFERENCES transactionTypes (id) ON DELETE CASCADE
      );
      `
    );

    await tnx.execAsync(
      `
      INSERT INTO categories1 SELECT * FROM categories
      `
    )

    await tnx.execAsync(
      `
      DROP TABLE categories
      `
    )

    await tnx.execAsync(
      `
      ALTER TABLE categories1 RENAME TO categories
      `
    )
  })


  await seedExpenceCategories();
}

async function migartionV4() {
  await seedExpenceCategories();
}

async function migrationV5(db: SQLiteDatabase) {
  const trToFix = await db.getAllAsync(`
    SELECT * FROM transactions
  `)


  const tf = trToFix.filter((tr) => !tr.categoryId).map((tr) => tr.id);
  const str = tf.join(',')


  await db.runAsync(`
    UPDATE transactions SET categoryId = 1 WHERE id IN (${str})
    `)
}

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 5;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  ) ?? {};
  console.log(currentDbVersion)
  if (currentDbVersion && currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await initDatabase(db);
    currentDbVersion = 1;
  } else if (currentDbVersion === 1) {
    await migrationV2(db);
    currentDbVersion = 2;
  } else if (currentDbVersion === 2) {
    await migrationV3(db);
    currentDbVersion = 3;
  } else if (currentDbVersion === 3) {
    await migartionV4();
    currentDbVersion = 4;
  } else if (currentDbVersion === 4) {
    console.log('here')
    await migrationV5(db);
    currentDbVersion = 5;
  }
  await db.execAsync(`PRAGMA user_version = ${currentDbVersion}`);
}

export async function dropTables() {
  try {
    const db = await openDatabaseAsync(dbName);

    await db.execAsync(`
    DROP TABLE transactions;
    DROP TABLE transactionTypes;
    DROP TABLE categories
  `)
    await db.execAsync(`PRAGMA user_version = 0`);
  } catch (e) {
    console.log(e);
  }

}

export async function reinitDb() {
  const db = await openDatabaseAsync(dbName);

  await initDatabase(db);

  const tables = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table';"
  );
}