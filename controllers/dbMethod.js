var db = require('../models');

var methods = {

//////////////////////////////////////////////////////////////////////////////
//                        For Intializing the Sequelize                     //
//////////////////////////////////////////////////////////////////////////////
    //creates the assocations necessary to conenct all the tables in the db
    associate : function () {
      db.Users.hasMany(db.Purchases, {foreignKey: 'user_id', sourceKey: 'user_id', onDelete: 'cascade'});
      db.Purchases.belongsTo(db.Users, {foreginKey:'user_id', sourceKey: 'user_id'});

      db.Store.hasMany(db.Purchases, {foreignKey: 'product_id', sourceKey: 'product_id', onDelete: 'cascade'});
      db.Purchases.belongsTo(db.Store, {foreignKey: 'product_id', sourceKey: 'product_id'});
    },


    initTables : function(){
      //makes the initial table and craetes the models for the store and the user model
      db.Store.create({product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "Small", active_id: 1});
      db.Store.create({product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "Medium", active_id: 1});
      db.Store.create({product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "Large", active_id: 1});
      db.Store.create({product: "CIMUN Shirt", product_meaning: "SHIRT_XIV", cost: 10, variation: "X-large", active_id: 1});
    },

    //for future confrences use the confrence to disgiguish the item, though we will indicate on the Purchases table when they bought it, this lets us track iff we sell
    //thigs in diffrent years
    initDummies : function(){


      db.Users.create({date: 08-16-2018, first_name: "Elliot", last_name: "Young", email: "ImaMonkey@aol.com", school: "None"});

      db.Purchases.create({user_id: 1, product_id: 2, quanity: 30, paid: 0, picked_up: 0})

    },
//////////////////////////////////////////////////////////////////////////////
//                        Testing and Random Generator                      //
//////////////////////////////////////////////////////////////////////////////
    //createss a random string to make as the id for the the evnts
    makeid : function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },



    //tests if a user is admin of an event and if they are it returns true
    adminTest : function(userID,eventID) {
      db.userPotluck.findAll({
        where: {
          userId: req.params.userID,
          potLuckId: req.params.eventID
        }
      }).then(function(data){
            if (data.userTypeId >= 2) {
              return true;
            }
            else {
              return false;
            }
        });
    },

//////////////////////////////////////////////////////////////////////////////
//                        Creation Events                                   //
//////////////////////////////////////////////////////////////////////////////
    //creates the User/Purchase in one go based on a sumbission object that gets posted from the front
    createUserPurchase : function(submission, id) {
      var  text,
            test,
            plID;
      //creates the entry for user if not allready in the system
      db.User.findAll({
        where: {
          first_name: submission.fist_name,
          last_name: submission.last_name,
          email: submission.last_name,
          school:submission.school
        }}).then(function(data){
          if (data.user_id != null) {
            db.User.create({
              date : submission.date,
              first_name:submission.first_name,
              last_name: submission.last_name,
              email: submission.email,
              school: submission.school,
            });
          }
        });

      //get's the Uer_id of our person
      db.User.findAll({
        where : {
          first_name: submission.fist_name,
          last_name: submission.last_name,
          email: submission.last_name,
          school:submission.school
        }}).then(function(data){
          var user_object = { potluck: data };
          user_id = data.user_id;
        });
      //creates the relivent entries on the Purchase table
      for (var i = 0; i < Purchases.length(); i++)
        db.Store.findAll({
          where: {
            first_name: submission.fist_name,
            last_name: submission.last_name,
            email: submission.last_name,
            school:submission.school
          }}).then(function(data){
              db.Prucheses.create({
                date : submission.date,
                user_id: user_id,
                product_id: data.product_id,
                quanity: submission.quanity,
                paid: submission.paid
              });
        });
    },

    //adds an item to the store.
    addItem : function(submission) {
      db.Store.create({
        product: submission.product,
        product_meaning: submission.product, //string method
        cost: submission.cost,
      });
    },

//////////////////////////////////////////////////////////////////////////////
//                        Reading events                                    //
//////////////////////////////////////////////////////////////////////////////

    Store: function(){
      // Sequelize Query to get all burgers from database (and join them to their devourers, if applicable)
      db.Store.findAll({
      }).then(function(data){
        var storeItems = { Store: data };
        return StoreItems;
      });
    },
//////////////////////////////////////////////////////////////////////////////
//                        Update Event                                      //
//////////////////////////////////////////////////////////////////////////////

    //meanings are ment to be unmutable so don't screw with that unless your editing in mySQL workench
    updateStore: function(product_id, object){
      db.Store.update({
        product: object.product,
        cost: object.cost,
        variantion: object.variation,
        active_id: object.active_id
      }, {
        where: { product_id: product_id},
      });
    },
//////////////////////////////////////////////////////////////////////////////
//                       Delete Event                                       //
/////////////////////////////////////////////////////////////////////////////

};


module.exports = methods;
