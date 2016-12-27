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

    $scope.pause = function () {
      // console.log('pause');
      socket.emit('pause', function () {
      });
    }

  }]);