/* global angular */
/* global DcmApp */

'use strict';

angular.module('dicomUI.poc').factory('DicomParser',

    [/*dependencies*/

    function() {

        ////////////////////////////////////////
        // Interface ///////////////////////////
        
        return {
            
            parseDicom  : parseDicom
        }
        
        // Interface ///////////////////////////
        ///////////////////////////////////////
        

        ////////////////////////////////////////
        // Service implementation //////////////

        function parseDicom(file, cb){

            var reader = new FileReader();
            
            reader.onload = function(evt) {
                var buffer = new Uint8Array(evt.target.result);
                cb(evt.target.result);
                
            }
            
            reader.readAsArrayBuffer(file);
        }

        // Service implementation //////////////
        ///////////////////////////////////////
    }
]);