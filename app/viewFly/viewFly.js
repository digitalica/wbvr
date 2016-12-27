'use strict';

angular.module('myApp.viewFly', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewFly', {
      templateUrl: 'viewFly/viewFly.html',
      controller: 'ViewFlyCtrl'
    });
  }])

  .controller('ViewFlyCtrl', ['$scope', '$interval', function ($scope) {

    $scope.initvars = function () {
      $scope.altitude = 1000;
      $scope.posx = 0;
      $scope.posz = 0;
    };
    $scope.initvars();


  }]);