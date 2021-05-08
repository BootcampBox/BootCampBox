/*initialize materialize components*/
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});


/*CDNJS Variables*/
var cdnjsBaseUrl = 'https://api.cdnjs.com/libraries'
var cdnjsSearch = '?search=' + cdnjsUserInput
var cdnjsUserInput = $('#cdnjsUserInput').val()