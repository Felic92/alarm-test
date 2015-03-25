angular.module('wakeup.services',[])

.factory('Alarms', function AlarmFactory(){

  var alarmId = 0; //able to take out createAlarm id param?

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
    createAlarm : function(alarmTime){
      return {
        id : alarmId,
        label : 'Label',
        time : alarmTime
      };
    },
    getAlarmId : function(){
      return alarmId
    },
    incrementAlarmId : function(){
      alarmId++;
    }
  }
})