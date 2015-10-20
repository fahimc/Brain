var recognition = new webkitSpeechRecognition();

var Main = {
  connection: null,
  init: function () {
    this.connection = new WebSocket('wss://localhost:4000/ws');
    this.connection.onmessage = this.onMessage.bind(this);
    this.connection.onopen = this.onOpen.bind(this);
    this.setVoice();
    this.start();
  },
  setVoice:function(){
   var msg = new SpeechSynthesisUtterance();
   speechSynthesis.getVoices().forEach(function(voice) {
  console.log(voice.name, voice.default ? '(default)' :'');
});
   var voices = window.speechSynthesis.getVoices();
   console.log('here',voices);
   for(var a = 0 ;a<voices.length;a++){
    console.log(voices[a]);
   }
    // msg.voice = voices[3]; // Note: some voices don't support altering params
    // msg.voiceURI = 'native';
    // msg.volume = 0.5; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // // msg.pitch = 2; //0 to 2
   // msg.text = text;
    msg.lang = 'en-GB';
  },
  start: function () {
    recognition.continuous = true;
    // /recognition.interimResults = true;
    recognition.lang = 'en-GB'
    recognition.onresult = this.onResult.bind(this);

    recognition.onstart = function () {};

    recognition.onerror = function (event) {
      console.log(event.error);
    };

    recognition.onend = function () {};
    recognition.start();
  },
  onMessage: function (event) {
    this.speak(event.data);
  },
  onResult: function (event) {
    var text = (event.results[event.results.length - 1][0].transcript);
    console.log(text);
    this.connection.send(text);
    if (text.trim() == 'stop') {
      console.log('stopped');
      recognition.stop();
    }
  },
  speak: function (text) {
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
     msg.voice = voices[8]; // Note: some voices don't support altering params
    // msg.voiceURI = 'native';
    // msg.volume = 0.5; // 0 to 1
    // msg.rate = 1; // 0.1 to 10
    // // msg.pitch = 2; //0 to 2
    msg.text = text;
    msg.lang = 'en-GB';

    speechSynthesis.speak(msg);
  },
  onOpen: function () {
    // this.connection.send('who are you');
    // this.connection.send('who is barak obama');
    // this.connection.send('who was micheal jackson');
    // this.connection.send('who is fahim chowdhury');
  }
};

Main.init();

