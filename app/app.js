'use strict';

// Declare app level module which depends on views, and components
var wbvr = angular.module('wbvr', [
  'ngRoute',
  'wbvr.viewMain',
  'wbvr.viewWatch',
  'wbvr.viewFly',
  'wbvr.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/viewMain'});
}]);


// taken from: http://briantford.com/blog/angular-socket-io
wbvr.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});