var Language = {
	processors:{
		responder:require('./language/responder.js')
	},
	process: function (text) {
		for(var key in this.processors){
			this.processors[key].process(text);
		}
	}
};

module.exports = Language;

