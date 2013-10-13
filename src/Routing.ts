/// <reference path="../libs/angular.d.ts" />

class Router {
    static $inject = ["$routeProvider"];

    constructor($routeProvider:ng.IRouteProvider) {
        $routeProvider
        	.when('/account/login',  <ng.IRoute>{ templateUrl: 'account/login.html' })
            .when('/',  <ng.IRoute>{ templateUrl: 'dashboard/dashboard.html', controller: 'DashboardController' })
            .otherwise( <ng.IRoute>{ templateUrl: '404.html' });
    }
}