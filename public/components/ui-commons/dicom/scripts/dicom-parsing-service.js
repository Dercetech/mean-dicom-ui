/* global angular */
/* global dicomParser */

'use strict';

angular.module('dicomUI.commons').factory('DicomParsingService',

    ['FileService',

    function(FileService) {

        ////////////////////////////////////////
        // Interface ///////////////////////////
        
        return {
            
            'isDicomFile'       : isDicomFile,
            'parseDicomFile'    : parseDicomFile,
            
            'getElement'            : getElement,
            'getElementAsString'    : getElementAsString,
            'getElementAsUint'      : getElementAsUint
        }
        
        // Interface ///////////////////////////
        ///////////////////////////////////////


        ////////////////////////////////////////
        // Service implementation //////////////

        function isDicomFile(aFile){
            
            // Return the promise enriched with a DICOM-parsing .then routine
            return FileService.readFile(aFile, true).then(function(fileAsByteArray){
                
                return isByteArrayADicomFile(fileAsByteArray);
            });
        }
        
        function isByteArrayADicomFile(aByteArray){
            
            // Read as a byte stream AFTER reading the byteArray as a littleEndian one (see DICOM spec, ps3.10 section 7.1)
            var littleEndianByteStream = new dicomParser.ByteStream(dicomParser.littleEndianByteArrayParser, aByteArray);
            
            littleEndianByteStream.seek(128);
            var prefix = littleEndianByteStream.readFixedString(4);
            
            // Well-formed P10 files must have the DICM header at offset 128
            return (prefix === "DICM");
        }

        function parseDicomFile(aDicomFile){

            // Return the promise enriched with a DICOM-parsing .then routine
            return FileService.readFile(aDicomFile, true).then(function(dicomAsByteArray){
                
                // Very important (to whoever reuses my code): FileService.readFile has "true" as second parameter. Mind the gap.
                
                // Test it's a DICOM file
                if(!isByteArrayADicomFile(dicomAsByteArray)){
                    return null;
                }
                
                // Parse the byte array using 
                var dataSet = dicomParser.parseDicom(dicomAsByteArray);
                
                // Retun the dataSet as input to next .then statement in the chain
                return dataSet;
            });
        }
        
	    function getElement(vr, dataSet){
	    	
	    	if(!vr || !dataSet || !dataSet.elements){
	    		return "<error>";
	    	}
	    	
	    	var element = dataSet.elements[vr];
	    	vr = vr.toLowerCase();
	    	
	    	// Best-guess approach - String vs. UInt isn't guaranteed
	    	if(element){
	    		
	    		var displayValue = "";

				// Is this an unsigned integer?
				if(element.length === 2) {
					text += " (" + dataSet.uint16(vr) + ")";
				}
				else if(element.length === 4) {
					text += " (" + dataSet.uint32(vr) + ")";
				}
	    		
	    		var text = dataSet.string(vr);
                if(isASCIIString(text)){
                	return displayValue += text;
                }

				return displayValue;
	    	}
	    	
	    	return "";
	    }
	    
	    function getElementAsString(vr, dataSet){

	    	if(!vr || !dataSet || !dataSet.elements){
	    		return "<error>";
	    	}
	    	
	    	if(dataSet.elements[vr]){
	    		
	    		var text = dataSet.string(vr.toLowerCase());
	    		return (text !== undefined) ? text : "<value error>";
	    	}
	    	
	    	return "<not found>";
	    }
	    
	    function getElementAsUint(vr){

	    	if(!vr) return "";
	    }
	    
        function isASCIIString(str) {
            return /^[\x00-\x7F]*$/.test(str);
        }


        // Service implementation //////////////
        ///////////////////////////////////////
    }
]);