
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
      id: 'success',
      name: 'success',
    };
  
    respondJSON(request, response, 200, responseJSON);
  };
  

  const badRequest = (request, response) => {

    const responseJSON = {
      message: 'This request has the required parameters',
      //do id's usually have spaces
      id: 'bad request',
      name: 'success',
    };

    if (!request.query.valid || request.query.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      responseJSON.name = 'bad request';
      return respondJSON(request, response, 400, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);    
  
  };

  const unauthorized = (request, response) => {
    const responseJSON = {
      message: 'This request is unauthorized',
      id: 'unauthorized',
      name: 'unauthorized',
    };

    if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
      responseJSON.message = 'Missing valid query parameter set to yes';
      responseJSON.id = 'badRequest';
      responseJSON.name = 'bad request';
      return respondJSON(request, response, 401, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);    

  }

  const forbidden = (request, response) => {
    const responseJSON = {
      message: 'This is a forbidden status code',
      id: 'forbidden',
      name: 'forbidden',
    };
  
    respondJSON(request, response, 403, responseJSON);
  };

  const internal = (request, response) => {
    const responseJSON = {
      message: 'This is an internal status code',
      id: 'internal',
      name: 'internal',
    };
  
    respondJSON(request, response, 500, responseJSON);
  };

  const notImplemented = (request, response) => {
    const responseJSON = {
      message: 'This is a not implemented status code',
      //can we have id's with spaces in between
      id: 'not implemented',
      name: 'not implemented',
    };
  
    respondJSON(request, response, 501, responseJSON);
  };
  
  const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'not found',
      //can we use name here to display the name in the browser**
      name: 'not found',
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
 
  