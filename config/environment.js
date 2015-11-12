/* jshint node: true */

var secretConfig = require('../secret.json');

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ceropath-uploader',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      resources: ['Taxonomy', 'Individual', 'Site', 'Publication'],
      secret: secretConfig.persistKey
    }
  };


  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.ceropathHost = 'http://localhost:8888';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.ceropathHost = 'http://rdbsea.ceropath.org';
  }

  ENV.contentSecurityPolicy = {
    'default-src': "'none'",
    'script-src': "'self' 'unsafe-inline'",
    'font-src': "'self'",
    'connect-src': "'self' "+ENV.APP.ceropathHost,
    'img-src': "'self'",
    'style-src': "'self' 'unsafe-inline'",
    'media-src': "'self'"
  };

  ENV.emberOffline = {
    checks: {
      xhr: {
        url: ENV.APP.ceropathHost
      }
    }
  };

  return ENV;
};
