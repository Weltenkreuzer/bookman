'use strict';

/**
 * @ngdoc function
 * @name bookmanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookmanApp
 */
angular.module('bookmanApp')
  .controller('MainCtrl', function ($scope) {
    $scope.books = booksDB().get();
    $scope.reihen = reiheDB();
    $scope.autoren = autorDB();
  });
