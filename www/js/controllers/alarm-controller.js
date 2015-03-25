angular.module('wakeup.controllers',[])

.controller('alarmController', function($scope, $ionicPopup, Alarms){

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
              var newAlarm = Alarms.createAlarm($scope.data.time)
              $scope.alarms.push(newAlarm);
              Alarms.incrementAlarmId();
              Alarms.save($scope.alarms);
            }
          }
        }]
      });

    };

    $scope.removeAlarm = function(index){
      $scope.alarms.splice(index,1);
      Alarms.save($scope.alarms);
    }
})