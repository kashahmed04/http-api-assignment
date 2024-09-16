const fs = require('fs'); 
const { type } = require('os');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);


const respond = (request, response, content, type) => {

  if (request.acceptedTypes[0] === 'text/xml') {
    
    let responseXML = '<response>';
    responseXML = `${responseXML} <name>${content.name}</name>`;
    responseXML = `${responseXML} <age>${content.age}</age>`;
    responseXML = `${responseXML} </response>`;

    //return respond(request, response, responseXML, 'text/xml');
  }

  const typeString = JSON.stringify(content); 

  //return respond(request, response, typeString, 'application/json');

 //is this right can we put this instead of a return to show the content
  response.writeHead(200, {
    'Content-Type': type,
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  
  response.write(content);
  
  response.end();
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
