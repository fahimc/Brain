var express = require('express');
var Language = require('../../processing/language.js');
var WebSocketServer = require('ws').Server;
require('shelljs/global');

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
		//console.log(message);
		Language.process(message);
		this.brain.processors.learning.process(message);
		//
	},
	send:function(text){
		this.ws.send(text);
	}
};

module.exports = VoiceRecognition;

