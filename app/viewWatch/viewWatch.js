'use strict';

angular.module('myApp.viewWatch', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/viewWatch', {
    templateUrl: 'viewWatch/viewWatch.html',
    controller: 'ViewWatchCtrl'
  });
}])

.controller('ViewWatchCtrl', [function() {

}]);