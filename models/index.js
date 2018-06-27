
// This file was generated with `sequelize init` in the CLI
// NOTE THAT WHEN DEPLOYING TO HEROKU, we need to set process.env.JAWSDB_URL on line 19.

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
//var config    = require(__dirname + '/..\config\config.json')[env];
var config    = require(__dirname + './../config/config.json')[env];
var db        = {};
var JAWSDB_URL= "otwsl2e23jrxcqvx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com"
var sequelize= null;
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

  Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
