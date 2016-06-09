/* global angular */

'use strict';

var app = angular.module('dicomUI');

// Step 1: Register states
app.config(function($stateProvider, $urlRouterProvider) {
    
    // Default route
    $urlRouterProvider.otherwise("/upload");
    
    // Shorthands
    var uiAppUri = "components/ui-app/";
    
    var menuUri     = uiAppUri + "menu/views/menu.html";
    var loginUri    = uiAppUri + "login/views/login.html";
    var uploaderUri = uiAppUri + "uploader/views/uploader.html";
    
    // Now set up the states
    $stateProvider
    
        .state('login', {
            url         : "/login",
            templateUrl : loginUri,
            controller  : 'LoginController'
        })
        
        // All routes below this point need authentication
        // I'm not using a custom resolve method.
        // See "main.js" has a .run statement about states-authentication
        
        .state('upload', {
            
            url     : "/upload",
            
            views   : {
                
                '' : {
                    templateUrl : uploaderUri,
                    controller  : 'UploaderController'
                },
                
                'menu' : {
                    templateUrl : menuUri,
                    controller  : 'MenuController'
                }
            },
            
            data    : {
                auth    : false,
                roles   : []
            }
        });
});

// Step 2: Handle state change logic
app.run(['$rootScope', '$state',

    function($rootScope, $state){
        
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      
            // Should the user be logged in for this root?
            var loginRequired = toState.data !== undefined && toState.data.auth;
            
            if(loginRequired){
                $state.go('login');
                event.preventDefault();
                return;
            }
            
            
            // Check access rights
            // var accessRights = ...
            // logic to handles access rights
        });
    }
]);