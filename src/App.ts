/// <reference path="../libs/angular.d.ts" />

/// <reference path="Configuration.ts" />
/// <reference path="Routing.ts" />

declare var APPCONFIG;

// angular application
var app = <ng.IModule>angular.module("unleashedEx",[]);

if (APPCONFIG.ENV == Environment.APP) {
    
} else {

}

// configs
app.config(Router);