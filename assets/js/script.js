// Setup Materialize Components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

/*************************************************************************\
 **** Appending the DOM with info from Firestore on login******************\
 *** IF YOU SEE SOMETHING I'M FORGETTING PLEASE ADD THE PSEUDOCODE FOR IT**\
 **************************************************************************/
// const userDBget
const accountDetails = $('.account-details');

const setupUI = function(user) {
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
        <p><span>Username:</span>${doc.data().username}</p>
        <p><span>Email:</span>${user.email}</p>
        </div>`;
            accountDetails.append(userInfo);
        });
    } else {
        //hide account info
        accountDetails.innerHTML = '';
        $('.logged-in').hide();
        $('.logged-out').show();
        $('#greeting').hide();
    };

}

//Calendar Events(?)

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

//Code Snippets
const setupSnips = function(data) {
    data.forEach(function(doc) {
        const codesnip = doc.data();
        // Create template for how to handle data as it returns
        const li = `<pre class="snippet"
        </li>`;
        html += li;
        console.log(codesnip)
    })
}

// //Set Snippets to firestore
// const snipRef = fireStore.collection('codesnippets')
// snipRef.doc(`${newSnip.title}`).set({
//         title: newBook.title,
//         snippet: newBook.snippet,
//     }).then(function(docRef) {
//         console.log("Document successfully written!");
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });


//Nav navTabs
$('#navDash').on('click', function() {
    $('#workspace').children().hide();
    $('#dash').show();

})
$('#navLinks').on('click', function() {
    $('#workspace').children().hide();
    $('#links').show();

})
$('#navSlack').on('click', function() {
    $('#workspace').children().hide();
    $('#slack').show();

})
$('#navNotion').on('click', function() {
    $('#workspace').children().hide();
    $('#Notion').show();

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
    console.log(dayList.length);
    for (var i = 0; i < dayList.length; i++) {
        console.log(dayList[i]);
        var dayStorage = dayList[i].id;
        var setEventText = localStorage.getItem(dayStorage);
        console.log(setEventText);
        $(`#${dayStorage}`).val(setEventText);
    };
})