/// <reference path="../libs/angular.d.ts" />

class Router {
    static $inject = ["$routeProvider"];

    constructor($routeProvider:ng.IRouteProvider) {
        $routeProvider
            .when('/account/login',  		{ templateUrl: 'account/login.html', controller: 'LoginController'})
            .when('/account/register',		{ templateUrl: 'account/register.html', controller: 'LoginController'})
            .when('/',						{ templateUrl: 'dashboard/dashboard.html', controller: 'LoginController'})

            .otherwise({ templateUrl: 'shared/404.html' });
    }
}