/// <reference path="../libs/angular.d.ts" />

/// <reference path="Configuration.ts" />
/// <reference path="Routing.ts" />
/// <reference path="account/loginController.ts" />

declare var APPCONFIG;

// angular application
var app = <ng.IModule>angular.module("unleashedEx",[]);

app.controller("LoginController", LoginController);

if (APPCONFIG.ENV == Environment.APP) {
    
} else {

}

// configs
app.config(Router);