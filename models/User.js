
'use strict';

// the User type table is a pre genderated table that is used as a reference on other tables
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fbID: {
      type:DataTypes.STRING,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return User;
};
