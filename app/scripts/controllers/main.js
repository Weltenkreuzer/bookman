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

  // Aktuell versucht er beim ersten Laden den Scope zu füllen, bevor durch die 
  // Initialisierung der RootScope gesetzt ist.

  $scope.books = $rootScope.booksDB().order('autor').get();
  $scope.autoren = $rootScope.autorDB().get();
  $scope.reihen = $rootScope.reiheDB().get();
 
  $scope.mainview = 'standardView';
  $scope.abook = false;
  $scope.filters = {};  
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
  .controller('SearchCtrl', function ($scope, $http) {

    var books = [];

    function addBook(data) {
      var newBook = {};

      console.log(data.ItemAttributes[0].Title);

      newBook.ASIN = data.ASIN[0];
      newBook.title = data.ItemAttributes[0].Title[0];
      newBook.authorString = data.ItemAttributes[0].Author;
      newBook.cover = data.LargeImage[0].URL[0];

      console.log(newBook);
      books.push(newBook);
      console.log(books);
    }

    $scope.search = function() {
      if ($scope.text) {
        $http.get(encodeURI('http://localhost:3000/search?q=' + $scope.text))
          .then(function(res){
            var result = res.data;  
            result.forEach(addBook);
            $scope.$parent.books = books;
            $scope.$parent.mainview = 'standardView';
          });

      }
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
  .directive('searchForm', function(){
    return {
      replace:'true',
      restrict:'EC',
      templateUrl:'/views/searchForm.html'
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
  })
  .directive('searchView', function(){
    return {
      replace:'true',
      restrict:'EACM',
      templateUrl:'/views/searchView.html'
    };
  });
