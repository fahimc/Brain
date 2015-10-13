var Brain={
	app:null,
	sensors:{
		input:{
			voiceRecognition:require('../src/modules/sensors/input/VoiceRecognition.js')
		},
		output:{

		}
	},
	init: function (app) {
		this.app = app;
		//setup storage
		//init sensors
		this.registerInputSensors();
	},
	registerInputSensors:function(){
		for(var key in this.sensors.input){
			this.sensors.input[key].init(this);
		}
	} 
};

module.exports = Brain;