/// <reference path="../libs/angular.d.ts" />

class HomeController {
    static $inject = ["$scope"];
    constructor($scope) {
        $scope.vm = this;
    }
}