/* global angular */
/* global DcmApp */
/* global dicomParser */
/* global dumpFile */

'use strict';

angular.module('dicomUI.poc').controller("UploaderController", 

	['$scope', "$timeout", "config", "FileUploadService",

	function($scope, $timeout, config, FileUploadService) {
	    
	    var controller = this;

		////////////////////////////////////////////	    
	    // Expose functions and items //////////////

		// List of files to upload
		controller.selectedFiles = null;
		
		controller.fileSelectionUpdate = fileSelectionUpdate;
		
		// Start uploading selected files
		controller.startUploadForSelection = startUploadForSelection;

		// Expose selecte file meta
		controller.selectedFileMeta = null;

	    // Expose functions ////////////////////////
		///////////////////////////////////////////


		////////////////////////////////////////////	    
	    // Init logic //////////////////////////////

		var dcmApp = controller.dcmApp = new DcmApp("view-area");
		// Because of the tabset, the canvas is not available during this cycle... maybe use a $timeout if tabs are really needed.
		// For the POC, just .init() in the fileSelectionUpdate function.
		dcmApp.init();

	    // Init logic //////////////////////////////
		///////////////////////////////////////////


		////////////////////////////////////////////	    
	    // Watches /////////////////////////////////

	    // Watches /////////////////////////////////
		///////////////////////////////////////////

	    
		////////////////////////////////////////////	    
	    // Logic implementaiton ////////////////////
	    
	    // Watches /////////////////////////////////
	    
	    function onFileSelectionChanged(newFile, oldFile){
	    	
	    	console.log('file selection changed');
	    }
	    
	    
	    // Logic ///////////////////////////////////
	    
	    function fileSelectionUpdate(files){
			
			// Quick fix
			//dcmApp.init();
			
			// Store list on controller
			controller.selectedFiles = files;
			
			// Hand list of files DICOM viewer app 
			dcmApp.load_files(files);
			
			// Show meta of first DICOM file
			showDICOMFileMeta(files[0]);
		}

		function showDICOMFileMeta(file){
			
			dumpFile(file);
			// TODO Create intermediate directive to handle FileReader and Uint8 buffering
    //         var reader = new FileReader();
            
    //         reader.onload = function(evt) {
    //             var buffer = new Uint8Array(evt.target.result);
                
    //             try{
				// 	// Parse the byte array to get a DataSet object that has the parsed contents
				// 	var dataSet = dicomParser.parseDicom(byteArray/*, options */);
				
				// 	// access a string element
				// 	controller.selectedFileMeta.studyInstanceUid = dataSet.string('x0020000d');
				
				// 	// get the pixel data element (contains the offset and length of the data)
				// 	controller.selectedFileMeta.pixelDataElement = dataSet.elements.x7fe00010;
				
				// 	// create a typed array on the pixel data (this example assumes 16 bit unsigned data)
				// 	controller.selectedFileMeta.pixelData = new Uint16Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
				// }
				
				// catch(ex){
				// 	console.log('Error parsing byte stream' - ex);
				// }
    //         }
            
    //         reader.readAsArrayBuffer(file);
            
		}
		
		function startUploadForSelection(){
			
			// Selection must have been made
			if(!controller.selectedFiles || controller.selectedFiles.length === 0){
				return;
			}
			
			// Start upload
			FileUploadService.uploadFile(controller.selectedFiles[0], config.server.uploadUrl);
		}

	    // Logic implementaiton ////////////////////
		///////////////////////////////////////////	    
	}]
);