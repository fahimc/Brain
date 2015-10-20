var Question = {
	brain:null,
	import:{
		findPerson: require('../memory/people/findPersonByQuestion.js')
	},
	triggers:['who', 'what', 'when', 'where', 'why', 'how', 'is', 'can', 'does', 'do'],
	init:function(brain){
		this.brain = brain;
		for(var key in this.import){
			this.import[key].init(brain);
		}
	},
	process: function (text) {
		var trigger = this.isQuestion(text);
		if(trigger){
			switch(trigger){
				case 'who':
				this.import.findPerson.process(text)
			}
			//console.log('this is a question',trigger);
		}
	},
	isQuestion:function(text){
		for(var a = 0;a < this.triggers.length;a++){
			if(text.toLowerCase().indexOf(this.triggers[a]) == 0){
				return this.triggers[a];
			}
		}
		return null;
	}
};

module.exports = Question;

