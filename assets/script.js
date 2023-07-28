$(function(){
  //this is the area to declare globals
var searchBar = $('#main-search');
var displayResults = $('#displayResult');

//this is the area to write any funcitons

function displayFoodResults(item){
  console.log(item);
  window.location.href = 'results.html';// switch to results page
  var data = JSON.parse(localStorage.getItem(`${item}Result`));//use template literal to parse out localstorage based on firstword
  console.log(data);//log for testing
}

function saveItemToSavedRecipes (event){ // Event that when save is clicked on a generated recipe it saves to localstorage then brings you to the saved recipe page
  var btnClicked = $(event.target);// get the button that was targeted
  var parentDiv = btnClicked.parent('div'); //get parent div of target
  //get the text from all three items and save to variable
  var recipeName = parentDiv.children('.card-title').text();
  var recipeInstructions = parentDiv.children('.card-instrutions').text();
  var recipeIngriedents = parentDiv.children('.card-ingredients').text();

  //create a new object with text of the div it was pulled from
  var savedRecipe = {
    name: recipeName,
    instructions: recipeInstructions,
    ingriedents: recipeIngriedents
  };

  if (localStorage.getItem('savedRecipes') === null)// if this is the first time a recipe is being saved in a browser or a clear has happened run this
  {
    var savedRecipeArr = [savedRecipe];//create new array to save into local storage
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipeArr));
  }
  else //if there is already stuff saved into local storage run this
  {
    var addRecipe = JSON.parse(localStorage.getItem('savedRecipes')); //pull array from local storage
    addRecipe.push(savedRecipe); //add the newly saved recipe onto the end of the array 
    localStorage.setItem('savedRecipes', JSON.stringify(addRecipe));//re save with new recipe in array
  }

  setTimeout(function(){//using timeout to make sure and get data from api before the page is redirected
    window.location.href = 'savedrecipes.html';//redirect user to saved recipes
  }, 1000);
}

//food button click functionality
function foodButton(e){
//API call for food commented out so that we dont use api calls while working out rest of page
  e.preventDefault();
  var query = searchBar.val();

  $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
    headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
    contentType: 'application/json',
    success: function(result) {
      localStorage.setItem('foodResult', JSON.stringify(result));
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
  });
  
  setTimeout(function(){//using timeout to make sure and get data from api before the page is redirected
    displayFoodResults('food');
  }, 1000);
  }

//drink button click functionality
function drinkButton(e){
    e.preventDefault();
    var name = searchBar.val();

    $.ajax({
        method: 'GET',
        url: url,
        headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
        contentType: 'application/json',
        success: function(result) { 
          localStorage.setItem('drinkResult', JSON.stringify(result));
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });

   setTimeout(function(){//using timeout to make sure and get data from api before the page is redirected
      displayFoodResults('drink');
    }, 1000);
  }


// //Dropdown click for burger//
// const burgerIcon = document.querySelector('#burger');
// const navbarMenu = document.querySelector('#nav-links');

// burgerIcon.addEventListener('click', () => {
//   navbarMenu.classList.toggle('is-active')
// })

//Dropdown click functionality on saved recipes
$(document).ready(function() {
  $('.recipe-title').click(function() {
    $(this).siblings('.recipe-content').slideToggle();
  });
});

//This is the area for events
$('#search-food').on('click',foodButton)
$('#search-drink').on('click',drinkButton)
displayResults.on('click', '.saveBTN', saveItemToSavedRecipes);
})
