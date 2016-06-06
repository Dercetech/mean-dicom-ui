/* global angular */

'use strict';

// Define your app
var app = angular.module('dicomUI', [

    // Dependencies

        // Angular UI-bootstrap
        "ui.bootstrap",

        // POC
        "dicomUI.poc",
        
        // Commons
        "dicomUI.commons"
    ]);


// On app started
app.run(['$rootScope', function($rootScope){
    
	console.log('DICOM UI uploader ready.');
}]);