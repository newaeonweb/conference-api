'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Speakers',
	function($scope, Authentication, Speakers) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Find a list of Speakers
        $scope.find = function() {
            $scope.speakers = Speakers.query();
        };

	}
]);