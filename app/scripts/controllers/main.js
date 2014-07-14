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
    $scope.reihen = reiheDB().get();
    $scope.autoren = autorDB().get();
  })
  .controller('AuthorCtrl', function ($scope, $routeParams) {
    $scope.books = booksDB({autor:{has:parseInt($routeParams.authorId)}}).get();
    $scope.reihen = reiheDB().get();
    $scope.autoren = autorDB().get();
  })
  .controller('AuthorListCtrl', function ($scope) {
    $scope.autoren = autorDB().order('nachname').get();
    $scope.reihen = reiheDB().order('titel').get();
  })
  .controller('ReiheCtrl', function ($scope, $routeParams) {
    $scope.books = booksDB({reihe:parseInt($routeParams.reiheId)}).get();
    $scope.reihen = reiheDB().get();
    $scope.autoren = autorDB().get();
  });