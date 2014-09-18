'use strict';

/**
 * @ngdoc function
 * @name bookmanApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bookmanApp
 */

angular.module('bookmanApp')

  // For the initial setup read all data from remote database, adapt 
  // and write it to local database

  .run(function($http, $q, $rootScope){

  // Transform author data fetched from TAFFY to fit frontend schema
  function processAuthorsData(unprocessedAuthorsData) {

    var processedData = [];

    function processAuthor(unprocessedAuthor){
      var authorProcess = unprocessedAuthor;
      authorProcess.authorStringF = [authorProcess.firstName,authorProcess.middleName, authorProcess.lastName].join(' ');
      authorProcess.authorStringR = authorProcess.lastName + ', ' + authorProcess.firstName + ' ' + authorProcess.middleName; 
      processedData.push(authorProcess);
    }
    unprocessedAuthorsData.forEach(processAuthor);
    
    return processedData;    
  }

  // Transform book data fetched from TAFFY to fit frontend schema
  function processBooksData(unprocessedBooksData) {

    var processedData = [];

    // Create author and series strings for single book
    function processBook(bookProcess){

      // Fetch relevant author strings from TAFFY

      var bookAuthors = [];
      bookProcess.authors.forEach(function(authorId){
        bookAuthors.push($rootScope.autorDB({id:{is:authorId}}).first());
      });

      // Put together strings

      bookProcess.authorStringF = '';
      bookProcess.authorStringFLink = '';
      bookProcess.authorStringR = ''; 
      bookProcess.authorStringRLink = ''; 
      processedData.push(bookProcess);
    }

    // Create AuthorStrings for each book
    unprocessedBooksData.forEach(processBook);

    return processedData;
  }

  // Prepare $q request object with all necessary http calls
  var readUrls = ['data/books.json', 'data/author.json', 'data/series.json'];
  var requests = [];

  angular.forEach(readUrls, function(value){
    requests.push($http.get(value));
  });

  // Make requests and continue only when resolved
  $q.all(requests)
    .then(
      function(results) {

        // Fetch data from request results into meaningful variables
        var unprocessedBooksData = results[0].data;
        var unprocessedAuthorsData = results[1].data;
        var unprocessedListsData = results[2].data;

        // Prepare transformation of fetched data to frontend schema by making a promise
        var deferred = $q.defer();
        var promise = deferred.promise;

        promise
          // Process series data
          .then(function(){$rootScope.reiheDB = TAFFY(unprocessedListsData);})

          // Process author data
          .then(function(){$rootScope.autorDB = TAFFY(processAuthorsData(unprocessedAuthorsData));})

          // Process book data - doing this last because it relies upon series and author data
          .then(function(){$rootScope.booksDB = TAFFY(processBooksData(unprocessedBooksData));})

          // Tell rootScope that data initialization finished
          .then(function(){$rootScope.init = true;});

        // Set promise chain in motion
        deferred.resolve('');

      },
      function(errors) {
        // TODO: Write error handler
      },
      function(updates) {
        // TODO: write update function
      }
    );
  })
  
  // Die Vollansicht vorbereiten

  .controller('MainCtrl', function ($scope, $rootScope) {

  // TODO: Aktuell versucht er beim ersten Laden den Scope zu füllen, bevor durch die 
  // Initialisierung der RootScope gesetzt ist.

  $scope.$watch('$rootScope.init', function() {
    if ($rootScope.init == true){
      $scope.books = $rootScope.booksDB().order('authors').get();
      $scope.authors = $rootScope.autorDB().get();
      $scope.series = $rootScope.reiheDB().get();
     
      $scope.mainview = 'standardView';
      $scope.abook = false;
      $scope.filters = {};  
      $scope.amenu = 2;
    }
  });
  
   

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

    $scope.books = $rootScope.booksDB({authors:{has:id}}).get();
    $scope.authors = $rootScope.autorDB().get();
    $scope.curAuthor = $rootScope.autorDB({id:id}).first();
    $scope.series = $rootScope.reiheDB().get();
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
      newBook.authorStringF = data.ItemAttributes[0].Author;
      newBook.coverUrl = data.LargeImage[0].URL[0];

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
