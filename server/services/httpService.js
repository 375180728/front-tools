const rp = require('request-promise');

const send = async function (url, method, data, headers) {
  return await new Promise(resolve => {
    rp({
      uri: encodeURI(url),
      method: method || 'GET',
      rejectUnauthorized: false,
      headers: headers, 
      body: data ? JSON.stringify(data) : undefined
    }).then(result => {
      resolve(result)
    }).catch(error => {
      resolve(error);
    });
  });
}

module.exports.send = send;