angular.module('wakeup', ['ionic'])

.factory('Alarms', function AlarmFactory(){
  return {
    all : function() {
      var alarms = window.localStorage['Alarms'];
      if(alarms){
        return angular.fromJson(alarms)
      }
      return [];
    },
    save: function(alarms){
      window.localStorage['Alarms'] = angular.toJson(alarms);
    },
    createAlarm : function(alarmTime,alarmId){
      return {
        id : alarmId,
        label : 'Label',
        time : alarmTime
      };
    },
    getNextAlarmId : function(){
      return parseInt(window.localStorage['nextAlarmId']) || 0;
    },
    setNextAlarmId : function(id){
      window.localStorage['nextAlarmId'] = id;
    }
  }
})

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

.controller('createAlarmCtrl', function($scope, $ionicPopup, Alarms){

    //Load or create list to store alarm objects
    $scope.alarms = Alarms.all();

    //Allows user to create and append new alarm objects to the existing list 
    $scope.newAlarm = function(){

      $scope.data = {};

      $ionicPopup.show({
        template: '<input type="time" ng-model="data.time"> ',
        title: 'Set Time',
        scope: $scope,       
        buttons: 
        [{text: 'Cancel'}, {text: '<b>Done</b>', type: 'button-positive',
          onTap: function(e){  
            if(!$scope.data.time){ //dont allow user to create unless an alarm time is set
              e.preventDefault();
            }else{
              var id = Alarms.getNextAlarmId();
              var time = $scope.data.time; 

              $scope.alarms.push(Alarms.createAlarm(time,id));
              Alarms.setNextAlarmId(id++);
              Alarms.save($scope.alarms);
            }
          }
        }]
      });

    };
})

.controller('manageAlarmCtrl', function($scope){



})




