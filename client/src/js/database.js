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

// TODO: Add logic to a method that accepts some content and adds it to the database
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

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
