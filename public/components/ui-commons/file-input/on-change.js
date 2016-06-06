/* global angular */

'use strict';

angular.module('dicomUI.commons').directive('onChange', [/*no dependencies, */

    function(/*no dependencies*/) {
  
        return {
            
            scope: {
                onChange: "&"
            },
            
            link: function (scope, element, attributes) {

                // Angular doesn't nativelt handle input:type=file
                element.bind("change", function (changeEvent) {
                    
                    // Forward select files to controller (trigger digest cycle)
                    scope.$apply(function () {
                        scope.onChange()(changeEvent.target.files);
                    });
                });
            }
        };
    }
]);