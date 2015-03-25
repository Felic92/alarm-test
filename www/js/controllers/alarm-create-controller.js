angular.module('wakeup')

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