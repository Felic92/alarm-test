angular.module('wakeup.controllers',['ngCordova'])

.controller('alarmController', function($scope,$ionicPopup,$cordovaMedia,Alarms,Recording){

    //Load or create list to store objects
    $scope.alarms = Alarms.all();
    $scope.recordings = Recording.all()  //This is the offending line

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
              var alarmId = Alarms.getAlarmId();
              var newAlarm = Alarms.createAlarm(alarmId,$scope.data.time);
              $scope.alarms.push(newAlarm);
              Alarms.incrementAlarmId();
              Alarms.save($scope.alarms);
            }
          }
        }]
      });

    };

    var src = ionic.Platform.isIOS() ? src = "documents://" : src = "WakeUp/";

    $scope.newRecording = function(id){
      var mediaName = "alarm"+id+".wav"; 
      var path = src + mediaName;
      var newRecording = Recording.createRecording(mediaName,path);
      newRecording.media = new Media(path);

      $scope.recordings.push(newRecording);
      Recording.startRecording(newRecording.media);
      //Recording.save($scope.recordings);
    };

    $scope.playRecording = function(id){
      var playback = new Media(src+"alarm"+id+".wav");
      playback.play();
    };

    //Will have to remove associated audio file as well
    $scope.removeAlarm = function(index){
      $scope.alarms.splice(index,1);
      Alarms.save($scope.alarms);
    };

    $scope.toggleDay = function(alarm,dayIndex){
      alarm.days[dayIndex] = !alarm.days[dayIndex];
    };

    $scope.clearAlarmSchedule = function(alarm){
      for(i=0; i < alarm.days.length; i++){
        alarm.days[i] = false;
      }
    };
})