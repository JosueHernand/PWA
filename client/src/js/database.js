import { openDB } from 'idb';

const initdb = async () =>
  openDB('WebFlowText', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('WebFlowText')) {
        console.log('WebFlowText database already exists');
        return;
      }
      db.createObjectStore('WebFlowText', { keyPath: 'id', autoIncrement: true });
      console.log('WebFlowText database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => console.error('putDb not implemented');

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();
