var Language = {
	brain:null,
	processors:{
		question:require('./language/question.js')
	},
	init:function(brain){
		this.brain = brain;
		for(var key in this.processors){
			this.processors[key].init(brain);
		}
	},
	process: function (text) {
		for(var key in this.processors){
			this.processors[key].process(text);
		}
	}
};

module.exports = Language;

