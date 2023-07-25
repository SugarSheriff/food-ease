//API call for cocktail commented out so we dont use to many while setting everything else up
// var name = 'bloody mary'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/cocktail?name=' + name,
//     headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// })


//API call for food commented out so that we dont use api calls while working out rest of page
// var query = 'italian wedding soup'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/recipe?query=' + query,
//     headers: { 'X-Api-Key': '09nNnsjpkRmZ89Iq9Ihe7g==AjT05Ms9KWvG9vkG'},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });

//Dropdown click functionality on saved recipes
$(document).ready(function() {
    $('.recipe-title').click(function() {
      $(this).siblings('.recipe-content').slideToggle();
    });
  });