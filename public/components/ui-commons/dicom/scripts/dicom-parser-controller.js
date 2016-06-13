/* global angular */


'use strict';

angular.module('dicomUI.commons').controller('DicomParserController',

    ["DicomParsingService",
        
    function(DicomParsingService){
        
	    var controller = this;

		////////////////////////////////////////////	    
	    // Expose functions and items //////////////

		// Selected file - see directive's isolate scope
		// controller.sr0c
		
		// Current parsed dataset
		controller.dataSet = null;


		// Set selected file
		controller.selectDicomFile = selectDicomFile;

		// Source file has changed
		controller.onDicomSrcChanged = onDicomSrcChanged;
		
		// Get best-guess element type
		controller.getElement = getElement;
		
		// Get string value of given element
		controller.getElementAsString = getElementAsString;
		
		// Get unsigned-int value of given element - 16/32 bit is automatic
		controller.getElementAsUint = getElementAsUint;

	    // Expose functions ////////////////////////
		///////////////////////////////////////////


		////////////////////////////////////////////	    
	    // Init logic //////////////////////////////

	    // Init logic //////////////////////////////
		///////////////////////////////////////////


		////////////////////////////////////////////	    
	    // Watches /////////////////////////////////

	    // Watches /////////////////////////////////
		///////////////////////////////////////////

	    
		////////////////////////////////////////////	    
	    // Logic implementaiton ////////////////////
	    
	    // Watches /////////////////////////////////
	    
	    function onDicomSrcChanged(newSrc, oldSrc){

	    	// Handle deselection (newSrc is null)
	    	if(!newSrc){
	    		console.log('file de-selected');	
	    	}
	    	
	    	// Expose new dataset
	    	else{
	    		DicomParsingService.parseDicomFile(newSrc).then(function(dataSet){
	    			controller.dataSet = dataSet;
	    		});
	    	}
	    }
	    
	    // Logic ///////////////////////////////////
	    
	    function selectDicomFile(aDicomFile){
	    	
	    	controller.src = aDicomFile;
	    }
	    
	    
	    function getElement(vr){
	    	
	    	if(!vr || !controller.dataSet || !controller.dataSet.elements){
	    		return "<error>";
	    	}
	    	
	    	return DicomParsingService.getElement(vr, controller.dataSet);
	    }
	    
	    function getElementAsString(vr){

	    	if(!vr || !controller.dataSet || !controller.dataSet.elements || !controller.dataSet.string) return "<error>";
	    	
	    	return DicomParsingService.getElementAsString(vr, controller.dataSet);
	    }
	    
	    function getElementAsUint(vr){

	    	if(!vr) return "";
	    	
	    	return DicomParsingService.getElementAsUint(vr, controller.dataSet);
	    }
	    
        function isASCIIString(str) {
            return DicomParsingService.isASCIIString(str);
        }
	    
	    // Logic implementaiton ////////////////////
		///////////////////////////////////////////
    }
]);