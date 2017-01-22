//install node module
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

//set up
var app = express();
var PORT = 8080;

app.use(express.static('./app/public'))
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded ({ extended:true }));
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

app.listen(PORT,function(){
	console.log("App is listening!");
});