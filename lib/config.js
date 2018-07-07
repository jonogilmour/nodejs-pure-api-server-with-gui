/*
 * Create and export configuration variables
 */

// Container for all the environments
class Environments {
  constructor() {
    this.twilio = {
      accountSid: 'ACb32d411ad7fe886aac54c665d25e5c5d',
      authToken: '9455e3eb3109edc12e3d8c92768f7a67',
      fromPhone: '+15005550006'
    };
  }

  staging() {
    return {
      httpPort: 3000,
      httpsPort: 3001,
      envName: 'staging',
      hashingSecret: 'thisisasecret',
      maxChecks: 5,
      twilio: this.twilio,
      templateGlobals: {
        appName: 'Uptime Checker',
        companyName: 'Example Company',
        yearCreated: '2018',
        baseUrl: 'http://localhost:3000'
      }
    };
  }

  production() {
    return {
      httpPort: 5000,
      httpsPort: 5001,
      envName: 'production',
      hashingSecret: 'thisisanothersecret',
      maxChecks: 5,
      twilio: this.twilio,
      templateGlobals: {
        appName: 'Uptime Checker',
        companyName: 'Example Company',
        yearCreated: '2018',
        baseUrl: 'http://localhost:5000'
      }
    };
  }
}

// Determine which env to export based on environment variable
const currentEnvironment =
  typeof process.env.NODE_ENV === 'string'
  ? process.env.NODE_ENV.toLowerCase()
  : '';

const environments = new Environments();

// Export the env configuration
module.exports =
  typeof environments[currentEnvironment] === 'function'
  ? environments[currentEnvironment]()
  : environments.staging()
