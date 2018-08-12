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
      return Promise.resolve();
    }
    return idb.open(idbName, idbVersion, upgradeDb => {
      upgradeDb.createObjectStore(idbCollection, { keyPath: 'id' });
    });
  }

  /* fetch restaurant data from idb */
  static fetchIdbData(dbPromise) {
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
    fetch(url)
      .then(response => response.json())
      .then(restaurants => {
        restaurants.map(restaurant =>
          db
            .transaction(idbCollection, idbPermission)
            .objectStore(idbCollection)
            .put(restaurant)
        );
        return callback(null, restaurants);
      })
      .catch(error => callback(error, null));
  }
}
