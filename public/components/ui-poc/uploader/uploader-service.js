/* global angular */
/* global DcmApp */

'use strict';

// Multiform & content-type hints: https://uncorkedstudios.com/blog/multipartformdata-file-upload-with-angularjs

angular.module('dicomUI.poc').factory("FileUploadService",

    ["$http",

    function($http) {

        ////////////////////////////////////////
        // Interface ///////////////////////////
        
        return {
            
            "uploadFile"    : uploadFile
        }
        
        // Interface ///////////////////////////
        ///////////////////////////////////////


        ////////////////////////////////////////
        // Service implementation //////////////

        function uploadFile(file, uploadUrl){
            
            // Data
            var fd = new FormData();
            fd.append('file', file);
            
            // Request config - full list of params: https://docs.angularjs.org/api/ng/service/$http#post
            var config = {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            }
            
            // Execute
            $http.post(uploadUrl, fd, config).then(onSuccess, onError, onUpdate);
                
                // Upload complete
                function onSuccess(event){
                    console.log('upload complete');
                }
                
                // Upload failed
                function onError(event){
                    console.log('upload failed');
                };
                
                // Upload progress
                function onUpdate(event){
                    console.log(event.config.file.name);
                }
        }

        // Service implementation //////////////
        ///////////////////////////////////////
    }
]);