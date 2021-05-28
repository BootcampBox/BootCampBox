console.log('script.js fired')
    //config variables
const FB_apiKey = config.apiKey,
    FB_authDomain = config.authDomain,
    FB_databaseURL = config.databaseURL,
    FB_projectId = config.projectId,
    FB_storageBucket = config.storageBucket,
    FB_messagingSenderId = config.FB_messagingSenderId,
    FB_appId = config.appId,
    FB_measurementId = config.measurementId;

// Setup Materialize Components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

//global remove from array function
Array.prototype.remove = function(value) {
    const index = this.findIndex(obj => obj[key] === value);
    return index >= 0 ? [
        ...this.slice(0, index),
        ...this.slice(index + 1)
    ] : this;
};

//Declare Storage Items
const snippetsGet = localStorage.getItem("snippets");
const linksGet = localStorage.getItem("links");

function placeholderItems() {
    if (!linksGet.links || linksGet.links == '') {
        console.log('LocalStorage was Empty')
        localStorage.setItem('links', JSON.stringify({
            links: [
                "https://github.com/public-apis/public-apis",
                "https://unicode.org/emoji/charts/full-emoji-list.html",
                "https://www.w3schools.com/"
            ]
        }))
    }
    // if (localStorage.getItem('snippets') == null || localStorage.getItem('snippets') == '') {
    //     localStorage.setItem('snippets', {
    //         snippets: [
    //             'This is a snippet Title saved in localStorage:',
    //             'This is a snippet. Saved to localStorage whenever you click save'
    //         ]
    //     })

    // };
    appendLinks()
}
/*************************************************************************\
 **** Appending the DOM with info from Firestore on login******************\
 *** IF YOU SEE SOMETHING I'M FORGETTING PLEASE ADD THE PSEUDOCODE FOR IT**\
 **************************************************************************/





//Toggle UI based on signed in state
function setupUI(user) {
    console.log('setupUI Fired');
    if (user) {
        //toggle UI elements
        $('.logged-in').show();
        $('.logged-out').hide();
        $('#greeting').show();
        $('#emailDisplay').text(user.email);
        //account info
        fireStore.collection('users').doc(user.uid).get().then(function(doc) {
            const userInfo = `
          <div id="acctInfoEl">
          <p><span>Username:</span>${user.displayName}</p>
          <p><span>Email:</span>${user.email}</p>
          </div>`;
            accountDetails.append(userInfo);
        });
    }
    setupData(user);
}

var snipObj = {
    snippets: []
}
var linkObj = { links: [] }

function setupData(user) {
    console.log('setupData has fired');
    console.log(user.uid);
    let userDocRef = fireStore.collection('users').doc(user.uid)
        //Go retireve the user data from Firestore
    userDocRef.get('snippets').then((doc) => {
        console.log(doc.data().snippets)
            //If there is user data proceeed
        if (doc.exists && doc.data() != null) {
            for (var i = 0; i < doc.data().snippets.snippets.length; i++) {
                snipObj.snippets.push(doc.data().snippets.snippets[i])
            }
            console.log(snipObj)
            let setUpSnips = JSON.stringify(snipObj)
            console.log('setUpSnips=', setUpSnips)
            localStorage.setItem('snippets', setUpSnips)

            // var setUpLinks = {
            //   links: JSON.stringify([doc.data().links])
            // }
            //
            // localStorage.setItem('links', JSON.parse(setUpLinks))

            appendSnips();
            // appendLinks(setUpLinks);
            //If not, don't.
        } else {
            console.log('No such Document');
        }
        /*After the above function has fired, invoke next function.
        This prevents items from coming back as null or undefined
        if it takes longer than expected to get the data back.*/
    })
    userDocRef.get('links').then((doc) => {
        console.log(doc.data())
        if (doc.exists && doc.data() != null) {
            for (var i = 0; i < doc.data().links.links.length; i++) {
                linkObj.links.push(doc.data().links.links[i])
            }
            console.log(linkObj)
                // let setUpLinks = JSON.stringify(linkObj)
                // console.log('setUpLinks =', setUpLinks)
            localStorage.setItem('links', JSON.stringify(linkObj));
            appendLinks(linkObj)

        }
    })
};




/*****************************/
/********END UI SCRIPTS*******\
/*****************************/


//Calendar Events(?)
var now = dayjs()
console.log(dayjs(now).format('dddd'))

//LinksClock

var renderClock = function() {
    $("#currentTime").text(dayjs().format("h:mm a"));
    var now = dayjs().format("dddd, MMM / D / YYYY");
    $("#currentDay").text(now)
}

//Render clock every second
$(function() {
    setInterval(renderClock, 1000);
});
//Nav navTabs
$('#navDash').on('click', function() {
    $('#workspace').children().hide();
    $('#dash').show();

})

$('#navGit').on('click', function() {
    $('#workspace').children().hide();
    $('#git').show();

})

$('#navCdnjs').on('click', function() {
    $('#workspace').children().hide();
    $('#cdnjs').show();
})

$('#navCal').on('click', function() {
    $('#workspace').children().hide();
    $('#calendar').show();
})

//close modal if popped
$('#modal-cdnjs--close').on('click', function() {
    $('#cdnjsInput').val('');
    $('#modal-cdnjs').modal('close');
});

// Week Planner

function getEventText() {
    var eventText = $(this).next(".inputField").val();
    console.log($(this).next(".inputField").attr("id"))
    var eventID = $(this).next(".inputField").attr("id");
    localStorage.setItem(eventID, eventText);
}
$('.saveBtn').on('click', getEventText);
$(function() {
    var dayList = $(".inputField");
    // console.log(dayList.length);
    for (var i = 0; i < dayList.length; i++) {
        // console.log(dayList[i]);
        var dayStorage = dayList[i].id;
        var setEventText = localStorage.getItem(dayStorage);
        // console.log(setEventText);
        $(`#${dayStorage}`).val(setEventText);
    }
})

$("#clearBtn").on("click", function() {
    var dayList = $(".inputField");
    console.log(dayList);
    for (var i = 0; i < dayList.length; i++) {
        console.log(dayList[i]);
        console.log(`${dayList[i].id}`);
        $(`#${dayList[i].id}`).val("");
        localStorage.removeItem(`${dayList[i].id}`)
    }
});