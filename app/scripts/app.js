'use strict';

/**
 * @ngdoc overview
 * @name bookmanApp
 * @description
 * # bookmanApp
 *
 * Main module of the application.
 */


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
      .when('/author/:authorId', {
        templateUrl: 'views/main.html',
        controller: 'AuthorCtrl'
      })
      .when('/series/:reiheId', {
        templateUrl: 'views/main.html',
        controller: 'ReiheCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
