#!/usr/bin/env node
var express = require('express');
var https = require('https');
var app = express();
var pem = require('pem');
var path = require('path');
var Brain = require('./src/Brain.js');
// var expressWs = require('express-ws')(app); //app = express app 11

var Server ={
	init:function(){
		this.start();
	},
	createSSL:function(){
		pem.createCertificate({days:1, selfSigned:true}, function(err, keys){
			Brain.server = https.createServer({key: keys.serviceKey, cert: keys.certificate}, app);
			Brain.server.listen(4000);
			Brain.init(app);
		});
	},
	start:function(){
		//app.listen(4000);
		this.createSSL();
		console.log('server is running');
	}	
}
Server.init();