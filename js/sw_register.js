if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('sw.js')
    .then(registration => {
      console.log(`Registration successful in scope ${registration.scope}`);
    })
    .catch(error => {
      console.log(`Service worker registration failed with error: ${error}`);
    });
}
