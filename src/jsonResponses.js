
//does this take care of all the cases**
const respondJSON = (request, response, status, object) => {
    const content = JSON.stringify(object);
  
    response.writeHead(status, { 
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    response.write(content);
    response.end();
  };
  
  const success = (request, response) => {
    const responseJSON = {
      message: 'This is a successful response',
    };
  
    respondJSON(request, response, 200, responseJSON);
  };
  

  const badRequest = (request, response) => {

    const responseJSON = {
      message: 'This request has the required parameters',
      id: 'badRequest', //we do not usually put spaces in between id's right**
      //do we put this here or would it show up in the success response too with valid=true**
    };

    if (!request.query.valid || request.query.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      return respondJSON(request, response, 400, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);    
  
  };

  const unauthorized = (request, response) => {
    const responseJSON = {
      message: 'This request is unauthorized',
    };

    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      responseJSON.message = 'Missing valid query parameter set to yes';
      return respondJSON(request, response, 401, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);    

  }

  const forbidden = (request, response) => {
    const responseJSON = {
      message: 'This is a forbidden status code',
    };
  
    respondJSON(request, response, 403, responseJSON);
  };

  const internal = (request, response) => {
    const responseJSON = {
      message: 'This is an internal status code',
    };
  
    respondJSON(request, response, 500, responseJSON);
  };

  const notImplemented = (request, response) => {
    const responseJSON = {
      message: 'This is a not implemented status code',
    };
  
    respondJSON(request, response, 501, responseJSON);
  };
  
  const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
    };
  
    respondJSON(request, response, 404, responseJSON);
  };

  module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
  };
 
  