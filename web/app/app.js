'use strict';

// Declare app level module which depends on views, and components
angular.module('arkham', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                "url": "/home",
                "views": {
                    "appContainer@": {
                        "controller": "homeController as home",
                        "templateUrl": "pages/home/home.html"
                    }
                }
            });

        $urlRouterProvider.otherwise("/home");
    });