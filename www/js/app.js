angular.module('wakeup', ['ionic'])

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

.controller('createAlarmCtrl', function($scope,$ionicPopup){

    $scope.alarms = [];

    $scope.createAlarm = function(alarmTime){
      $scope.alarms.push(alarmTime);
    };
    
    $scope.newAlarm = function(){

      $scope.data = {};

      $ionicPopup.show({
        template: '<input type="time" ng-model="data.alarmTime"> ',
        title: 'Set Time',
        scope: $scope,       
        buttons: 
        [{text: '<b>Done</b>', type: 'button-royal',
          onTap: function(e){  //dont allow user to close unless an alarm is created if created scroll top
            !$scope.data.alarmTime ? e.preventDefault() : $scope.createAlarm($scope.data.alarmTime);
          }
        }]
      });

    };




})




