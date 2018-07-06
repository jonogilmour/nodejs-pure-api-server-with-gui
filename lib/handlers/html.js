/*
 * HTML pages handler
 */

// Dependencies
const _data = require('../data');

class HtmlHandler {

  index(data, callback) {
    callback(undefined, undefined, 'html');
  }

  accountCreate(data, callback) {
    callback(undefined, undefined, 'html');
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
