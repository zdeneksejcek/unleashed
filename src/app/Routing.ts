/// <reference path="../../libs/d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

class Router {

    static $inject = ["$routeProvider"];

    constructor($routeProvider:ng.IRouteProvider) {
        $routeProvider
            .when('/',  <ng.IRoute>{ templateUrl: 'home.html' })
            .otherwise( <ng.IRoute>{ templateUrl: '404.html' });
    }
}
