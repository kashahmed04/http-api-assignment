// we were supposed to get errors in the console except for a 200 status code right for
// the dropdown pathname and actually typing the url pathname**
const respondJSON = (request, response, status, object) => {
  if (request.acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    // is this ok so it does message then an id or should we keep them separate**
    if (object.message) {
      responseXML += `<message>${object.message}</message>`;

      if (object.id) {
        responseXML += `<id>${object.id}</id>`; // if we did not have conditional would it just
        // say undefined and not ignore the value itself and include it in the JSON and XML**
        // why did it include it in the JSON and XML when I converted**
      }
    }

    responseXML += '</response>';

    response.writeHead(status, {
      'Content-Type': 'text/xml',
      'Content-Length': Buffer.byteLength(responseXML, 'utf8'),
    });

    response.write(responseXML);
    response.end();
  } else {
    const content = JSON.stringify(object);

    response.writeHead(status, {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(content, 'utf8'),
    });

    response.write(content);
    response.end();
  }
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response.',
  };

  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters.',
  };

  if (!request.query.valid || request.query.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true.';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }

  responseJSON.message = 'This request has the required parameters';
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response) => {
  const responseJSON = {
    message: 'Missing loggedIn query parameter set to yes',
  };

  if (!request.query.loggedIn || request.query.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes.';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }

  responseJSON.message = 'You have successfully viewed the content.';
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
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
