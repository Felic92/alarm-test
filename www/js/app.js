angular.module('wakeup', ['ionic','wakeup.controllers','wakeup.services','ngCordova'])

.run(function($ionicPlatform, $cordovaFile) {
  $ionicPlatform.ready(function() {

    // Create folder to store our alarm audio on android
    if(ionic.Platform.isAndroid()){ 
      $cordovaFile.createDir("WakeUp",false);  
    }

    // Hide the accessory bar(remove this to show the accessory bar above the keyboard for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
