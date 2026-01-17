import { openDatabaseSync } from 'expo-sqlite';

export const seedExpenceCategories = async () => {
  const db = openDatabaseSync('test.db');
  const categories = [
    { title: 'Еда', color: '#ef4444', iconId: 'icon_1f34c' }, // red-500
    { title: 'Налоги', color: '#94a3b8', iconId: 'icon_1f34c' }, // slate-400
    { title: 'Транспорт', color: '#3b82f6', iconId: 'icon_1f34c' }, // blue-500
    { title: 'Кафе', color: '#f59e0b', iconId: 'icon_1f34c' }, // amber-500
    { title: 'Одежда', color: '#8b5cf6', iconId: 'icon_1f34c' }, // violet-500
    { title: 'Здоровье', color: '#10b981', iconId: 'icon_1f34c' }, // emerald-500
    { title: 'Работа', color: '#6b7280', iconId: 'icon_1f34c' }, // gray-500
    { title: 'Путешествия', color: '#ec4899', iconId: 'icon_1f34c' }, // pink-500
    { title: 'Развлечения', color: '#f97316', iconId: 'icon_1f34c' }, // orange-500
    { title: 'Спорт', color: '#0ea5e9', iconId: 'icon_1f34c' }, // sky-500
    { title: 'Кофе', color: '#65452d', iconId: 'icon_1f34c' }, // коричневый (кафе!)
    { title: 'Покупки', color: '#ec4899', iconId: 'icon_1f34c' }, // pink-500
    { title: 'Благотворительность', color: '#10b981', iconId: 'icon_1f34c' }, // emerald-500
    { title: 'Платежи', color: '#3b82f6', iconId: 'icon_1f34c' }, // blue-500
    { title: 'Прочее', color: '#6b7280', iconId: 'icon_1f34c' }, // gray-500
  ];

  for (const cat of categories) {
    await db.runAsync(
      `INSERT OR IGNORE INTO categories (title, color, transactionTypeId, iconId, system)
       VALUES (?, ?, ?, ?, ?)`,
      [cat.title, cat.color, 1, cat.iconId, 1]
    );
  }
};

export const seedIncomeCategories = async () => {
  const db = openDatabaseSync('test.db');
  const incomeCategories = [
    { title: 'Зарплата', color: '#10b981', iconId: 20 }, // emerald-500
    { title: 'Долг', color: '#22c55e', iconId: 21 }, // green-500
    { title: 'Подарок', color: '#f59e0b', iconId: 22 }, // amber-500
  ];

  for (const cat of incomeCategories) {
    await db.runAsync(
      `INSERT OR IGNORE INTO categories (title, color, transactionTypeId, iconId, system)
       VALUES (?, ?, ?, ?, ?)`,
      [cat.title, cat.color, 2, cat.iconId, 1]
    );
  }
};

export async function selectCategoriesByType(transactionTypeId = 1) {
  const db = openDatabaseSync('test.db');
  const res = await db.getAllAsync(`SELECT * FROM categories
     WHERE transactionTypeId = ?
     ORDER BY title`, [transactionTypeId]);

  return res;
}

export async function selectCategories(transactionTypeId = 1) {
  const db = openDatabaseSync('test.db');
  const res = await db.getAllAsync(`
    SELECT * FROM categories
    ORDER BY title`,
  );

  return res;
}

export async function updateCategory(category) {
  const updateObj = Object.keys(category)
    .reduce((acc, key) => {
      if (key !== 'id') {
        acc.fields.push(`${key} = ?`);
        acc.values.push(category[key]);
      }
      return acc;
    }, { values: [], fields: [] })

  const db = openDatabaseSync('test.db');
  const sql = `
    UPDATE categories
    SET ${updateObj.fields.join(', ')}
    WHERE id = ?
  `;

  await db.runAsync(sql, [...updateObj.values, category.id]);
}