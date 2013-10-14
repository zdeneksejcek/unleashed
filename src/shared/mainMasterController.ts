/// <reference path="../../libs/angular.d.ts" />

class MainMasterController {
    static $inject = ["$scope"];
    constructor($scope) {
        $scope.vm = this;
        $scope.viewPath = 'dashboard/dashboard.html';
    }
}