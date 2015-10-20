var Train={
	import:{
		natural : require('natural'),
		fs : require('fs')
	},
	classifier:null,
	brain:null,
	path:'./src/modules/memory/db/classifier.json',
	init:function(brain){
		this.brain =brain;
		this.import.fs.stat(this.path,this.onPath.bind(this))


	},
	onPath:function(err,stat){
		if(err == null) {
			this.import.natural.BayesClassifier.load(this.path, null, this.onLoad.bind(this));
		}else{
			this.classifier = new this.import.natural.BayesClassifier();
		}
	},
	onLoad:function(err, classifier){
		console.log('load');
		if(!err && classifier) this.classifier = classifier;
			console.log(this.classifier.classify('likes summer'));
	},
	process:function(text,cat){
		console.log('process');
		this.classifier.addDocument(text,cat);
		this.classifier.train();
		this.classifier.save(this.path, function(err, classifier) {
		});
	}
};

module.exports = Train;