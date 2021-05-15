// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAhr03GPm1oGzx4AJstN4C9NFzCOT_kPIg",
    authDomain: "bootcampbox-1c031.firebaseapp.com",
    projectId: "bootcampbox-1c031",
    storageBucket: "bootcampbox-1c031.appspot.com",
    messagingSenderId: "449681568493",
    appId: "1:449681568493:web:80039cb38640d7430152e4",
    measurementId: "G-NSKYB1SJ9P"
};


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

//Nav navTabs
$('#navCdnjs').on('click', function() {
    $('#workspace').children().hide();
    $('#cdnjs').show();
    $('#cdnjs').addClass('active');

})
$('#navDash').on('click', function() {
    $('#workspace').children().hide();
    $('#dash').show();

})

/* Auth0 Attempt*/
// Initializing our Auth0Lock
var lock = new Auth0Lock(
    'aafb51ab4f2b54c77dd1',
    '2f6f1d731bd224129d6cb63e79a2dd0885a6d76e'
);
var Auth = (function() {

    var wm = new WeakMap();
    var privateStore = {};
    var lock;

    function Auth() {
        this.lock = new Auth0Lock(
            'aafb51ab4f2b54c77dd1',
            'https://bootcampbox.us.auth0.com/authorize'
        );
        wm.set(privateStore, {
            appName: "BootCampBox"
        });
    }

    Auth.prototype.getProfile = function() {
        return wm.get(privateStore).profile;
    };

    Auth.prototype.authn = function() {
        // Listening for the authenticated event
        this.lock.on("authenticated", function(authResult) {
            // Use the token in authResult to getUserInfo() and save it if necessary
            this.getUserInfo(authResult.accessToken, function(error, profile) {
                if (error) {
                    // Handle error
                    return;
                }

                //we recommend not storing Access Tokens unless absolutely necessary
                wm.set(privateStore, {
                    accessToken: authResult.accessToken
                });

                wm.set(privateStore, {
                    profile: profile
                });

            });
        });
    };
    return Auth;
}());

document.getElementById('btn-login').addEventListener('click', function() {
    lock.show();
});
// function check(form) /*function to check userid & password*/ {

//     /*the following code checkes whether the entered userid and password are matching*/
//     if (form.useridinput.value == userList.indexof(username) && form.userpassinput.value == userList.indexof(password)) {
//         window.open('index.html') /*opens the target page while Id & password matches*/

//         /* Get userSettings from localStorage*/

//         /* Load userSettings to correct HTML elements*/

//         // initialize();
//     } else {

//         alert("Error Password or Username ") /*displays error message*/
//     }
// }


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