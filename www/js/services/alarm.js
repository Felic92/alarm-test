angular.module('wakeup.services',['ngCordova'])

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
    createAlarm : function(alarmId,alarmTime){
      return {
        id : alarmId,
        label : 'Label',
        time : alarmTime,
        showDetail : false,
        repeat : false,
        days : [false,false,false,false,false,false,false]
      };
    },    
    getAlarmId : function(){ 
      return parseInt(window.localStorage['alarmId']) || 0;
    },
    //Not crazy about infinitely increasing ids but it does the job for now
    incrementAlarmId : function(alarmId){
      window.localStorage['alarmId'] = alarmId+1 ;
    }
  }
})