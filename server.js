var mongoose  = require('mongoose');

var express = require('express');

var bodyParser = require('body-parser');

var natural = require ('natural');

var app = express();

app.use(bodyParser());

// Change this to your Mongo URI
mongoose.connect('mongodb://helloworld:pgoodjs@ds033018.mongolab.com:33018/goodjs');

var UserModel = mongoose.Schema({
	username: String,
	password: String,
	created: { type: String, default: Date.now }
});

var Model = mongoose.Schema({
	name: String,
	amount: { type: Number, default: 0 }
});

// Note I changed the name of the product collection
var Product = mongoose.model('product', Model);

var User = mongoose.model('user', UserModel);

// Finds all of the records in the product collection. 
Product.find({}, function(err, docs){
	console.log(docs);
});

app.get('/', function(req, res){
	console.log('home loaded');
	Product.find({}, function(err, docs){
		res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.send(docs);
	});
});

app.post('/', function(req, res){

	// console.log(req.score);
	// res.send(JSON.stringify(score));

	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err, doc){
		res.header("Access-Control-Allow-Origin", "*");
    	res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.send(doc);
	});

});

app.post('/search', function(req, res){

	console.log(req.body);

	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

	User.findOne({ username: req.body.query }, function(err, doc){

		if(doc){
			res.send(doc);
		} else {
			res.send({ created: "User not found." });
		}

	});

});

app.post('/login', function(req, res){

	console.log(req.body);

	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

	User.findOne({ username: req.body.username}, function(err, doc){
		// If it does find a 'doc', return the doc.
		if(doc){
			res.send(doc);

		// Otherwise, save it and then returned the saved doc.
		} else {
			var user = new User({
				username: req.body.username,
				password: req.body.password
			});

			user.save(function(err, doc){
				res.send(doc);
			});
		}
	});


});

 app.post('/natural', function(req, res){

 	var find = "unhappy mad pissed broken support";
	var score = natural.JaroWinklerDistance(find, req.body.natural);

	classifier = new natural.BayesClassifier();

	classifier.addDocument('i am pissed', 'angry');
	classifier.addDocument('i love gooddata', 'happy');
	classifier.addDocument('i am happy', 'happy');
	classifier.addDocument('sell gold', 'sell gold');

	classifier.train();


	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    res.send(JSON.stringify(classifier.classify(req.body.natural)));
       

});

app.listen(80);
