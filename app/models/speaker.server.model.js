'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Speaker Schema
 */
var SpeakerSchema = new Schema({
	name: {
		type: String,
		default: '',
        trim: true,
        required: 'Name cannot be blank'
	},
	title: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	schedule: {
		type: String,
		default:''
	},
	email: {
		type: String,
		default:''
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Speaker', SpeakerSchema);