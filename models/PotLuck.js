
'use strict';
// the User type table is a pre genderated table that is used as a reference on other tables
module.exports = function(sequelize, DataTypes) {
  var PotLuck = sequelize.define('potluck', {
    potLuckId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME
    },
    endTime: {
      type: DataTypes.TIME
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eventURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    staticURL: {
      type: DataTypes.STRING,
      allowNull : false
    }
  }, {
    timestamps: false
  });
  return PotLuck;
};
