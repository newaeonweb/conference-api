'use strict';

(function() {
	// Speakers Controller Spec
	describe('Speakers Controller Tests', function() {
		// Initialize global variables
		var SpeakersController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Speakers controller.
			SpeakersController = $controller('SpeakersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Speaker object fetched from XHR', inject(function(Speakers) {
			// Create sample Speaker using the Speakers service
			var sampleSpeaker = new Speakers({
				name: 'New Speaker',
                title: '',
                description: '',
                email: '',
                schedule: ''
			});

			// Create a sample Speakers array that includes the new Speaker
			var sampleSpeakers = [sampleSpeaker];

			// Set GET response
			$httpBackend.expectGET('speakers').respond(sampleSpeakers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.speakers).toEqualData(sampleSpeakers);
		}));

		it('$scope.findOne() should create an array with one Speaker object fetched from XHR using a speakerId URL parameter', inject(function(Speakers) {
			// Define a sample Speaker object
			var sampleSpeaker = new Speakers({
				name: 'New Speaker',
                title: '',
                description: '',
                email: '',
                schedule: ''
			});

			// Set the URL parameter
			$stateParams.speakerId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/speakers\/([0-9a-fA-F]{24})$/).respond(sampleSpeaker);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.speaker).toEqualData(sampleSpeaker);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Speakers) {
			// Create a sample Speaker object
			var sampleSpeakerPostData = new Speakers({
                name: 'New Speaker',
                title: 'Title Test',
                description: 'Description Test',
                email: 'email@test.com',
                schedule: '11:00'
			});

			// Create a sample Speaker response
			var sampleSpeakerResponse = new Speakers({
				_id: '525cf20451979dea2c000001',
				name: 'New Speaker',
                title: 'Title Test',
                description: 'Description Test',
                email: 'email@test.com',
                schedule: '11:00'
			});

			// Fixture mock form input values
			scope.name = 'New Speaker';
            scope.title = 'Title Test';
            scope.description = 'Description Test';
            scope.email = 'email@test.com';
            scope.schedule = '11:00'

			// Set POST response
			$httpBackend.expectPOST('speakers', sampleSpeakerPostData).respond(sampleSpeakerResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Speaker was created
			expect($location.path()).toBe('/speakers/' + sampleSpeakerResponse._id);
		}));

		it('$scope.update() should update a valid Speaker', inject(function(Speakers) {
			// Define a sample Speaker put data
			var sampleSpeakerPutData = new Speakers({
				_id: '525cf20451979dea2c000001',
				name: 'New Speaker',
                title: 'Update the Text',
                description: 'Update the Description',
                email: 'update@test.com',
                schedule: '10:00'
			});

			// Mock Speaker in scope
			scope.speaker = sampleSpeakerPutData;

			// Set PUT response
			$httpBackend.expectPUT(/speakers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/speakers/' + sampleSpeakerPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid speakerId and remove the Speaker from the scope', inject(function(Speakers) {
			// Create new Speaker object
			var sampleSpeaker = new Speakers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Speakers array and include the Speaker
			scope.speakers = [sampleSpeaker];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/speakers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSpeaker);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.speakers.length).toBe(0);
		}));
	});
}());