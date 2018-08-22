import idb from 'idb';

const idbName = 'restaurant-db';
const idbCollection = 'restaurants';
const idbVersion = 1;
const idbPermission = 'readwrite';

const server = 'localhost';
const port = '1337';
const url = `http://${server}:${port}/restaurants`;

/*eslint-disable no-unused-vars*/

export class IdbHandler {
  static openDB() {
    if (!navigator.serviceWorker) {
      console.log('Service Worker in use...');
      return Promise.resolve();
    }
    console.log('Opening idb...');
    return idb.open(idbName, idbVersion, upgradeDb => {
      upgradeDb.createObjectStore(idbCollection, { keyPath: 'id' });
    });
  }

  /* fetch restaurant data from idb */
  static fetchIdbData(dbPromise) {
    console.log('fetch data from idb...')
    return dbPromise.then(db => {
      if (!db) return;
      return db
        .transaction(idbCollection)
        .objectStore(idbCollection)
        .getAll();
    });
  }

  /* fetch restaurant data from server and store to idb */
  static fetchAndStoreIdbData(dbPromise, callback) {
    console.log('fetch data from server...')
    fetch(url)
      .then(response => response.json())
      .then(restaurants => {
        dbPromise.then(db => {
          if (!db) return;
          restaurants.map(restaurant =>
            db
              .transaction(idbCollection, idbPermission)
              .objectStore(idbCollection)
              .put(restaurant)
          );  
        })
        return callback(null, restaurants);
      })
      .catch(error => callback(error, null));
  }
}
