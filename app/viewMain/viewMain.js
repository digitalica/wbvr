'use strict';

angular.module('myApp.viewMain', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewMain', {
      templateUrl: 'viewMain/viewMain.html',
      controller: 'ViewMainCtrl'
    });
  }])

  .controller('ViewMainCtrl', ['$scope', '$interval', function ($scope, $interval) {


  }]);