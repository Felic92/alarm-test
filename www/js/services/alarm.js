angular.module('wakeup')

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