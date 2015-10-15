var recognition = new webkitSpeechRecognition();

var Main = {
  connection: null,
  init: function () {
    this.connection = new WebSocket('wss://localhost:4000/ws');
    this.connection.onmessage = function (e) {
      console.log('Server: ' + e.data);
    };
    this.connection.onopen = this.onOpen.bind(this);

    this.start();
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
  onResult: function (event) {
    var text = (event.results[event.results.length - 1][0].transcript);
    this.connection.send(text);
    if (text.trim() == 'stop') {
      console.log('stopped');
      recognition.stop();
    }
  },
  onOpen: function () {
this.connection.send('what is your name?');
  }
};

Main.init();

