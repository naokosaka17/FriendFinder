var friendData 		= require('../data/friends.js');
var path 			= require('path');

// API GET Requests - when users "visit" a page. 
// (ex:localhost:PORT/api/admin...they are shown a JSON of the data in the table) 

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};
var friendScores = [];
var matchingScores = [];

module.exports = function(app){
	app.get('/api/friends', function(req, res){
		res.json(friendData);
	});

	
	for (var i=0; i<friendData.length; i++) {
		friendScores[i] = eval(friendData[i].scores.toString().replace(/,/g,'+'));
	}

	app.post('/api/friends', function(req, res){

		var userScore = eval(req.body.scores.toString().replace(/,/g,'+'));
		for (var i=0; i<friendScores.length; i++){
			matchingScores.push(Math.abs(userScore-friendScores[i]))
		}

		for (var i=0; i<matchingScores.length; i++) {
			if (matchingScores.min() == matchingScores[i]) {
				res.json(friendData[i]);
			}
		}
	});
};