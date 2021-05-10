/*initialize materialize components*/
M.AutoInit();
$(document).ready(function() {
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true
    });
});
/*Carousel Buttons*/
$('#nxtBtn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#carouselFirst').carousel('next');
});
$('#prvBtn').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#carouselFirst').carousel('prev');
});




/*User Login Form*/
//Stores CodeSnippets and Bookmarks to localStorage.
var userList = [{
        username: "loriculberson",
        password: "Password1",
        userSettingsSync: 1,
    }, {
        username: "patcorcoran",
        password: "123456",
        userSettingsSync: 2,

    }, {
        username: "test",
        password: "test",
        UserSettingssync: 3,

    },

];
console.log(userList);


function check(form) /*function to check userid & password*/ {

    /*the following code checkes whether the entered userid and password are matching*/
    if (form.useridinput.value == userList.indexof(username) && form.userpassinput.value == userList.indexof(password)) {
        window.open('index.html') /*opens the target page while Id & password matches*/

        /* Get userSettings from localStorage*/

        /* Load userSettings to correct HTML elements*/

        // initialize();
    } else {
        console.log(userList[i].username, userList[i].password)
        alert("Error Password or Username ") /*displays error message*/
    }
}

/*CDNJS Variables*/
var cdnjsBaseUrl = 'https://api.cdnjs.com/libraries'
var cdnjsSearch = '?search=' + cdnjsUserInput
var cdnjsUserInput = $('#cdnjsUserInput').val();