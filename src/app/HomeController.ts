/// <reference path="../../libs/d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

class HomeController {
    static $inject = ["$scope"];
    constructor($scope) {
        $scope.vm = this;
    }
}