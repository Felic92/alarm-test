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

.controller('createAlarmCtrl', function($scope, $ionicPopup){

    //Give each alarm a unique id
    var alarmId = 0;

    //List to store alarm objects
    $scope.alarms = [];

    //Allows user to create and append new alarm objects to the existing list 
    $scope.newAlarm = function(){

      $scope.alarm = {id: alarmId, label: 'Label'};

      $ionicPopup.show({
        template: '<input type="time" ng-model="alarm.time"> ',
        title: 'Set Time',
        scope: $scope,       
        buttons: 
        [{text: 'Cancel'}, {text: '<b>Done</b>', type: 'button-positive',
          onTap: function(e){  //dont allow user to create unless an alarm time is set
            !$scope.alarm.time ? e.preventDefault() : $scope.alarms.push($scope.alarm);
          }
        }]
      });

      alarmId++; 

    };

})




