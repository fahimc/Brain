var Brain={
	app:null,
	sensors:{
		input:{
			voiceRecognition:require('../src/modules/sensors/input/VoiceRecognition.js')
		},
		output:{
			speaker:require('../src/modules/sensors/output/speaker/speaker.js')
		}
	},
	processors:{
		language:require('../src/modules/processing/language.js'),
		learning:require('../src/modules/processing/learning.js')
	},
	memory:{
		people:require('../src/modules/memory/peopleMemory.js'),
		events:require('../src/modules/memory/eventsMemory.js')
	},
	init: function (app) {
		this.app = app;
		//setup storage
		//init sensors
		this.registerInputSensors();
		this.registerOutputSensors();
		this.registerProcessors();
	},
	registerInputSensors:function(){
		for(var key in this.sensors.input){
			this.sensors.input[key].init(this);
		}
	},
	registerOutputSensors:function(){
		for(var key in this.sensors.output){
			this.sensors.output[key].init(this);
		}
	},
	registerProcessors:function(){
		for(var key in this.processors){
			this.processors[key].init(this);
		}
	}	
	  

};

module.exports = Brain;