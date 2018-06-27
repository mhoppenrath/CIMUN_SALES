var db = require('../models');

var methods = {

//////////////////////////////////////////////////////////////////////////////
//                        For Intializing the Sequelize                     //
//////////////////////////////////////////////////////////////////////////////
    //creates the assocations necessary to conenct all the tables in the db
    associate : function () {
      //user table has many in the potluck users
      db.user.hasMany(db.userPotluck, {as: 'UserPotluck', foreignKey: 'userId', sourceKey: 'userId', onDelete: 'cascade'});
      db.userPotluck.belongsTo(db.user,{as: 'UserPotluck', foreignKey: 'userId', sourceKey: 'userId'});

      //user types to userPotluck
      db.userType.hasMany(db.userPotluck, {as: 'UserType', foreignKey: 'userTypeId', sourceKey: 'userTypeId', onDelete: 'cascade'});
      db.userPotluck.belongsTo(db.userType, {as: 'UserType', foreignKey: 'userTypeId', sourceKey: 'userTypeId'});

      //potluck to user potlucks
      db.potluck.hasMany(db.userPotluck, {foreignKey: 'potLuckId', sourceKey: 'potLuckId', onDelete: 'cascade'});
      db.userPotluck.belongsTo(db.potluck, {foreignKey: 'potLuckId', sourceKey: 'potLuckId'});

      //potlucks to potLuckItems
      db.potluck.hasMany(db.item, {foreignKey: 'potLuckId', sourceKey: 'potLuckId', onDelete: 'cascade'});
      db.item.belongsTo(db.potluck, {foreignKey: 'potLuckId', sourceKey: 'potLuckId'});

      //category to potLuckItems
      db.category.hasMany(db.item, {foreignKey: 'categoryId', sourceKey: 'categoryId', onDelete: 'cascade'});
      db.item.belongsTo(db.category, {foreignKey: 'categoryId', sourceKey: 'categoryId'});
    },


    initTables : function(){
      //makes the initial table and makes sure it is the only stuff for it for both User type and categories


      db.userType.create({userType: "User"});
      db.userType.create({userType: "Admin"});
      db.userType.create({userType: "SuperAdmin"});

      db.category.create({category: "Appetizers"});
      db.category.create({category: "Entrees"});
      db.category.create({category: "Desserts"});
      db.category.create({category: "Drinks"});
      db.category.create({category: "Other"});

    },

    initDummies : function(){
      db.user.create({fbID:"65498138498466", name:"Chad Mc'Irishman"});
      db.user.create({fbID:"56486159844887", name:"Michael Von Germanboy"});
      db.user.create({fbID:"56198465167986", name:"Rebecca IDK"});

      db.potluck.create({date: 12-16-2017,startTime:"17:00",endTime:"22:00",location:"The Castle",eventURL:"Coolio.com",phone:9999999999,email:"McHop@yahoo.com",details:"a Rager to end all rages",staticURL:"af5e4wa9f8as1d5"});

      db.item.create({assigned:"Rebbecca",item_name:"Quiche",notes:null,potLuckId: 1,categoryID:1})
      db.item.create({assigned:"Michael",item_name:"Beer",notes:"None of the Cheap stuff",potLuckId: 1,categoryID:4})
      db.item.create({assigned:"Chad",item_name:"Bacon",notes:"BAAAAACCCCCCCOOOOOONNNN",potLuckId: 1,categoryID:2})

      db.userPotluck.create({userId:1,userTypeId:1,potLuckId:1});
      db.userPotluck.create({userId:2,userTypeId:2,potLuckId:1});
      db.userPotluck.create({userId:3,userTypeId:1,potLuckId:1});
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

    //takes the User token from the Facebook Oath, tests the token in the db, and if it does not exist it creates an entry in our database
    loginNTest : function(userID, thisName) {
      var test = db.user.count({ where: { fbID: userID } })
      if (test === 0) {
        db.user.create({
          fbID: userID,
          name: thisName
        });
      }
      return fbID;
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
    //creates an event based on a sumbission object that gets posted from the front
    createEvent : function(submission, id) {
      var  text,
            test,
            plID;
    //tests to be sure that the "static" id hasn't been used before
      do {

        text = makeid();
        test = db.potluck.count({ where: { staticURL: text } })
      } while (test != 0);
      //creates the entry for the potluck
      db.potlucks.create({
        date : submission.date,
        startTime:submission.startTime,
        endTime: submission.endTime,
        location: submission.location,
        phone: submission.Phone,
        email: submission.email,
        details: submission.details,
        staticURL: text
      });
      //finds the ID of the entry we just submitted
      db.potlucks.findAll({
        where : {
          staticURL: staticURL
        }}).then(function(data){
          var userObject = { potluck: data };
          plID = data.potLuckId;
        });
      //creates an entry onto the userPotluck tablewith the new potluck id and other relevent info
      db.userpotluck.create({
        userTypeId: 2,
        userId: id,
        potLuckId: plID
      });
      return plID;
    },
    //Creates a non Admin user to the table (currently the same as before but hopefully we can authenticate it)
    addUserPotluck : function(UId,PLId){
      db.userPotluck.create({
        userType: 1,
        userId: UId,
        potLuckId: PLId
      });
    },

    //adds an item to the table.
    addItem : function(submission, PlID) {
      db.Item.create({
        assigned: submission.assigned,
        item_name: submission.item_name,
        notes: sumbission.notes,
        potLuckId: plID
      });
    },

//////////////////////////////////////////////////////////////////////////////
//                        Reading events                                    //
//////////////////////////////////////////////////////////////////////////////

    userEvents: function(fbID){
      // Sequelize Query to get all burgers from database (and join them to their devourers, if applicable)
      db.UserPotluck.findAll({
        where : {
          fbID: fbID
        },
        include: [{model: models.potluck}]
      }).then(function(data){
        var userObject = { potluck: data };
        return userObject;
      });
    },
    //pulls specifically the details for the potluck itself
    potLuckDetails : function(potLuckID) {
      db.potluck.findAll({
        where: {
          potLuckId : potLuckID
        }
      }).then(function(data) {
        var potluckObject = data;
        return potluckObject;
      })
    },
    //pulls the item details of the potluck
    potLuckItems: function(potLuckId){
      db.items.finalAll({
        where :{
          potLuckId:potLuckId
        }.then(function(data){
          var potluckItem = {items: data};
          return potluckItem
        })
      })
    },
//////////////////////////////////////////////////////////////////////////////
//                        Update Event                                      //
//////////////////////////////////////////////////////////////////////////////

    updateEvent: function(eventID, object){
      db.potlucks.update({
        date: object.date,
        startTime: object.startTime,
        endTime: object.endTime,
        location: object.location,
        eventURL: object.eventURL,
        phone: object.phone,
        emial: object.email,
        details: object.details
      }, {
        where: { potLuckId: eventID},
      });
    },
    updateItem: function(itemID,object){
      db.items.update({
        assigned: object.assigned,
        item_name: object.item_name,
        notes: object.notes,
        categoryId: object.categoryId
      }, {
        where : {itemID:itemID}
      });
    },
//////////////////////////////////////////////////////////////////////////////
//                       Delete Event                                       //
/////////////////////////////////////////////////////////////////////////////
    deleteUser: function(fbID) {
    },
    removeFromEvent: function (fbID) {

    },
    deleteEvent: function(eventID) {
    },
    deleteItem: function(itemID) {
    }
};


module.exports = methods;
