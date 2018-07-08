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
    callback(undefined, undefined, 'html');
  }

  accountDeleted(data, callback) {
    callback(undefined, undefined, 'html');
  }

  sessionCreate(data, callback) {
    callback(undefined, undefined, 'html');
  }

  sessionDeleted(data, callback) {
    callback(undefined, undefined, 'html');
  }

  checksList(data, callback) {
    callback(undefined, undefined, 'html');
  }

  checksCreate(data, callback) {
    callback(undefined, undefined, 'html');
  }

  checksEdit(data, callback) {
    callback(undefined, undefined, 'html');
  }

}

module.exports = new HtmlHandler();
