var FindPerson = {
  brain: null,
  import: {
    speak: require("speakeasy-nlp"),
    nlp: require("nlp_compromise"),
    me: require("../me/aboutme.js"),
    google: require('google'),
    natural : require('natural')
  },
  init: function (brain) {
    this.brain = brain;
  },
  process: function (text) {
    var result = this.import.speak.classify(text);
    if (!result.nouns.length) {
      //check if its me
      var arr = text.split(' ');
      var me = arr[arr.length - 1];
      if (me == 'you') {
        var name = this.import.me.name;
        this.brain.sensors.output.speaker.speak('My name is ' + name);
      }
    } else {
      //search nouns
      // console.log('search ' + result.nouns.join(' '));
      var google = this.import.google;

      google.resultsPerPage = 3;
      var nextCounter = 0;
      var _this = this;
      var found = false;
      google(text + " wiki", function (err, next, links) {
        if (err) console.error(err)

          for (var i = 0; i < links.length; ++i) {
           var title = links[i].title.toLowerCase();
           var description = links[i].description.toLowerCase();
           var name = result.nouns.join(' ').toLowerCase();
          // console.log(links[i].title + ' - ' + links[i].link) // link.href is an alias for link.link
          var hasName = title.split('-')[0];
          var match = _this.import.natural.JaroWinklerDistance(name,hasName);
          if(match >= 0.5 && description.indexOf('redirect here') < 0)
          {
            var sentence = description.substring(0,description.lastIndexOf(". "));
            console.log(match,sentence);
            _this.brain.sensors.output.speaker.speak('Here\'s what i found regarding ' +  result.nouns.join(' '));
            _this.brain.sensors.output.speaker.speak(sentence);
            found=true;
            break; 
          }

        }
        if(!found)_this.brain.sensors.output.speaker.speak('Sorry, I dont know '+ name + ', nor could I find him on wiki');
      });
    }

  }
};

module.exports = FindPerson;

