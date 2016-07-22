var HubApp = angular.module('HubApp', ['ngRoute', 'firebase','ui.bootstrap','dialogs']);

// configure our routes
HubApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html'
        })
        .when('/signIn', {
            templateUrl: 'pages/signIn.html',
            controller: 'signInController'
        })
        .when('/register', {
            templateUrl: 'pages/register.html',
            controller: 'createUserController'
        })
        .when('/bulletin', {
            templateUrl: 'pages/bulletin.html',
            controller: 'bulletinController'
        })
        .when('/bulletin_add', {
            templateUrl: 'pages/bulletin_add.html',
            controller: 'bulletinController'
        })


});

// create the controller and inject Angular's $scope
HubApp.controller('mainController', function ($scope) {
    
});

HubApp.controller('createUserController', function($rootScope, $scope, $location, $firebaseObject, $firebaseArray, $dialogs) {
    var ref = new Firebase("https://sweltering-torch-2760.firebaseio.com");
    $rootScope.authObj = $firebaseObject(ref);

    $scope.RegisterUser = function() {
        var email = $('#registerEmail').val();
        var password = $('#registerPassword').val();
        ref.createUser({
            email: email,
            password: password
        }, function(error, userData) {
            if (error) {
                console.log("Error creating user:", error);
                $dialogs.error("There was a problem registering.");
            } else {
                console.log("Successfully created user account with uid:", userData.uid);
                $dialogs.notify("Thanks for registering!", "You are free to post");
                $location.path('/bulletin');
            }
        });
    }
});

HubApp.controller('signInController', function($rootScope, $scope, $location, $firebaseObject, $firebaseArray) {
    var ref = new Firebase("https://sweltering-torch-2760.firebaseio.com");

    $scope.SignInUser = function() {
        var email = $('#signInEmail').val();
        var password = $('#signInPassword').val();
        ref.authWithPassword({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                $location.path('/bulletin');
            }
        });
    }
});

HubApp.controller('bulletinController', function ($rootScope, $scope, $location, $firebaseObject, $firebaseArray) {
    var ref = new Firebase('https://sweltering-torch-2760.firebaseio.com/bulletin');
    $scope.scrollItems = $firebaseObject(ref);

    $scope.bulletinAdd = function () {
        var title = $('#title').val();
        var message = $('#bulletinContent').val();
        console.log(title, $location);
        $location.path('/bulletin');
        ref.push({
            title: title,
            message: message

        });
    };
});