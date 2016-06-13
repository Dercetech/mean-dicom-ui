/* global angular */

'use strict';

angular.module('dicomUI.commons').directive('dicomParser',

    [

    function() {
  
        return {
            
            scope: true,
            
            controller      : 'DicomParserController',
            controllerAs    : 'DicomParserCtrl',
            
            bindToController    : {

                'src'   : '=?'       // optional binding, otherwise it's an unauthorized assignment         
            },
            
            //templateUrl : 'components/ui-commons/dicom/views/dicom-parser.html',
            
            link: function (scope, element, attributes, controllers) {
                
                // Controllers
                // var DicomParserCtrl = controllers[0];
                var DicomParserCtrl = controllers;
                
                // Watch changes in source file
                scope.$watch('DicomParserCtrl.src', DicomParserCtrl.onDicomSrcChanged);
                
                console.log('link established')
            }
        };
    }
]);