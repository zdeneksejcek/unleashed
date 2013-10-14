/// <reference path="../../libs/angular.d.ts" />

class DialogMasterController {
    static $inject = ["$scope","$routeParams"];
    constructor($scope,$routeParams) {
        $scope.vm = this;
        $scope.viewPath = 'dashboard/dashboard.html';
        $scope.action = $routeParams.action;
    }
}