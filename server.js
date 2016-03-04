var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
	res.send(coordenadas);

});

var coordenadas = {
		"latitude": "-7.2496486", 
		"longitude": "-35.8726948"
	};

app.get('/coordenadas', function(req, res) {
	res.send(coordenadas);
});

app.post('/coordenadas', function (req, res) {
  coordenadas = req.body;
  console.log(req.body);	
  res.send('Got a POST request');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});