'use strict';

/**
 * @ngdoc function
 * @name bookmanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookmanApp
 */
angular.module('bookmanApp')
  .controller('MainCtrl', function ($scope, $http) {


	$http.get('data/books.json')
	       .then(function(res){
	          var booksDB = TAFFY(res.data);
	          $scope.books = booksDB().order('autor').get();
	        });

	$http.get('data/author.json')
	       .then(function(res){
	          var autorDB = TAFFY(res.data);
	          $scope.autoren = autorDB().get();
	        });

	$http.get('data/series.json')
	       .then(function(res){
	          var reiheDB = TAFFY(res.data);
	          $scope.reihen = reiheDB().get();
	        });

    $scope.abook = false;
    
   

    $scope.active = function(index) {
    	$scope.abook = $scope.books[index];
    };
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
