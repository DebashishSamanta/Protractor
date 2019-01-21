var browserLogs = require('protractor-browser-logs');
var conf = {
    specs: [
        //// Login Specs
        //'./build/project/spec/test.js',
        // './build/project/spec/login-test-spec.js',
        //'./build/project/spec/foreach-spec.js',
        // './build/project/spec/defineaClass_jasmine-spec.js',
        './build/project/spec/Test1-spec.js',
    ],

    suites: {
        testing: '',
        testing1:'/build/project/spec/test.js'
    },

    multiCapabilities: [
        {
                browserName: 'chrome',
                chromeOptions: {
                    args: [
                        "allow-insecure-localhost",
                        "disable-gpu",
                        "no-sandbox",
                        "disable-web-security",
                        "verbose",
                        "log-path=chromedriver.log",
                        "--start-maximized"
                    ]
                },
                loggingPrefs: {
                driver: 'ALL',
                server: 'ALL',
                browser: 'ALL'
                },
                shardTestFiles: true,
                maxInstances:1
            }
        ],
        framework: 'jasmine2',
        jasmineNodeOpts: {
            isVerbose: true,
            includeStackTrace: true,
            showColors: true,
            defaultTimeoutInterval:600000
        },
        useAllAngular2AppRoots:true,
        onPrepare: function () {
            let browser = require('protractor').browser;

            return browser.getProcessedConfig().then(function (config) {
                   var browserName = config.capabilities.browserName;
                   var reporter = require('./build/project/util/reporter');
                   reporter.configureSpecReporter();
                   reporter.configureJasmine2HtmlReporter();

                   if(global.logs) {
                        throw new Error('Oops,name is already reserved!');
                   }

                   var logs = browserLogs(browser);
                   global.logs = logs;

                   var environment = require('./build/project/configuration/data');
                   browser.params.customConfig = environment.getConfig(browser.params.environment);

                   beforeEach(function () {
                   logs.reset();
                   logs.ignore(logs.or(logs.INFO,logs.DEBUG));
                   logs.ignore(logs.or(logs.WARNING,logs.ERROR,logs.SEVERE));
                   });

                   afterEach(function () {
                    return logs.verify();
                   });

                });
            },

            onComplete: function () {
                if (conf.sauseUser !== undefined && conf.sauseUser !== undefined) {
                    var printSessionId = function (jobname) {
                        browser.getSession().then(function (session) {
                        console.log('SauseOnDemandSessionID=' +session.getId() + 'job-name=' +jobName);
                    });
                };
                printSessionId('Identity Tests');    
            }
        }
};
exports.config = conf;