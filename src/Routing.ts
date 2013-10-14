/// <reference path="../libs/angular.d.ts" />

class Router {
    static $inject = ["$routeProvider"];

    constructor($routeProvider:ng.IRouteProvider) {
        $routeProvider
        	.when('/account/:action',  		{ templateUrl: 'shared/dialogMaster.html' })
            .when('/:controller/:action',  	{ templateUrl: 'shared/mainMaster.html'})
            .when('/',						{ templateUrl: 'shared/mainMaster.html'})

            .otherwise( <ng.IRoute>{ templateUrl: 'shared/404.html' });
    }
}