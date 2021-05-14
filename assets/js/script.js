/*initialize materialize components*/
/*Archived Carousel Parts
// $(document).ready(function() {
//     M.AutoInit();

//     $('.carousel').carousel().height(650);
//     $('.carousel.carousel-slider').carousel({
//         fullWidth: true,
//         indicators: true
//     });
// });
// $('#snips').on('click', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $('#carouselFirst').carousel('#four!');
// });
// /*Carousel Buttons*/
// $('#nxtBtn').on('click', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $('#carouselFirst').carousel('next');
// });
// $('#prvBtn').on('click', function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $('#carouselFirst').carousel('prev');
// });

// // Google Sign-in
// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// } { /* <a href="#" onclick="signOut();">Sign out</a> */ }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function() {
//         console.log('User signed out.');
//     });
// }



/*User Login Form*/
// Stores CodeSnippets and Bookmarks to localStorage.
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

        alert("Error Password or Username ") /*displays error message*/
    }
}


//close modal if popped 
$('.modal-close').on('click', function() {
        $('.modal').hide();
    })
    //CDNJS Search Button and Results Parsing
var nameListItemEl;
var cdnListEl;
var olEl = $('#cdnjsResults ol');
$('#cdnjsBtn').on('click', function() {
    /*CDNJS Variables*/
    var cdnjsBaseUrl = 'https://api.cdnjs.com/libraries';
    var cdnjsInput = $('#cdnjsInput').val();
    var searchAdd = '?search=' + cdnjsInput;
    $('ol li').remove();

    console.log(cdnjsBaseUrl + searchAdd)
    $.ajax({
        url: cdnjsBaseUrl + searchAdd,
        method: 'GET',
    }).then(function(response) {

        if (response.results.length == 0) {
            console.log('Nothing in response ')
            $('.modal').show();
        } else {

            olEl.addClass('scroll')
                //Iterate through response data
            for (var x = 0; x < response.results.length; x++) {
                var respName = response.results[x].name;
                var respUrl = response.results[x].latest;
                //create a list item for each name result
                nameListItemEl = $('<li class="resultLi">' + respName + '</li>');
                //creat a list item for each url 
                cdnListEl = $('<li class="cdnLi"><a href="' + respUrl + '">' + respUrl + '</a></li>')
                    //append them to the page
                olEl.append(nameListItemEl);
                nameListItemEl.append(cdnListEl);
            }
            /*Not Working yet, revisit
          cdnListEl.on('click', function() {
                console.log(this, 'has been clicked')
                $(this).val().select();
                document.execCommand("copy");
            })*/

        }

    });
})