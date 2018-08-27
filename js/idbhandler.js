import idb from 'idb';

const idbName = 'restaurant-db';
const idbRestaurantsCollection = 'restaurants';
const idbReviewsCollection = 'reviews';
const idbVersion = 1;
const idbPermission = 'readwrite';

const server = 'localhost';
const port = '1337';
export const restaurantsUrl = `http://${server}:${port}/restaurants`;
export const reviewsUrl = `http://${server}:${port}/reviews`;

/*eslint-disable no-unused-vars*/

export class IdbHandler {
  static openDB() {
    if (!navigator.serviceWorker) {
      console.log('Service Worker in use...');
      return Promise.resolve();
    }
    console.log('Opening idb...');
    return idb.open(idbName, idbVersion, upgradeDb => {
      upgradeDb.createObjectStore(idbRestaurantsCollection, { keyPath: 'id' });
      upgradeDb.createObjectStore(idbReviewsCollection, { keyPath: 'id' });
    });
  }

  /* fetch restaurant data from idb */
  static fetchIdbData(dbPromise, collectionName) {
    const idbCollection = collectionName === 'restaurants' ? idbRestaurantsCollection : idbReviewsCollection;

    return dbPromise.then(db => {
      if (!db) return;
      return db
        .transaction(idbCollection)
        .objectStore(idbCollection)
        .getAll();
    });
  }

  /* fetch restaurant data from server and store to idb */
  static fetchAndStoreIdbData(dbPromise, collectionName, callback) {
    const url = collectionName === 'restaurants' ? restaurantsUrl : reviewsUrl;
    const idbCollection = collectionName === 'restaurants' ? idbRestaurantsCollection : idbReviewsCollection;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        dbPromise.then(db => {
          if (!db) return;
          data.map(record =>
            db
              .transaction(idbCollection, idbPermission)
              .objectStore(idbCollection)
              .put(record)
          );
        });
        return callback(null, data);
      })
      .catch(error => callback(error, null));
  }

  /* fetch restaurant data from server and store to idb */
  static toggleFavoriteInIdb(dbPromise, restaurantId, value) {
    /*eslint-disable no-undef*/
    dbPromise.then(db => {
      if (!db) return;
      const idbStore = db
        .transaction(idbRestaurantsCollection, idbPermission)
        .objectStore(idbRestaurantsCollection);
      idbStore.get(restaurantId).then(updatedRestaurant => {
        updatedRestaurant.is_favorite = value;
        idbStore.put(updatedRestaurant);
      });
      console.log(
        `Updated IDB with restaurant[${restaurantId}].is_favorite : ${value}`
      );
    });
  }
}
