var Learning = {
	brain:null,
	processors:{
		train:require('./learning/train.js')
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

module.exports = Learning;

