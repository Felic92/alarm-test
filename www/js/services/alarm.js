angular.module('wakeup.services',['ngCordova'])

.factory('Alarms', function AlarmFactory(){

  var alarmId = 0;

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
    getAlarmId : function (){
      return alarmId;
    },
    incrementAlarmId : function(){
      alarmId++;
      return alarmId;
    }
    
  }

})