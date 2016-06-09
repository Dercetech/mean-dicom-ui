/* global angular */

'use strict';

var app = angular.module('dicomUI', [

        "ui.router",
        "ui.bootstrap",

        // Framework
        "dicomUI.framework",
        
        // Commons
        "dicomUI.commons",
        
        // Application
        "dicomUI.app"
    ]);


app.run(['$rootScope', function($rootScope){ /* App starting */ }]);