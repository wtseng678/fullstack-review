const request = require('request');
const config = require('../config.js');
const db = require('../database');

let getReposByUsername = (user, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  request.get(options, function(err, git) {
    if (err) {
      console.err(err);
    } else {
      cb(git);
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;