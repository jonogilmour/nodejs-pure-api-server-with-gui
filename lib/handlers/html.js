/*
 * HTML pages handler
 */

// Dependencies
const helpers = require('../helpers');

class HtmlHandler {

  index(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Uptime Monitor',
        'head.description': 'HTTP/HTTPS uptime monitoring around the clock.',
        'body.class': 'index'
      };

      helpers.getTemplate('index', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  accountCreate(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Create an Account',
        'head.description': 'Signup to uptime monitoring.',
        'body.class': 'accountCreate'
      };

      helpers.getTemplate('accountCreate', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  accountEdit(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Account Settings',
        'body.class': 'accountEdit'
      };

      helpers.getTemplate('accountEdit', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  accountDeleted(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Account Deleted',
        'head.description': 'Your account has been deleted',
        'body.class': 'accountDeleted'
      };

      helpers.getTemplate('accountDeleted', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  sessionCreate(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Login to your Account',
        'head.description': 'Enter your credentials to access your account.',
        'body.class': 'sessionCreate'
      };

      helpers.getTemplate('sessionCreate', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  sessionDeleted(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Logged Out',
        'head.description': 'You have successfully logged out.',
        'body.class': 'sessionDeleted'
      };

      helpers.getTemplate('sessionDeleted', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  checksList(data, callback) {
    callback(undefined, undefined, 'html');
  }

  checksCreate(data, callback) {
    if(data.method === 'get') {
      const templateData = {
        'head.title': 'Create a Check',
        'body.class': 'checksCreate'
      };

      helpers.getTemplate('checksCreate', templateData, (err, str) => {
        if(!err && str) {
          helpers.addLayouts(
            str,
            templateData,
            (err, templateHtml) => (
              !err && templateHtml
              ? callback(200, templateHtml, 'html')
              : callback(500, undefined, 'html')
            )
          );

        }
        else {
          callback(500, undefined, 'html');
        }
      });
    }
  }

  checksEdit(data, callback) {
    callback(undefined, undefined, 'html');
  }

}

module.exports = new HtmlHandler();
