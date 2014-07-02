// expose config to application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: 'clientID',
		'clientSecret' 	: 'client-secret',
		'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'consumer-key',
		'consumerSecret' 	: 'client-secret',
		'callbackURL' 		: 'http://localhost:3000/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: 'clientID',
		'clientSecret' 	: 'client-secret',
		'callbackURL' 	: 'http://localhost:3000/auth/google/callback'
	}

};