// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: 'b4aabbbc',
    api_key: 'ce016abd3d7e274ce376705ce30e6ca898dc978823ef7e50',
    // The GCM project number
    gcm_id: '224951291374'
  });
}])

.controller('PushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {

  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    alert("Successfully registered token " + data.token);
    console.log('Ionic Push: Got token ', data.token, data.platform);
    $scope.token = data.token;
  });

  $scope.identifyUser = function(){
    var user = $ionicUser.get();

    if(!user.user_id){
      user.user_id = $ionicUser.generateGUID();
    }

    angular.extend(user,{
      name: 'bhargav',
      bio: 'Maker of this app'
    });

    $ionicUser.identify(user).then(function(){
      $scope.identified = true;
      console.log('name: '+user.name+"----- Id:"+user.user_id);
    });
  };//identifyUser ends

  // Registers a device for push notifications
    $scope.pushRegister = function() {
     console.log('Ionic Push: Registering user');
     
     // Register with the Ionic Push service.  All parameters are optional.
     $ionicPush.register({
       canShowAlert: true, //Can pushes show an alert on your screen?
       canSetBadge: true, //Can pushes update app icon badges?
       canPlaySound: true, //Can notifications play a sound?
       canRunActionsOnWake: true, //Can run actions outside the app,
       onNotification: function(notification) {
         // Handle new push notifications here
         alert("notif : : "+JSON.stringify(notification));
         return true;
       }
     });
    };//pushRegister ends
});