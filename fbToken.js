//sets up the Facebook NPM
var FB = require('fb');
    //a constructor if we need options (probabily the permisions)
    fb = new FB.Facebook();
    //the object that holds all of the specific info
    var fbInfo;


//This is to test login status
var checkLoginState = {

  login : function() {
        FB.login(function(response) {
            if (response.authResponse) {
             console.log('Welcome!  Fetching your information.... ');
             FB.api('/me', function(response) {
               console.log('Good to see you, ' + response.name + '.');
             });
            } else {
             console.log('User cancelled login or did not fully authorize.');
            }
        });
  },
  //This is to test login status
  loginTest : function() {
    //built in function to test if we are connected
    FB.getLoginStatus(function(response) {
      //if it's connected it will respond with the accessToken in the console (might need to mover this to the server)
      if (response.status === 'connected') {
          console.log(response.authResponse.accessToken);
        }
    });
  },
  //identify the user
  identify : function() {
    //makes a call to the api for the me object displays only the the name and id
    FB.api('/me', function(response) {
    console.log(JSON.stringify(response));
    });
    },
    //this pulls the opbject with the user's specs
    fbInfo : function() {
      FB.api(
        //pulls the facebook id and name
        '/me',
        'GET',
        //api call to id and name
        {"fields":"id,name"},
        function(response) {
          //stores the response as an object
          var randoInfo = response;
        }
      );
    }
};
