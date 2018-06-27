//dependency
var path = require("path");
var dbMethod = require("../controllers/dbMethod.js")
//routes
module.exports = function(app) {
	app.get("/", function(request, result) {
		result.sendFile(path.join(__dirname + "/../public/index.html"));
		consule.log("going to /")
	});


/////////////////////////////////////////////////////////////////////////////
//                      Read Methods                                      //
////////////////////////////////////////////////////////////////////////////

////////////Profile Pages//////////////////////////////////////////////////

		//the page for a profile with no data
		app.get("/profile", function(request, result) {
			result.sendFile(path.join(__dirname + "/../public/profile.html"));
		});

		//login to the page from the profile page
		app.get("/profile/login/:fbId", function(req, res) {
			//need to get name from fb
			var name = "test"
			dbMethod.loginNTest(req.params.fbId,name);
			var id = req.params.id
			res.redirect('/profile/'+id);
		});

		//loads the page at a specific profile ID which is gotten when you write now we should run a script to check if we have oath
		app.get("/profile/:id", function(req, res) {
			var object = dbMethod.userEvents(req.params.fbId);
			//sends the json to the handlebars page
		});

//////////Event Pages//////////////////////////////////////////////////////

	//the lading page for an unspeciffied event page
	app.get("/event", function(request, result) {
		result.sendFile(path.join(__dirname + "/../public/event.html"));
	});

	//login function from the event page it redirects to an empty event page
	app.get("/event/login/:fbId", function(req, res) {
		//need to get name from fb
		var name = "test"
		dbMethod.loginNTest(req.params.fbId,name);
		var id = req.params.id
		res.redirect('/event');
	});

	//pulls a specific event ID
	app.get("/event/:eventID/", function(req, res) {
		var eventDetails = dbMethod.potLuckDetails(req.params.eventID);
		var eventDetails = dbMethod.potLuckItems(req.params.eventID);
		//send the two obejcts to an event page
	});

	//pulls a specific event ID with a fb ID and grants admin privliage
	app.get("/event/:eventID/:fbId", function(req, res,next) {
		var adminTest = false;
		//tests for admin status
		adminTest = dbMethod.adminTest(req.params.fbID, req.params.eventID);
		var eventDetails = dbMethod.potLuckDetails(req.params.eventID);
		var eventItems = dbMethod.potLuckItems(req.params.eventID);
		//send the two obejcts to an event page
	});

	//login from a specifc event page
	app.get("/event/:eventID/login/:fbId", function(req, res,next) {
		//need to get name from fb
		var name = "test"
		dbMethod.loginNTest(req.params.fbId,name);
		res.redirect('/event'+req.params.eventID+"/"+req.params.fbId);
	});

/////////////////////////////////////////////////////////////////////////
//                        Update Methods                              //
////////////////////////////////////////////////////////////////////////

	///////////////////// Updates an Event///////////////////////
	app.post("/event/:eventId/update", function(req,res,next) {
		dbMethod.updateEvent(req.params.eventId, req.body);
		res.redirect("/event/"+req.params.eventId);
	});
	/////////////////////Updates an Item///////////////////////
	app.post("/event/:eventID/:itemId/update", function(req,res,next){
		dbMethod.updateItem(req.params.itemID, req.body);
		res.redirect("/event/"+req.params.eventId);
	});
/////////////////////////////////////////////////////////////////////////
//                        Create Methods                            //
////////////////////////////////////////////////////////////////////////

	///////////////////// Creates an Event///////////////////////
	app.post("/event/create/:fbId", function(req,res) {
		dbMethod.createEvent(req.body,req.params.fbId)
			.then(function(plID){
				res.redirect("/event/"+plID);
			});
	});
	/////////////////////Creates a New Item///////////////////////
	app.post("/event/:eventId/item/create", function(req,res) {
		dbMethod.create(req.body,req.params.eventId)
		.then(function(plID){
			res.redirect("/event/"+plID);
		});
	})
/////////////////////////////////////////////////////////////////////////
//                        Delete Methods                              //
////////////////////////////////////////////////////////////////////////
		//destroys the user
	 app.get("/destroy/:fbID", function(req,res) {
		 dbMethod.deleteUser(req.params.fbID);
		 res.redirect("/index");
	 });
	 ////////////Destroys a Specific event
	 app.get("/destroy/:eventID", function(req,res) {
		 dbMethod.deleteEvent(req.params.eventID);
		 res.redirect("/profile");
	 });
	 ////Destroys a specific Item
	 app.get("/destroy/:eventId/:itemID", function(req,res) {
		 dbMethod.deleteItem(req.params.itemID);
		 res.redirect("/event/"+req.params.eventID);
	 });

	 //removes
	 app.get("/destroy/:fbID/:eventID", function(req,res){
		 dbMethod.removeFromEvent(req.params.fbID,req.params.eventID);
		 res.redirect("/profile")
	 })
}
