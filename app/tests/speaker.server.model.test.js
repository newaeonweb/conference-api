'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Speaker = mongoose.model('Speaker');

/**
 * Globals
 */
var user, speaker;

/**
 * Unit tests
 */
describe('Speaker Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			speaker = new Speaker({
				name: 'Speaker Name',
                title: 'Track Title',
                decription: 'description of the speaker track',
                email: 'testemail@test.com.br',
                schedule: '9:10',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return speaker.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			speaker.name = '';

			return speaker.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Speaker.remove().exec();
		User.remove().exec();

		done();
	});
});