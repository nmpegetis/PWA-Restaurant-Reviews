!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=8)}({8:function(e,t,n){"use strict";var i=["index.html","restaurant.html","/sw.js","/idbhandler.js","dist/main.bundle.js","dist/restaurant_info.bundle.js","dist/idb.bundle.js","dist/idbhandler.bundle.js","dist/dbhelper.bundle.js","dist/maps.bundle.js","dist/sw_register.bundle.js","css/styles.css","img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg","img/icon.png"];(void 0).addEventListener("install",function(e){console.log("service worker installed"),e.waitUntil(caches.open("mwsRestaurantApp-001").then(function(e){return console.log("serviceWorker is now caching ..."),e.addAll(i)}).catch(function(e){console.log("Caches open failed: "+e)}))}),(void 0).addEventListener("activate",function(e){console.log("Activating new service worker ..."),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.filter(function(e){return e.startsWith("mwsRestaurantApp-")&&"mwsRestaurantApp-001"!=e}).map(function(e){return caches.delete(e)})).then(function(){console.log("New service worker in now actived!")}).catch(function(){console.log("New service worker failed to be activated!")})}))}),(void 0).addEventListener("fetch",function(e){e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then(function(t){return t||fetch(e.request).then(function(t){return caches.open("mwsRestaurantApp-001").then(function(n){return n.put(e.request,t.clone()),t})})}).catch(function(e){return new Response("Not connected to the internet",{status:404,statusText:"Not connected to the internet"})}))}),(void 0).addEventListener("message",function(e){"skipWaiting"===e.data.action&&(void 0).skipWaiting()})}});
//# sourceMappingURL=sw.bundle.js.map