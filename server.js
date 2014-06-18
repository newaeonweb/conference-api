// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

// configure app
app.use(bodyParser());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://feiochc:hate666!@kahana.mongohq.com:10073/node-api'); // connect to our database
var Speaker     = require('./app/models/speaker');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// on routes that end in /speakers
// ----------------------------------------------------
router.route('/speakers')

	// create a speaker (accessed at POST http://localhost:8080/speakers)
	.post(function(req, res) {

		var speaker = new Speaker();		// create a new instance of the Speaker model
		speaker.name = req.body.name;  // set the speakers name (comes from the request)
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.body.schedule;


		speaker.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Speaker created!' });
		});


	})

	// get all the speakers (accessed at GET http://localhost:8080/api/speakers)
	.get(function(req, res) {
		Speaker.find(function(err, speakers) {
			if (err)
				res.send(err);

			res.json(speakers);
		});
	});

// on routes that end in /speakers/:speaker_id
// ----------------------------------------------------
router.route('/speakers/:speaker_id')

	// get the speaker with that id
	.get(function(req, res) {
		Speaker.findById(req.params.speaker_id, function(err, speaker) {
			if (err)
				res.send(err);
			res.json(speaker);
		});
	})

	// update the speaker with this id
	.put(function(req, res) {
		Speaker.findById(req.params.speaker_id, function(err, speaker) {

			if (err)
				res.send(err);

			speaker.name = req.body.name;
			speaker.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Speaker updated!' });
			});

		});
	})

	// delete the speaker with this id
	.delete(function(req, res) {
		Speaker.remove({
			_id: req.params.speaker_id
		}, function(err, speaker) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
