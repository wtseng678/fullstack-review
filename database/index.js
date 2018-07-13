const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
  name: String,
  owner: String,
  desc: String,
  avatar: String,
  html: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (git) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  var repos = [];
  var parsed = JSON.parse(git.body);
  for (var i = 0; i < parsed.length; i++) {    
    var repo = new Repo({
      id: parsed[i].id,
      name: parsed[i].name,
      owner: parsed[i].owner.login,
      desc: parsed[i].description,
      avatar: parsed[i].owner.avatar_url,
      html: parsed[i].html_url
    });
    
    repo.save(function (err) { if (err) { console.log(err); } });
    
    repos.push(repo);
  } 
}

var findRepo = function(cb) { //needs to take in a callback 
  Repo.find(function(err, repos) {
    if (err) {
      console.log(err);
    } else {
      cb(repos);
    }
  }).limit(25).sort({'name': 1});
}

module.exports.save = save;
module.exports.findRepo = findRepo;