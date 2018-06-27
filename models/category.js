
'use strict';

// the User type table is a pre genderated table that is used as a reference on other tables
module.exports = function(sequelize, DataTypes) {

  var Category = sequelize.define('category', {
    categoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
      type:DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  return Category;
};
