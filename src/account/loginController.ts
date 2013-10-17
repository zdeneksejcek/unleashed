/// <reference path="../../libs/bootstrap.d.ts" />

class LoginController {
	static $inject = ["$scope"];
    constructor($scope) {
    	$('#myModal').modal();
    }
}