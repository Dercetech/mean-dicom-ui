/* global angular */

'use strict';

angular.module('dicomUI.commons').factory('FileService',

    ['$q',

    function($q) {

        ////////////////////////////////////////
        // Interface ///////////////////////////
        
        return {
            
            // Read a local - params: aFile, asUInt8Array
            readFile    : readFile
        }
        
        // Interface ///////////////////////////
        ///////////////////////////////////////
        

        ////////////////////////////////////////
        // Service implementation //////////////

        function readFile(aFile, asUInt8Array){

            // Here a promise be returned, arrrh! - Yes, Jem likes pirates. Ahoy! Rever the FSM.
            var deferred = $q.defer();

            // HTML5 file reader
            var reader = new FileReader();
            
            // Boilerplate - read the file
            reader.onload = function(aFile){

                // Default behavior returns data as an array buffer.
                var arrayBuffer = reader.result;
                
                // Do we want that - or an unsigned int array (uint8)?
                var result = asUInt8Array ? 
                    /* byte array aka uint8 */ new Uint8Array(arrayBuffer) :
                    /* default array buffer */ arrayBuffer;
                
                // Resolve promise
                deferred.resolve(result);
            }

            // Read file
            reader.readAsArrayBuffer(aFile);
            
            // Return a promise
            return deferred.promise
        }


        // Service implementation //////////////
        ///////////////////////////////////////
    }
]);