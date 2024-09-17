
const http = require('http'); 
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

//when it says default to JSON format, is it already by default because
//the button is already set to JSON**
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  '/css': htmlHandler.getStyles,
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

