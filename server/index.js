const express = require('express');
const bodyParser = require('body-parser');
const helpers = require('../helpers/github.js');
const Save = require('../database/index.js');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  helpers.getReposByUsername(req.body.data, function(git) {
    Save.save(git);
  });  
  res.end("posted");
});

app.get('/repos', function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Save.findRepo(function(repos) {
    res.json(repos);
  });  
  // res.end("got");
});

// let port = 1128;

app.listen(1128, function() {
  console.log(`listening on port 1128`);
});

