// Import the Modules
var express    = require('express');
var bodyParser = require('body-parser');
var path       = require('path');
var app        = express();

// view engine setup changed to Hogan instead Jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// configure app
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

var port     = process.env.PORT || 8080; // where the application will run

// Import Mongoose
var mongoose   = require('mongoose');

// connect to our database
// mongoose.connect('mongodb://127.0.0.1:port/node-api');
mongoose.connect('mongodb://feiochc:hate666!@kahana.mongohq.com:10073/node-api');

var Speaker     = require('./server/models/speaker');

// Defining the Routes for our API

// Start the Router
var router = express.Router();

// A simple middleware to use for all Routes and Requests
router.use(function(req, res, next) {
	// Give some message on the console
	console.log('An action was performed by the server.');
    // Is very important using the next() function, without this the Route stops here.
	next();
});

// Default message when access the API folder through the browser
router.get('/', function(req, res) {
    // Give some Hello there message
	//res.json({ message: 'Hello SPA, the API is working!' });
    res.render('index', { message: 'Hello SPA, the API is working!' });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



// When accessing the speakers Routes
router.route('/speakers')

	// create a speaker when the method passed is POST
	.post(function(req, res) {

        // create a new instance of the Speaker model
		var speaker = new Speaker();

        // set the speakers properties (comes from the request)
		speaker.name = req.body.name;
        speaker.company = req.body.company;
        speaker.title = req.body.title;
        speaker.description = req.body.description;
        speaker.picture = req.body.picture;
        speaker.schedule = req.body.schedule;

        // save the data received
		speaker.save(function(err) {
			if (err)
				res.send(err);

            // give some success message
			res.json({ message: 'speaker successfully created!' });
		});
	})

	// get all the speakers when a method passed is GET
	.get(function(req, res) {
		Speaker.find(function(err, speakers) {
			if (err)
				res.send(err);

			res.json(speakers);
		});
	});

// on accessing speaker Route by id
router.route('/speakers/:speaker_id')

	// get the speaker by id
	.get(function(req, res) {
		Speaker.findById(req.params.speaker_id, function(err, speaker) {
			if (err)
				res.send(err);
			res.json(speaker);
		});
	})

	// update the speaker by id
	.put(function(req, res) {
		Speaker.findById(req.params.speaker_id, function(err, speaker) {

			if (err)
				res.send(err);

            // set the speakers properties (comes from the request)
            speaker.name = req.body.name;
            speaker.company = req.body.company;
            speaker.title = req.body.title;
            speaker.description = req.body.description;
            speaker.picture = req.body.picture;
            speaker.schedule = req.body.schedule;

            // save the data received
			speaker.save(function(err) {
				if (err)
					res.send(err);

                // give some success message
				res.json({ message: 'speaker successfully updated!' });
			});

		});
	})

	// delete the speaker by id
	.delete(function(req, res) {
		Speaker.remove({
			_id: req.params.speaker_id
		}, function(err, speaker) {
			if (err)
				res.send(err);

            // give some success message
			res.json({ message: 'speaker successfully deleted!' });
		});
	});


// register the route
app.use('/', router);

// start the server
app.listen(port);
console.log('Magic happens on port ' + port);
