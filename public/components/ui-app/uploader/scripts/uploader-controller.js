/* global angular */

'use strict';

angular.module('dicomUI.app').controller("UploaderController", 

	['$scope', "DicomParsingService",

	function($scope, DicomParsingService) {
	    
	    var controller = this;

		////////////////////////////////////////////	    
	    // Expose functions and items //////////////

		// Files to upload
		controller.files = [];
		
		// Sections to display on-screen
		controller.sets = [];

		// Files are added to current upload
		controller.importFiles = importFiles;

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
	    
	    // Logic ///////////////////////////////////
	    
	    function importFiles(files){
	    	
	    	for(var i = 0; i < files.length; i++){

	    		// This solves your basic anonymous function inside a for loop thing.
	    		// See http://stackoverflow.com/questions/13977046/using-anonymous-function-in-javascript-for-loops
				(function(aFile) {

		    		if(!isFileAlreadyIncluded(aFile)){
	
		    			DicomParsingService.isDicomFile(aFile).then(function(isDicom){
		    				
			    			// Is this a DICOM file?
			    			if(isDicom){
			    				
			    				DicomParsingService.parseDicomFile(aFile).then(function(dataSet){
			    					
				    				// To what set does this one belong?
				    				var study = DicomParsingService.getElement('x00200010', dataSet);
				    				var series = DicomParsingService.getElement('x00200011', dataSet);
				    				
				    				// Stack name
				    				var stackName = "stack";
				    				stackName += " " + "study" + study;
				    				stackName += " " + "series" + series;
				    				
				    				// Obtain a stack for this name
				    				var stack = getSetByName(stackName);
	
									// Add to the list of files to upload
				    				var fileWrapper = addFile(aFile);
	
			    					// Add DICOM file to it
			    					addFileToSet(fileWrapper, stack);
			    				});
			    			}
			    			
			    			else{

								// Add to the list of files to upload
			    				var fileWrapper = addFile(aFile);

			    				// Obtain "documents" set
			    				var documentSet = getSetByName("document");
		    					
		    					// Add non-DICOM file to it
		    					addFileToSet(fileWrapper, documentSet);
			    			}
		    			});
		    		};
		    		
				})(files[i]);
	    	}
	    }

		function addFile(aFile){
			
			// Wrapper: contains metadata & co.
			var wrapper = {
				
				'file'	: aFile,
				'set'	: -1,
			};
			
			// Add wrapper to file list
			controller.files.push(wrapper);
			
			// Return wrapper
			return wrapper;
		}
	    
	    function isFileAlreadyIncluded(aFile){
	    	
	    	for(var i = 0; i < controller.files; i++){
	    		
	    		var wrapper = controller.files[i];
	    		if(wrapper.file === aFile){
	    			
	    			return wrapper;
	    		}
	    	}
	    	
	    	return false;
	    }
	    
	    function getSetByName(name){
	    	
	    	for(var i = 0; i < controller.sets.length; i++){
	    		
	    		var aSet = controller.sets[i];
	    		if(aSet.name === name){
	    			return aSet;
	    		}
	    	}
	    	
	    	return addSet(name);
	    }
	    
	    function addSet(setName){
	    	
	    	var aSet = {
	    		//"files"	: [],
	    		"name"	: setName,
	    		"id"	: controller.sets.length
	    	}
	    	
	    	controller.sets.push(aSet);
	    	return aSet;
	    }
	    
	    function addFileToSet(aFile, aSet){
	    	
	    	// Assign set ID to file wrapper
	    	aFile.set = aSet.id;
	    	
	    	//aSet.files.push(aFile);
	    }
	    
	    // Logic implementaiton ////////////////////
		///////////////////////////////////////////
	}]
);