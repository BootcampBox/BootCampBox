// Setup Materialize Components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

function placeholderItems() {
    var linksCheck = localStorage.getItem('stored-links');
    if (linksCheck == null) {
        console.log('LocalStorage was Empty')
        localStorage.setItem('stored-links', JSON.stringify({
            links: [
                "https://github.com/public-apis/public-apis",
                "https://unicode.org/emoji/charts/full-emoji-list.html",
                "https://www.w3schools.com/",
            ]
        }))
    }
    if (localStorage.getItem('ls-snippets') == null) {
        localStorage.setItem('ls-snippets', JSON.stringify({
            snippets: [
                'This is a snippet Title saved in localStorage:',
                'This is a snippet. Saved to localStorage whenever you click save'
            ]
        }));
    }
    if (localStorage.getItem('fs-snippets') == null || localStorage.getItem('fs-snippets') == '') {
        localStorage.setItem('fs-snippets', JSON.stringify({
            snippets: [
                'This is a snippet Title saved with FireStore:',
                'This is a snippet, now you try! Click Save.'
            ]
        }));
    }
};

/*************************************************************************\
 **** Appending the DOM with info from Firestore on login******************\
 *** IF YOU SEE SOMETHING I'M FORGETTING PLEASE ADD THE PSEUDOCODE FOR IT**\
 **************************************************************************/
// const userDBget
const accountDetails = $('.account-details');

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

            // setupLinks(user)
        });
    }
    setupData(user);
}

function setupData(user) {
    console.log('setupData has fired');
    //Go retireve the user data from Firestore
    fireStore.collection('users').doc(user.uid).get().then(function(doc) {
        //If there is user data proceeed
        if (doc.exists) {
            console.log(doc.data())
            localStorage.setItem('fs-snippets', doc.data().snippets)
            localStorage.setItem('fs-links', doc.data().links)
            console.log(doc.data().links)
                //If not, don't.
        } else {
            console.log('No such Document');
        }
        /*After the above function has fired, invoke next function.
        This prevents items from coming back as null or undefined
        if it takes longer than expected to get the data back.*/
    }).then(function() {
        restoreData(user)
    });
}
//Runs through the different functions and appends correlating items to the page.
function restoreData(user) {
    console.log('restoreData has fired')
        //Create local variables for each local storage key
    var lsSnips = JSON.parse(localStorage.getItem("ls-snippets"));
    var fsSnips = JSON.parse(localStorage.getItem("fs-snippets"));
    var lsLinks = JSON.parse(localStorage.getItem("stored-links"))
    var fsLinks = JSON.parse(localStorage.getItem("fs-links"));
    console.log('fsLinks=', fsLinks);
    console.log('lsLinks=', lsLinks);
    console.log('fsSnips=', fsSnips);
    console.log('lsSnips=', lsSnips);
    //If the item is not empty, append the contents to the page
    if (fsLinks.links.length >= 0) {
        appendfsLinks(fsLinks);
    }
    //If the item is not empty, append the contents to the page
    if (fsLinks.links.length == undefined) {
        window.reload();
        setupData();
    }
    //If the item is not empty, append the contents to the page
    if (lsLinks.length >= 0 && lsLinks != null) {
        appendlsLinks(lsLinks);
    }
    //If the item is not empty, append the contents to the page
    if (!fsSnips) {
        placeholderItems();
    } else if (fsSnips.snippets.length >= 0 && fsSnips.snippets != null) {
        appendfsSnips(fsSnips);
    }
    //If the item is not empty, append the contents to the page
    if (lsSnips.snippets.length >= 0) {
        appendlsSnips(lsSnips);
    }
}

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
    };
})