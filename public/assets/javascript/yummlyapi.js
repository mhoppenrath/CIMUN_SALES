//cartoon button array
var recipeArray = ["Desserts", "Appetizers", "Main Dishes", "Drinks", "Finger Foods", "Salads", "Cocktails"];

$(document).ready(function() {
    for (var i = 0; i < recipeArray.length; i++) {
        $("#recipe-buttons").append("<button type='button' onclick='searchRecipe(\"" + recipeArray[i] + "\")' class='btn btn-primary' value=' " + recipeArray[i] + "'> " + recipeArray[i] + " </button>");
    }
});

//function for button clicks
function recipeButtonClicked() {
    var userInput = $('#recipe-input').val();
    searchRecipe(userInput);
}

function submitButtonClicked() {
    var userInput = $('#recipe-input').val();

    if (userInput) {
        $('#recipe-buttons').append("<button type='button' onclick='searchRecipe(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

//yummly api
function searchRecipe(recipeName) {
    $.ajax({
            url: 'https://api.yummly.com/v1 ' + recipeName + ' &api_key=804bf153b296471ae0644f4264ff3970',
            type: 'GET',
        })
        .done(function(response) {
            displayRecipe(response);
        })
}

//had to steal this. honestly still don't understand how it works
function displayRecipe(response) {
    $('#recipes').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';

        image = '<div class="col-md-4">' + image + "</div>";
        $('#recipes').append(image);
    }

    //animate gif when clicked
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}