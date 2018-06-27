
'use strict';

// the User type table is a pre genderated table that is used as a reference on other tables
module.exports = function(sequelize, DataTypes) {
  var UserPotluck = sequelize.define('userPotluck', {
    userPotluckID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
  }, {
    timestamps: false
  });
  return UserPotluck;
};
