/// <reference path="../libs/angular.d.ts" />

/// <reference path="HomeController.ts" />
/// <reference path="dashboard/dashboardController.ts" />
/// <reference path="Configuration.ts" />
/// <reference path="Routing.ts" />

declare var APPCONFIG;

// angular application
var app = <ng.IModule>angular.module("unleashedEx",[]);

// controllers
app.controller("HomeController", HomeController);
app.controller("DashboardController", DashboardController);

if (APPCONFIG.ENV == Environment.APP) {
    
} else {

}

// configs
app.config(Router);