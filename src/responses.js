const fs = require('fs'); 
const { type } = require('os');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

//how does it defualt to JSON automatically**
//do I put the JSON and XML requests in both the client and server**
//when we type /status code the defauly that should show up is a JSON file right**

const respond = (request, response, content, type) => {

  if (request.acceptedTypes[0] === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML += `${responseXML} <message>${content.message}</message>`;
    responseXML += `${responseXML} <id>${content.id}</id>`; //we can put anything within the <> right**
    responseXML += `${responseXML} </response>`;

    return respond(request, response, responseXML, 'text/xml');
  }

  const typeString = JSON.stringify(content); 

  return respond(request, response, typeString, 'application/json');

 //is this right can we put this instead of a return to show the content
  // response.writeHead(200, {
  //   'Content-Type': type,
  //   'Content-Length': Buffer.byteLength(content, 'utf8'),
  // });
  
  // response.write(typeString);
  
  // response.end();
};

const getIndex = (request, response) => {
  respond(request, response, index, 'text/html');
};

module.exports = {
  getCats: getType,
  getIndex,
};

/**
 * we will be building a server with endpoints 
 * and query params 
 * it will return XML or JSON 
 * depending on the version of the browser some
 * responses will look different but if we have same type
 * of information we should be ok 
 */
