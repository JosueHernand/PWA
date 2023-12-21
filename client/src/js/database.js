import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('WebFlowText', 'readwrite');
  const store = tx.objectStore('WebFlowText');

  try {
    const id = await store.put({ content });
    console.log(`Content added to the database with ID ${id}`);
  } catch (error) {
    console.error('Error adding content to the database', error);
  }

  await tx.done;
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('WebFlowText', 'readonly');
  const store = tx.objectStore('WebFlowText');

  try {
    const allContent = await store.getAll();
    console.log('All content retrieved from the database:', allContent);
    return allContent;
  } catch (error) {
    console.error('Error getting content from the database', error);
  }

  await tx.done;
};

initdb();
