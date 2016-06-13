/* global angular */

'use strict';

angular.module('dicomUI.app').directive('dicomDatasetSummary',

    [

    function() {
  
        return {
            
            require     : '^dicomParser',
            templateUrl : 'components/ui-app/dicom-dataset/views/dicom-dataset-summary.html',
            
            scope: {

                'dataSet'   : '='
            },

            link: function (scope, element, attributes, dicomParserController) {
                
                // Expose DicomParserController on the isolate scope
                //scope.DicomParserCtrl = dicomParserController;
                
                // Expose getter methods
                scope.getElement = dicomParserController.getElement; 
                scope.getString = dicomParserController.getElementAsString;
                scope.getUInt = dicomParserController.getElementAsUint;
                
                scope.$watch('dataSet', onDataSetChanged);
            }
        };
        
        function onDataSetChanged(newDataSet){
            
            
        }
    }
]);