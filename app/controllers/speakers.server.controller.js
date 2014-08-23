'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Speaker = mongoose.model('Speaker'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Speaker already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Speaker
 */
exports.create = function(req, res) {
	var speaker = new Speaker(req.body);
	speaker.user = req.user;

	speaker.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(speaker);
		}
	});
};

/**
 * Show the current Speaker
 */
exports.read = function(req, res) {
	res.jsonp(req.speaker);
};

/**
 * Update a Speaker
 */
exports.update = function(req, res) {
	var speaker = req.speaker ;

	speaker = _.extend(speaker , req.body);

	speaker.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(speaker);
		}
	});
};

/**
 * Delete an Speaker
 */
exports.delete = function(req, res) {
	var speaker = req.speaker ;

	speaker.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(speaker);
		}
	});
};

/**
 * List of Speakers
 */
exports.list = function(req, res) { Speaker.find().sort('-created').populate('user', 'displayName').exec(function(err, speakers) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(speakers);
		}
	});
};

/**
 * Speaker middleware
 */
exports.speakerByID = function(req, res, next, id) { Speaker.findById(id).populate('user', 'displayName').exec(function(err, speaker) {
		if (err) return next(err);
		if (! speaker) return next(new Error('Failed to load Speaker ' + id));
		req.speaker = speaker ;
		next();
	});
};

/**
 * Speaker authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.speaker.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};