$(function(){
var searchBar = $('#main-search');
var savedData;

function displayFoodResults(item){
  window.location.href = 'results.html';// switch to results page
  var data = JSON.parse(localStorage.getItem(`${item}Result`));//use template literal to parse out localstorage based on firstword
  console.log(data[0].title);//log for testing
}


//food button click functionality
function foodButton(query){
//API call for food commented out so that we dont use api calls while working out rest of page
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
function drinkButton(data){
    var name = searchBar.val();
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/cocktail?name=' + name,
        headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
        contentType: 'application/json',
        success: function(data) { 
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


//Dropdown click functionality on saved recipes
$(document).ready(function() {
  $('.recipe-title').click(function() {
    $(this).siblings('.recipe-content').slideToggle();
  });
});

//This is the are for events
$('#search-food').on('click',foodButton)
$('#search-drink').on('click',drinkButton)
})
