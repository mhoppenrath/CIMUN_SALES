
module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded categories to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('Product', [
      {product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "Small", active_id: 1},
      {product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "Medium", active_id: 1},
      {product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "Large", active_id: 1},
      {product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "X-Large", active_id: 1},
    ], {});
  },

  down: function (queryInterface, Sequelize) {

    // Remove the categories (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('category', null, {truncate : true});

  }
