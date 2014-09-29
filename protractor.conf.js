// Protractor configuration
// https://github.com/angular/protractor/blob/master/referenceConf.js

'use strict';

exports.config = {
    // The timeout for each script run on the browser. This should be longer
    // than the maximum time your application needs to stabilize between tasks.
    allScriptsTimeout: 110000,

    /**
     * Use `seleniumAddress` for faster startup; run `./node_modules/.bin/webdriver-manager start` to launch the Selenium server.
     * Use `seleniumPort` to let Protractor manage its own Selenium server instance (using the server JAR in its default location).
     */
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    // seleniumPort: 4444,


    // A base URL for your application under test. Calls to protractor.get()
    // with relative paths will be prepended with this.
    baseUrl: 'http://localhost:' + (process.env.PORT || '3000'),


    // If true, only chromedriver will be started, not a standalone selenium.
    // Tests for browsers other than chrome will not run.
    chromeOnly: true,

    //chromeDriver: 'node_modules/grunt-protractor-runner/node_modules/protractor/node_modules/selenium-webdriver/chromedriver',

    // list of files / patterns to load in the browser
    specs: [
        'e2e/**/*.spec.js'
    ],

    // Patterns to exclude.
    exclude: [],

    // ----- Capabilities to be passed to the webdriver instance ----
    //
    // For a full list of available capabilities, see
    // https://code.google.com/p/selenium/wiki/DesiredCapabilities
    // and
    // https://code.google.com/p/selenium/source/browse/javascript/webdriver/capabilities.js
    capabilities: {
        'browserName': 'chrome'
    },

    // ----- The test framework -----
    //
    // Jasmine and Cucumber are fully supported as a test and assertion framework.
    // Mocha has limited beta support. You will need to include your own
    // assertion framework if working with mocha.
    framework: 'jasmine',

    // ----- Options to be passed to minijasminenode -----
    //
    // See the full list at https://github.com/juliemr/minijasminenode
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
