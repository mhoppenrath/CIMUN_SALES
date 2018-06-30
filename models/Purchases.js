'use strict';

// the Pruchase model store what has been baought
module.exports = function(sequelize, DataTypes) {
  var Purchases = sequelize.define('Purchases', {
    purchase_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    quanity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false,
    },
    picked_up: {
      type: DataTypes.INTEGER,
      default: 0,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
  return Purchases;
};
