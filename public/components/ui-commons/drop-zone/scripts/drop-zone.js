/* global angular */

'use strict';

angular.module('dicomUI.commons').directive('dropZone',

    [/*no dependencies, */

    function(/*no dependencies*/) {
  
        return {
            
            scope: {
                
                "onDrop"            : "&",
                "onFilesDropped"    : "&"
            },
            
            link: function (scope, element, attributes) {

                // Bind drag and drop events
                // Rem: Don't use jQuery's .bind method unless the wrapping event is needed (implies using .originalEvent)
                element[0].addEventListener("dragover", onDragover);
                element[0].addEventListener("drop", onDrop);
                
                // Make it reactive
                element[0].addEventListener("dragenter", onDragenter);
                element[0].addEventListener("dragleave", onDragleave);
                
                function onDragover(event){

                    if (event.preventDefault) {
                        // Required, otherwise no drop happens
                        event.preventDefault();
                    }
                    
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                }
                
                function onDrop(event){
                    
                    if (event.preventDefault) {
                        // Required, otherwise no drop happens
                        event.preventDefault();
                    }
                    
                    if (event.stopPropagation) {
                        event.stopPropagation();
                    }
                    
                    if(scope.onDrop()){
                        scope.onDrop()(event);
                    }
                    
                    if(scope.onFilesDropped() && event.dataTransfer && event.dataTransfer.files){
                        scope.onFilesDropped()(event.dataTransfer.files);
                    }
                    
                    angular.element(event.target).removeClass('drag-over');
                    
                    scope.$apply();
                }
                
                function onDragenter(event){
                    angular.element(event.target).addClass('drag-over');
                }
                
                function onDragleave(event){
                    angular.element(event.target).removeClass('drag-over');
                }
                
            }
        };
    }
]);