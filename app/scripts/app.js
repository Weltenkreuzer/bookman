'use strict';

/**
 * @ngdoc overview
 * @name bookmanApp
 * @description
 * # bookmanApp
 *
 * Main module of the application.
 */

var booksDB = TAFFY([
  {id:1, titel: 'Harry Potter und der Stein der Weisen', autor: [1], cover:'http://ecx.images-amazon.com/images/I/51ZU%2BCvkTyL.jpg', reihe: 1, nummer: 1},
  {id:2, titel: 'Harry Potter und die Kammer des Schreckens', autor: [1], cover:'http://ecx.images-amazon.com/images/I/51dNrc6oESL.jpg', reihe: 1, nummer: 2},
  {id:3, titel: 'Die Tribute von Panem. Tödliche Spiele', autor: [2], cover:'http://ecx.images-amazon.com/images/I/517wkVZfQ2L.jpg', reihe: 2, nummer: 1},
  {id:4, titel: 'Die Tribute von Panem. Gefährliche Liebe', autor: [2], cover:'http://ecx.images-amazon.com/images/I/51N1FEWWwRL.jpg', reihe: 2, nummer: 2},
  {id:5, titel: 'Die sonderbare Buchhandlung des Mr. Penumbra', autor: [3], cover:'http://ecx.images-amazon.com/images/I/51FbIY49hZL.jpg'}
]);
console.log(booksDB);

var autorDB = TAFFY([
  {id:1, vorname: 'Joanne K.', nachname: 'Rowling'},
  {id:2, vorname: 'Suzanne', nachname: 'Collins'},
  {id:3, vorname: 'Robin', nachname: 'Sloan'}
]);

var reiheDB = TAFFY([
  {id:1, titel: 'Harry Potter'},
  {id:2, titel: 'Die Tribute von Panem'}
]);

angular
  .module('bookmanApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
