angular.module('wakeup.services')

.factory('Recording', function RecordFactory($cordovaMedia, $cordovaFile){

	return{

	    all: function() {
	      var filenames = window.localStorage['mediaFiles'];
	      if(filenames) {
	        return angular.fromJson(filenames);
	      }
	      return [];
	    },
	    save: function(mediaArray) {
	      window.localStorage['mediaFiles'] = angular.toJson(mediaArray);
	    },
		startRecording : function(media){
			media.startRecord();
		  	setTimeout(function() { media.stopRecord(); media.release(media); }, 5000);
		},
		stopRecording : function(media){
			media.stopRecord();
		},
		playRecording : function(media){
			media.play();
		},
		createRecording : function(filename,path){ 
			return {
				name : filename,
				path : path,
				media : '' 
			};
		},
		removeRecording : function(){
			//TODO
		}

	}

})
