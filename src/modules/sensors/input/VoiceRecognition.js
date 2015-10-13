var express = require('express');
require('shelljs/global');
var WebSocketServer = require('ws').Server;

var VoiceRecognition = {
	ws:null,
	brain: null,
	init: function (brain) {
		this.brain = brain;
		this.brain.app.use('/app', express.static('src/modules/sensors/input/app'));
		// this.brain.app.ws('/ws', this.onWS.bind(this));
		this.ws = new WebSocketServer({
			server: this.brain.server
		});
		 this.ws.on('connection', this.onWS.bind(this));
		this.start();
	},
	start: function () {
		console.log('voice recognition started');
		this.launch();
	},
	launch: function () {
		if (exec('start chrome "https://localhost:4000/app"').code !== 0) {
			echo('Error: chrome failed');
			exit(1);
		}

	},
	onWS:function(ws, req){
		this.ws = ws;
		this.ws.on('message', this.onMessage.bind(this));
	},
	onMessage:function(message){
		console.log(message);
		//this.ws.send(message);
	}
};

module.exports = VoiceRecognition;

