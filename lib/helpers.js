/*
 * Helpers for various tasks
 */

// Dependencies
const crypto = require('crypto');
const config = require('./config');
const https = require('https');
const querystring = require('querystring');
const path = require('path');
const fs = require('fs');

// Container for helpers
class Helpers {

  // Hash a string using SHA256
  hash(rawString) {
    return (
      typeof rawString === 'string'
      && rawString.length
      ? crypto.createHmac('sha256', config.hashingSecret).update(rawString).digest('hex')
      : false
    );
  }

  // Convert a string to JSON
  parseJsonToObject(str) {
    try {
      return JSON.parse(str);
    }
    catch(e) {
      return {};
    }
  }

  // Create a random alphanumeric string of a given length
  createRandomString(length) {
    if(typeof length === 'number' && length) {
      // Define all characters that can go into a string
      const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
      // Return a random string from the possible characters of the given length
      const a =
        (l, str) =>
        l
        ? a(--l, str + possible[Math.floor(Math.random() * possible.length)])
        : str;
        
      return a(length, '');
    }
    else {
      return false;
    }
  }

  // Send an SMS via Twilio API
  sendTwilioSms(phone, message, callback) {

    // Validate params
    phone =
      typeof phone === 'string'
      && phone.trim().length === 10
      ? phone.trim()
      : false;

    message =
      typeof message === 'string'
      && message.trim().length <= 1600
      ? message.trim()
      : false;

    if(phone && message) {

      // Config the request payload
      const payload = {
        From: config.twilio.fromPhone,
        To: `+61${phone}`,
        Body: message
      };

      // Stringify payload
      const stringPayload = querystring.stringify(payload);

      // Configure request
      const requestDetails = {
        protocol: 'https:',
        hostname: 'api.twilio.com',
        method: 'POST',
        path: `/2010-04-01/Accounts/${config.twilio.accountSid}/Messages.json`,
        auth: `${config.twilio.accountSid}:${config.twilio.authToken}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(stringPayload)
        }
      };

      // Instantiate request object
      const request = https.request(requestDetails, res => {
        // Grab status of sent request
        const status = res.statusCode;

        // Callback success if it went through
        if(status === 200 || status === 201) {
          callback(false);
        }
        else {
          callback(`Status code returned was ${status}`);
        }
      });

      // Bind to the error event so it doesn't bubble up
      request.on('error', callback);

      // Add payload to request
      request.write(stringPayload);

      // End request
      request.end();

    }
    else {
      callback('Given params are invalid');
    }

  }

  // Get string content of a template
  getTemplate(templateName, data, callback) {

    if(typeof templateName === 'string' && templateName.length) {
      const templatesDir = path.join(__dirname, '/../templates/');
      fs.readFile(
        `${templatesDir}${templateName}.html`,
        'utf8',
        (err,str) => (
          !err && str && str.length
          ? callback(
            false,
            this.interpolate(str, data, config.templateGlobals)
          )
          : callback(`No template found for (${templateName})`)
        )
      );
    }
    else {
      callback('Valid template name not specified');
    }

  }

  // Insert layout
  addLayouts(str = '', data = {}, callback) {
    this.getTemplate(
      '_header',
      data,
      (err, headerHtml) => {
        if(!err && headerHtml) {

          this.getTemplate(
            '_footer',
            data,
            (err, footerHtml) => {

              if(!err && footerHtml) {
                const fullHtmlTemplate = headerHtml+str+footerHtml;
                callback(false, fullHtmlTemplate);
              }
              else {
                callback('Could not find the footer layout');
              }

            }
          );

        }
        else {
          callback('Could not find the header layout');
        }
      }
    )
  }

  // Take a string and data object and replace keys within it
  interpolate(str = '', data = {}, globals = {}) {
    // Merge global values into the data object, prefixing each key with 'global.'
    Object.entries(globals).forEach(
      ([key, value]) => {
        data[`global.${key}`] = value;
      }
    );

    // Interpolate the values into the string provided by their keys
    Object.entries(data).forEach(
      ([key, value]) => {
        (typeof value === 'string')
        &&
        (str = str.replace(`{${key}}`, value));
      }
    );

    return str;
  }

  getStaticAsset(file, callback) {
    if(typeof file === 'string' && file.length) {
      console.log();
      const publicDir = path.join(__dirname, '/../public/');
      fs.readFile(
        `${publicDir}${file}`,
        (err, data) => (
          !err && data
          ? callback(false, data)
          : callback('Static asset file not found')
        )
      );
    }
    else {
      callback('Valid static asset name not specified');
    }
  }

  contentType(type) {
    // Set the response parts specific to the content
    switch(type) {
      case 'json':
        return 'application/json'
      case 'html':
        return 'text/html';
      case 'css':
        return 'text/css';
      case 'png':
        return 'image/png';
      case 'jpg':
        return 'image/jpeg';
      case 'favicon':
        return 'image/x-icon';
      default:
        return 'text/plain';
    }
  }

  payloadToString(payload, contentType) {
    switch(contentType) {
      case 'json':
        return JSON.stringify(
          typeof payload === 'object'
          ? payload :
          {}
        );
      case 'html':
        return typeof payload === 'string' ? payload : '';
      case 'favicon':
      case 'css':
      case 'png':
      case 'jpg':
      case 'css':
      case 'plain':
        return typeof payload !== 'undefined' ? payload : '';
      default:
        return false;
    }
  }

}

module.exports = new Helpers();
