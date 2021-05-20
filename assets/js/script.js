($(function() {
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
}))
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
        var fsLinks = JSON.parse(localStorage.getItem("fs-links"));
        for (i = 0; i < fsLinks.links.length; i++) {
            var linksListEl = $('<li>');
            var linksAnchor = $("<a class='scroll linksLi'>");
            linksAnchor.text(fsLinks.links[i]);
            linksList.append(linksListEl);
            linksListEl.append(linksAnchor);
        };
        console.log(user.uid);

        restoreLinks();
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
            },
            function(err) {
                console.log(err);
            })
    } else {
        //hide account info
        accountDetails.innerHTML = '';
        $('.logged-in').hide();
        $('.logged-out').show();
        $('#greeting').hide();
    };

}

const setupData = function(user) {
    fireStore.collection('users').doc(user.uid).get().then(function(doc) {
        if (doc.exists) {
            console.log(doc.data())
            localStorage.setItem('fs-snippets', doc.data().snippets)
                // console.log(doc.data().snippets[0])
                // localStorage.setItem('Local Snippets Inputs', doc.data().snippets[1])
                // console.log(doc.data().snippets[1])
            localStorage.setItem('fs-links', doc.data().links)
            console.log(doc.data().links)
        } else {
            console.log('No such Document');
        }
        // localStorage.setItem('stored-links', user.uid.links);
        // localStorage.setItem('Local Snippets Titles', );
        // localStorage.setItem('Local Snippets Inputs', uid.snippets[1]);
    })
}

//Calendar Events(?)
var now = dayjs()
console.log(dayjs(now).format('dddd'))

//Links


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
    $('#links').show();

})

$('#navNotion').on('click', function() {
    $('#workspace').children().hide();
    $('#Notion').show();

})

$('#navCdnjs').on('click', function() {
    $('#workspace').children().hide();
    $('#cdnjs').show();
})

$('#navLinks').on('click', function() {
    $('#workspace').children().hide();
    $('#links').show();
})

//close modal if popped
$('#modal-cdnjs--close').on('click', function() {
    $('#cdnjsInput').val('');
    $('#modal-cdnjs').modal('close');
})