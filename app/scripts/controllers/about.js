'use strict';

/**
 * @ngdoc function
 * @name bookmanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the bookmanApp
 */
angular.module('bookmanApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
