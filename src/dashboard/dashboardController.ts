/// <reference path="../../libs/angular.d.ts" />

class DashboardController {
    static $inject = ["$scope"];

    constructor($scope) {
        $scope.vm = this;
        $scope.date = new Date();

        $scope.rows = this.getRows();
    }

    getRows() {
		return new Array(500);
    }

}