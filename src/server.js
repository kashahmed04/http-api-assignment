
const http = require('http'); 
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
//is the testing correct in the terminal**
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/unauthorized': jsonHandler.unauthorized,
  '/forbidden': jsonHandler.forbidden,
  '/internal': jsonHandler.internal,
  '/notImplemented': jsonHandler.notImplemented,
  '/style.css': htmlHandler.getStyles,
  notFound: jsonHandler.notFound,
};


const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  request.query = Object.fromEntries(parsedUrl.searchParams);

  request.acceptedTypes = request.headers.accept.split(',');

  //if there is a value at this key, do the function 
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response);
  } else {
    //if there is no value at this key, go to the
    //not found page 
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);

