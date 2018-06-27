
module.exports = {
  up: function (queryInterface, Sequelize) {

    // Add seeded userypes to database (note that the date needs to be manually added here)
    return queryInterface.bulkInsert('UserType', [
      {userType: "User"},
      {userType: "Admin"},
      {userType: "Super Admin"}
    ], {});

  },

  down: function (queryInterface, Sequelize) {

    // Remove the userypes burgers (note the "{truncate: true}", which resets the primary keys)
    return queryInterface.bulkDelete('UserType', null, {truncate : true});

  }

};
