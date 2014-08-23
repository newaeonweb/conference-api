'use strict';

//Speakers service used to communicate Speakers REST endpoints
angular.module('speakers').factory('Speakers', ['$resource',
	function($resource) {
		return $resource('speakers/:speakerId', {
			speakerId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);