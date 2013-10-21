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


$(document).keydown(function(evt) {
	$('#searchModal').on('shown.bs.modal', function () {
	    $('#searchInput').val("");
	    $('#searchInput').focus();
	})    

    if (evt.keyCode==70 && (evt.ctrlKey)) {
        evt.preventDefault();
        $('#searchModal').modal({
  			keyboard: true
		});
	}
});