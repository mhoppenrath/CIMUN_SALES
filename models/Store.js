
'use strict';

// the Product type table is a pre genderated table that is used as a reference on other tables
module.exports = function(sequelize, DataTypes){
  var Store = sequelize.define('Store', {
    product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product: {
      type: DataTypes.STRING,
      allowNull: false
    },
    product_meaning:{
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    //diffrent Sizes/variations need an entry for each product
    variation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    active_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  return Store;
};
