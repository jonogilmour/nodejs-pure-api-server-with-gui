/*
 * HTML pages handler
 */

// Dependencies
const helpers = require('../helpers');
const extname = require('path').extname;

class StaticFilesHandler {

  favicon(data, callback) {
    // Read in favicon data
    helpers.getStaticAsset('favicon.ico', (err, data) => (
      !err && data
      ? callback(200, data, 'favicon')
      : callback(500)
    ));
  }

  public(data, callback) {

    // Get requested filename
    const assetFilePathRelative = data.trimmedPath.replace(/^public\//, '').trim();
    if(assetFilePathRelative.length) {
      helpers.getStaticAsset(assetFilePathRelative, (err, data) => {
        if(!err && data) {
          let contentType = 'plain';
          switch(extname(assetFilePathRelative)) {
            case '.css':
              contentType = 'css';
              break;
            case '.ico':
              contentType = 'favicon'
              break;
            case '.png':
              contentType = 'png';
              break;
            case '.jpg':
              contentType = 'jpg';
              break;
          }
          callback(200, data, contentType);
        }
        else {
          callback(404)
        }
      });
    }
    else {
      callback(404);
    }

  }

}

module.exports = new StaticFilesHandler();
