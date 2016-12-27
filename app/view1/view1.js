'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope', '$interval', function ($scope, $interval) {

        $scope.initvars = function () {
            $scope.altitude = 1000;
            $scope.posx = 0;
            $scope.posz = 0;
        };
        $scope.initvars();


    }]);