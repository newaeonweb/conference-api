'use strict';

describe('Main View', function() {
    var page;

    beforeEach(function() {
        browser.get('/');
        page = require('./main.po');
    });

    // First test
    it('should include conference name with call to action', function() {
        // First Assertion - expect a text equal Conference
        expect(page.h1El.getText()).toBe('Conference');
        // Second Assertion - expect a anchor tag with Call for Papers text
        expect(page.anchorEl.getText()).toBe('Call for Papers');
        // Third Assertion - expect the url from Call for Papers link
        expect(page.anchorEl.getAttribute('href')).toBe('http://localhost:3000/#!/signup');
    });

    // Second test
    it('should render speakerList', function() {
        // First Assertion - expect a speaker list with 6 speakers
        page.speakerListCount.then(function(count) {
            expect(count).toBe(6);
        });
    });
});


