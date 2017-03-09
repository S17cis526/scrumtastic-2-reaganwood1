"use strict";

var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scrumtastic.sqlite3', function(err) {
  if(err) console.error(err);
});

var router = new (require('./lib/migrate').Router);

router.add('/', function(req, res) {
  fs.readFile('/public/index.html', function(err, body){
    res.end(body);
  });
});

var migrate = require('./lib/migrate');
migrate(db, 'migrations', function(err){
  var server = new http.Server(function(req, res){

    router.toute(req, res);
  });
  server.listen(3000, function(){
    console.log("listening on port " + 3000);
  });

});
