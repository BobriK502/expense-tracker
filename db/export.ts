import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';

export const exportDatabase = async () => {
  const dbName = 'test.db'; // ← твоё имя БД
  const sourceUri = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  const destUri = `${FileSystem.documentDirectory}${dbName}`;

  try {
    // Проверим, существует ли файл
    const fileInfo = await FileSystem.getInfoAsync(sourceUri);
    if (!fileInfo.exists) {
      throw new Error('База данных не найдена');
    }

    // Копируем в корень documentDirectory (чтобы можно было поделиться)
    await FileSystem.copyAsync({
      from: sourceUri,
      to: destUri,
    });

    // Открываем диалог отправки
    await shareAsync(destUri, {
      mimeType: 'application/x-sqlite3',
      dialogTitle: 'Экспорт базы данных',
    });

  } catch (error) {
    console.error('Ошибка экспорта БД:', error);
    alert('Не удалось экспортировать базу данных');
  }
};