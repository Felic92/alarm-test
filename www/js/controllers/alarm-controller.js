angular.module('wakeup.controllers',['ngCordova'])

.controller('alarmController', function($scope, $ionicPopup,$cordovaFile,$cordovaMedia,Alarms){

    //Load or create list to store alarm objects
    $scope.alarms = Alarms.all();

    //Allows user to create and append new alarm objects to the existing list 
    $scope.newAlarm = function(){

      var alarmId = Alarms.getAlarmId();

      //First alarm ever create folder to store audio files locally, Could also check if directory exists
      if(alarmId === 0){
        $cordovaFile.createDir("WakeUp",true);
      }

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
              var newAlarm = Alarms.createAlarm(alarmId,$scope.data.time);
              $scope.alarms.push(newAlarm);
              Alarms.incrementAlarmId(alarmId);
              Alarms.save($scope.alarms);
            }
          }
        }]
      });

    };

    $scope.recordAlarm = function(id){
      var alarmMedia = new Media("WakeUp/alarm"+id+".mp3");
      alarmMedia.startRecord();

      // Stop recording after 5 seconds
      setTimeout(function() {
        alarmMedia.stopRecord();  
        alarmMedia.release(alarmMedia); }, 5000);
    }

    $scope.playAlarm = function(id){
      var alarmMedia = new Media("WakeUp/alarm"+id+".mp3");
      alarmMedia.play();
    }

    //Will have to remove associated audio file as well
    $scope.removeAlarm = function(index){
      $scope.alarms.splice(index,1);
      Alarms.save($scope.alarms);
    }

    $scope.toggleDay = function(alarm,dayIndex){
      alarm.days[dayIndex] = !alarm.days[dayIndex];
    }

    $scope.clearAlarmSchedule = function(alarm){
      for(i=0; i < alarm.days.length; i++){
        alarm.days[i] = false;
      }
    };
})