
module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded categories to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('category', [
      {category: "Appetizers"},
      {category: "Entrees"},
      {category: "Desserts"},
      {category: "Drinks"},
      {category: "Other"}
    ], {});
  },

  down: function (queryInterface, Sequelize) {

    // Remove the categories (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('category', null, {truncate : true});

  }

};
