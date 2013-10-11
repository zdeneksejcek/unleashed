/// <reference path="../../libs/d.ts/DefinitelyTyped/angularjs/angular.d.ts" />

/// <reference path="HomeController.ts" />
/// <reference path="Configuration.ts" />
/// <reference path="Routing.ts" />

declare var APPCONFIG;

// angular application
var app = <ng.IModule>angular.module("unleashedEx",[]);

// controllers
app.controller("HomeController", HomeController);

if (APPCONFIG.ENV == Environment.APP) {
    
} else {

}

// configs
app.config(Router);