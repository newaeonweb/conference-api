'use strict';

// Configuring the Articles module
angular.module('speakers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Speakers', 'speakers', 'dropdown', '/speakers(/create)?');
		Menus.addSubMenuItem('topbar', 'speakers', 'List Speakers', 'speakers');
		Menus.addSubMenuItem('topbar', 'speakers', 'New Speaker', 'speakers/create');
	}
]);