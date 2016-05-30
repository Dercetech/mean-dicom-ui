/* global angular */

'use strict';

// Define your app
var app = angular.module('dicomUI', [

    // Dependencies

        // POC
        "dicomUI.poc"

    ]);


// On app started
app.run(['$rootScope', function($rootScope){
    
	console.log('DICOM UI uploader ready.');
}]);