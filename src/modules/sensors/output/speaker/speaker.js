var Speaker = {
	brain:null,
	import:{
	},
	init:function(brain){
		this.brain=brain;
	},
	speak:function(text){
		this.brain.sensors.input.voiceRecognition.send(text);
	}
}

module.exports = Speaker;