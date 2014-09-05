'use strict';

/**
 * @ngdoc function
 * @name bookmanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookmanApp
 */
angular.module('bookmanApp')
  .run(function($http, $rootScope){
  
  $http.get('data/books.json')
         .then(function(res){
            $rootScope.booksDB = TAFFY(res.data);
          });

  $http.get('data/author.json')
         .then(function(res){
            $rootScope.autorDB = TAFFY(res.data);
          });

  $http.get('data/series.json')
         .then(function(res){
            $rootScope.reiheDB = TAFFY(res.data);
          });
    
  })
  .controller('MainCtrl', function ($scope, $rootScope) {

  $scope.books = $rootScope.booksDB().order('autor').get();
  $scope.autoren = $rootScope.autorDB().get();
  $scope.reihen = $rootScope.reiheDB().get();
 
  $scope.mainview = 'standardView';
  $scope.abook = false;
  $scope.filters = { };  
  $scope.amenu = 2;
   

  $scope.active = function(index) {
    $scope.amenu = 1;
  	$scope.abook = $scope.books[index];
  };

  $scope.filter = function(property, filt) {
    $scope.filters = {};
    $scope.filters[property] = filt;

    $scope.filter_author = "";
    $scope.filter_series = "";

  };

  })
  .controller('AuthorCtrl', function ($scope, $rootScope, $routeParams) {

    var id = parseInt($routeParams.authorId);

    $scope.books = $rootScope.booksDB({autor:{has:id}}).get();
    $scope.autoren = $rootScope.autorDB().get();
    $scope.curAuthor = $rootScope.autorDB({id:id}).first();
    $scope.reihen = $rootScope.reiheDB().get();
    $scope.mainview = 'authorView';

    $scope.active = function(index) {
      $scope.amenu = 1;
      $scope.abook = $scope.books[index];
    };

    $scope.filter = function(property, filt) {
      $scope.filters = {};
      $scope.filters[property] = filt;

      $scope.filter_author = "";
      $scope.filter_series = "";
    };
  })
  .directive('filterSeries', function(){
    return {
      replace:'true',
      restrict:'EC',
      templateUrl:'/views/filterSeries.html'
    };
  })
  .directive('filterAuthor', function(){
    return {
      replace:'true',
      restrict:'EC',
      templateUrl:'/views/filterAuthor.html'
    };
  })
  .directive('bookDetailSm', function(){
    return {
      replace:'true',
      restrict:'EC',
      templateUrl:'/views/bookDetailSm.html'
    };
  })
  .directive('standardView', function(){
    return {
      replace:'true',
      restrict:'EACM',
      templateUrl:'/views/standardView.html'
    };
  })
  .directive('authorView', function(){
    return {
      replace:'true',
      restrict:'EACM',
      templateUrl:'/views/authorView.html'
    };
  });
