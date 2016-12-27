'use strict';

angular.module('wbvr.viewWatch', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/viewWatch', {
      templateUrl: 'viewWatch/viewWatch.html',
      controller: 'ViewWatchCtrl'
    });
  }])

  .controller('ViewWatchCtrl', ['$scope', 'socket', function ($scope, socket) {

    socket.on('init', function (data) {
      console.log('init: ' + data);
    });

    socket.on('steering', function (data) {
      console.log('steering: ' + JSON.stringify(data));
      switch (data.number) {
        case 0:
          $scope.steeringRight = data.value;
          break;
        case 1:
          $scope.steeringLeft = data.value;
          break;
      }
    });

    socket.on('position', function (data) {
      console.log('position: ' + JSON.stringify(data));
      $scope.x = Math.floor(data.x);
      $scope.y = Math.floor(data.y);
      $scope.z = Math.floor(data.z);
      $scope.m = Math.floor(Math.sqrt(data.x * data.x + data.z * data.z));
      $scope.d = Math.round(data.d);
      $scope.alt = Math.floor(data.y * 3);
    });

    $scope.pause = function () {
      // console.log('pause');
      socket.emit('pause', function () {
      });
    };

    $scope.play = function () {
      // console.log('play');
      socket.emit('play', function () {
      });
    };

    $scope.init = function () {
      // console.log('init');
      socket.emit('init', function () {
      });
    };

  }]);