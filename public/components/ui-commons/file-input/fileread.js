/* global angular */

'use strict';

// See http://stackoverflow.com/questions/17063000/ng-model-for-input-type-file

angular.module('dicomUI.commons').directive('fileread', [/*no dependencies, */

    function(/*no dependencies*/) {
  
        return {
            
            scope: {
                fileread: "&",
                onChange: "&"
            },
            
            link: function (scope, element, attributes) {

                // Angular doesn't nativelt handle input:type=file
                element.bind("change", function (changeEvent) {
                    
                    // Native filereader (IE 10+)
                    // var reader = new FileReader();
                    
                    /*
                    reader.onload = function (loadEvent) {
                    
                        // Digest
                        scope.$apply(function () {
                            
                            scope.fileread();//loadEvent.target.result);
                        });
                    }
                    
                    // Read first file - add multiple file support later
                    //reader.readAsDataURL(changeEvent.target.files[0]);
                    reader.readAsArrayBuffer(changeEvent.target.files[0]);
                    */
                    
                    // Forward select files to controller
                    scope.$apply(function () {
                        scope.onChange(changeEvent.target.files);
                    });
                });
            }
        };
    }
]);