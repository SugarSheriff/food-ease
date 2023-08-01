$(function(){
  //this is the area to declare globals
var searchBar = $('#main-search');
var displayResults = $('#displayResult');



function displayFoodResults(){ //functions to display recipes to HTML

  var foodData = JSON.parse(localStorage.getItem('foodResult')); 

  var drinkData = JSON.parse(localStorage.getItem('drinkResult'));

 var data;
 if (foodData && foodData.length > 0){data=foodData}
 else if (drinkData && drinkData.length > 0){data=drinkData} 
 
  var resultsContainer = $('#displayResult');
  resultsContainer.empty();
  if (data && data.length > 0) { 
    // function to dynamically add the container and the styling to the HTML
    data.forEach(function(recipe) {
      if (recipe.name){var titleName = `<h1 class="title has-text-weight-bold card-title">${recipe.name}
      </h1>`} else { var titleName = //displays recipe name and makes sure both food and drink pages create content
        `<h1 class="title has-text-weight-bold card-title">${recipe.title} 
        </h1>`}
        //displays recipe instructions and ingredients for both food and drinks pages
      var displayRecipeHTML = `
      <div class="card recipe-card mt-5">
        <div class="card-content"> `+ titleName +`
          <p class="subtitle card-instrutions">${recipe.instructions}</p> 
          <p class="card-ingredients">${recipe.ingredients}</p>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item has-text-black saveBTN">Save</a>
          <a class="card-footer-item has-text-black removeBTN">Remove</a>
        </footer>
      `;
      resultsContainer.append(displayRecipeHTML);
    });
  } else {
      // If no saved recipes found, display a message
      resultsContainer.append('<p id="noRecipes"></p>');
  }
}

function saveItemToSavedRecipes (event){ // Event that when save is clicked on a generated recipe it saves to localstorage then brings you to the saved recipe page
  var btnClicked = $(event.target);// get the button that was targeted
  var parentDiv = btnClicked.parent('footer').parent('div'); //get parent div of target
  var cardContainer = parentDiv.children('.card-content');

  //get the text from all three items and save to variable
  var recipeName = cardContainer.children('.card-title').text();
  var recipeInstructions = cardContainer.children('.card-instrutions').text();
  var recipeIngriedents = cardContainer.children('.card-ingredients').text();

  //create a new object with text of the div it was pulled from
  var savedRecipe = {
    name: recipeName,
    instructions: recipeInstructions,
    ingredients: recipeIngriedents
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
  localStorage.removeItem('foodResult');
  localStorage.removeItem('drinkResult');
  var query = searchBar.val();
  var url = 'https://api.api-ninjas.com/v1/recipe?query=' + query;

  $.ajax({
    method: 'GET',
    url: url,
    headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
    contentType: 'application/json',
    success: function(result) {
      localStorage.setItem('foodResult', "");
      localStorage.setItem('foodResult', JSON.stringify(result));
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
  });
  setTimeout(function(){//using timeout to make sure and get data from api before the page is redirected
    if (!(localStorage.getItem('foodResult') === '[]'))
    {
      window.location.href = 'results.html';
  } else {
    $('#noResult').removeAttr('hidden');
  } //redirect user to saved recipes
  }, 1000);

  }

//drink button click functionality
function drinkButton(e){
    e.preventDefault();
    localStorage.removeItem('drinkResult');
    localStorage.removeItem('foodResult');
    var name = searchBar.val();
    var url = 'https://api.api-ninjas.com/v1/cocktail?name=' + name;

    $.ajax({
        method: 'GET',
        url: url,
        headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
        contentType: 'application/json',
        success: function(result) { 
          localStorage.setItem('drinkResult', "");
          localStorage.setItem('drinkResult', JSON.stringify(result));
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
    setTimeout(function(){
      if (!(localStorage.getItem('drinkResult') === '[]'))
      {
        window.location.href = 'results.html';
    } else {
      $('#noResult').removeAttr('hidden');
    }//using timeout to make sure and get data from api before the page is redirected
      //redirect user to saved recipes
    }, 1000);
  
  }


//Dropdown click for burger//
const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');

burgerIcon.addEventListener('click', () => {
  navbarMenu.classList.toggle('is-active')
})

//Dropdown click functionality on saved recipes
$(document).ready(function() {
  $('.recipe-title').click(function() {
    $(this).siblings('.recipe-content').slideToggle();
  });
});

//Function to remove a recipe from the results page when displayed
function removeRecipeFromList(e){ 
  var btnClicked = $(e.target);
  var parentDiv = btnClicked.parent('footer').parent('div');//getting which div was targeted
  parentDiv.remove();//Removing that div
}

//This is the area for events
$('#search-food').on('click',foodButton)
$('#search-drink').on('click',drinkButton)
displayFoodResults();
displayResults.on('click', '.saveBTN', saveItemToSavedRecipes);
displayResults.on('click', '.removeBTN', removeRecipeFromList);
displaySavedRecipes();


  //Function to display saved recipes from local storage
  function displaySavedRecipes() {
    var savedRecipes = JSON.parse(localStorage.getItem('savedRecipes'));
    var container = $('#recipeDisplay');
    container.empty();

    if (savedRecipes && savedRecipes.length > 0) {
        savedRecipes.forEach(function(recipe, index) {
          var recipeHTML = `
            <div class="recipe mt-5">
              <h2 class="recipe-title">${recipe.name}</h2>
              <span class="bulma-arrow-mixin">▼</span>
              <div class="recipe-content">
                <h3>Ingredients:</h3>
                <p>${recipe.ingredients}</p>
                <h3>Instructions:</h3>
                <p>${recipe.instructions}</p>
              </div>
            </div>
          `;
          container.append(recipeHTML);
      });
    } 
    else {
      //If no saved recipes found, display a message
      container.append('<p id="noRecipes">No saved recipes yet.</p>');
    }

  }
  // Function to handle the "Clear Saved Recipes" button click
  function clearSavedRecipes() {
    localStorage.removeItem('savedRecipes');
    displaySavedRecipes();
  }

  // Attach click event handler for the "Clear Saved Recipes" button
  $('#clearButton').on('click', clearSavedRecipes);

  // Function to handle tab functionality
  function openTab(event, tabName) {
    var tabContents = $('.tab-content');
    var tabButtons = $('.tab-button');
    
    tabContents.hide();
    tabButtons.removeClass('active');

    $('#' + tabName).show();
    $(event.target).addClass('active');
  }

});


//Outside of jquery so that onclick html attribute can be used
function openTab(evt, tabName) {

  const tabContents = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContents.length; i++) {
      tabContents[i].style.display = "none";
  }

  const tabButtons = document.getElementsByClassName("tab-button");
  for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

// Add event listener to clear button
const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", function () {
  // Clear saved recipes from local storage
  localStorage.removeItem("savedRecipes");
  // Reload the page to reflect the changes
  window.location.reload();
});
