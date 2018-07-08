/*
 * Front end application logic
 */

// Container for front end application
var app = {};

// Config object
app.config = {
  'sessionToken' : false
};

// AJAX Client for REST API
app.client = {};

// Interface for API calls
app.client.request = function(headers, path, method, queryStringObject, payload, callback) {

  // Set defaults
  headers = typeof headers === 'object' && headers ? headers : {};
  path = typeof path === 'string' ? path : '/';
  method = typeof method === 'string' && ['POST', 'GET', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : 'GET';
  queryStringObject = typeof queryStringObject === 'object' && queryStringObject ? queryStringObject : {};
  payload = typeof queryStringObject === 'object' && payload ? payload : {};
  callback = typeof callback === 'function' ? callback : false;

  // Add all query string object variables to path
  var requestUrl = path+'?';
  var counter = 0;
  for(var queryKey in queryStringObject) {
    if(queryStringObject.hasOwnProperty(queryKey)) {
      counter++;
      // Prepend all params after the first with an ampersand
      if(counter > 1) {
        requestUrl += '&';
      }
      requestUrl += queryKey+'='+queryStringObject[queryKey];
    }
  }

  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);

  headers['Content-Type'] = 'application/json';
  if(app.config.sessionToken) {
    headers['token'] = app.config.sessionToken.id;
  }

  // Set each header in the headers object
  for(var headerKey in headers) {
    if(headers.hasOwnProperty(headerKey)) {
      xhr.setRequestHeader(headerKey, headers[headerKey]);
    }
  }

  // Handle the response from the server
  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      var statusCode = xhr.status;
      var responseReturned = xhr.responseText;

      // Callback if needed
      if(callback) {
        try {
          callback(statusCode, JSON.parse(responseReturned));
        }
        catch(e) {
          callback(statusCode, false);
        }
      }
    }
  }

  // Send the payload to the server as a JSON string
  xhr.send(JSON.stringify(payload));
}

// Bind the forms
app.bindForms = function(){
  document.querySelector("form").addEventListener("submit", function(e){

    // Stop it from submitting
    e.preventDefault();
    var formId = this.id;
    var path = this.action;
    var method = this.method.toUpperCase();

    // Hide the error message (if it's currently shown due to a previous error)
    document.querySelector("#"+formId+" .formError").style.display = 'hidden';

    // Turn the inputs into a payload
    var payload = {};
    var elements = this.elements;
    for(var i = 0; i < elements.length; i++){
      if(elements[i].type !== 'submit'){
        var valueOfElement = elements[i].type == 'checkbox' ? elements[i].checked : elements[i].value;
        payload[elements[i].name] = valueOfElement;
      }
    }

    // Call the API
    app.client.request(undefined,path,method,undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode !== 200){

        // Try to get the error from the api, or set a default error message
        var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = error;

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, send to form response processor
        app.formResponseProcessor(formId,payload,responsePayload);
      }

    });
  });
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  var functionToCall = false;
  if(formId == 'accountCreate'){
    // @TODO Do something here now that the account has been created successfully
  }
};

// Init (bootstrapping)
app.init = function(){
  // Bind all form submissions
  app.bindForms();
};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
