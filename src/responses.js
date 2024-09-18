const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// //go over connection for conversions for JSON to XML and the difference between each**
// //one in jsonResponses.js (respondJSON()), and client.html (conditional)
// //and how the pathnames change according to buttons rather than when we type it in
// //as well as how the format changes with typing it in and pressing the button on the browser**
// const respond = (request, response, content, type) => {

//   if (request.acceptedTypes[0] === 'text/xml') {

//     let responseXML = '<response>';
//     responseXML += `${responseXML} <message>${content.message}</message>`;
//     responseXML += `${responseXML} <id>${content.id}</id>`;
// tags can be anything for XML
//     responseXML += `${responseXML} </response>`;

//     return respond(request, response, responseXML, 'text/xml');
//   }

//   const typeString = JSON.stringify(content);

//   return respond(request, response, typeString, 'application/json');

// };

const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });

  response.write(index);

  response.end();
};

module.exports = {
  getIndex,
};
