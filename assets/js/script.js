// Setup Materialize Components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});

/*************************************************************************\
 **** Appending the DOM with info from Firestore on login******************\
 *** IF YOU SEE SOMETHING I'M FORGETTING PLEASE ADD THE PSEUDOCODE FOR IT**\
 **************************************************************************/


//Calendar Events(?)

//Links


//Code Snippets
const setupSnips = (data) => {
    var html = '';
    data.forEach(doc => {
        const codesnip = doc.data();
        // Create template for how to handle data as it returns
        const li = `<li>
        <div class="collapsible-header grey lighten-4">${codesnip.title}</div>
        <div class="collapsible-body white">${codesnip.snippet}</div>
        </li>`
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
$('#navCdnjs').on('click', function() {
    $('#workspace').children().hide();
    $('#cdnjs').show();
    $('#cdnjs').addClass('active');

})
$('#navDash').on('click', function() {
    $('#workspace').children().hide();
    $('#dash').show();

})
$('#navLinks').on('click', function() {
    $('#workspace').children().hide();
    $('#links').show();

})

//close modal if popped 
$('#modal-cdnjs--close').on('click', function() {
        $('#modal-cdnjs').hide();
    })
    //CDNJS Search Button and Results Parsing
var nameListItemEl;
var cdnListEl;
var cdnOlEl = $('#cdnjsResults ol');
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
                $('#modal-cdnjs').show();
            } else {

                cdnOlEl.addClass('scroll')
                    //Iterate through response data
                for (var x = 0; x < response.results.length; x++) {
                    var respName = response.results[x].name;
                    var respUrl = response.results[x].latest;
                    //create a list item for each name result
                    nameListItemEl = $('<li class="resultLi">' + respName + '</li>');
                    //creat a list item for each url 
                    cdnListEl = $('<li class="cdnLi"><a href="' + respUrl + '">' + respUrl + '</a></li>')
                        //append them to the page
                    cdnOlEl.append(nameListItemEl);
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
    // Create variables to make <li> and variables to refer to the input fields
var linksListEl = $('<li>');
var linksAnchor = $("<a class='scroll linksLi'>")
var linkInput = $('#linkInput');
var nameInput = $('#nameInput');
var linksBtn = $("#linksBtn");
var linksList = $("#linksList");
// Add an event listener to the add button, which takes value from link and name input fields, save to localStorage, apply to <li> variable
linksBtn.on("click", linkMaker)

function linkMaker() {
    // TODO: Add name addition functionality
    // for localStorage, use numbers for the name of the variables so you can iterate thru with a for loop and backtick syntax
    console.log(linkInput.val());
    localStorage.setItem("links", linkInput.val());
    linksAnchor.text(linkInput.val());
    // Append <li> to <ul>
    linksList.append(linksListEl);
    linksListEl.append(linksAnchor);

}
// On page load, add the values from localStorage to <li>s and add them (hidden) to the <ul>
var storedLinks = localStorage.getItem("links");
console.log(storedLinks);
var storedLinksAnchor = $("<a class='scroll linksLi'>")
linksList.append(linksListEl);
storedLinksAnchor.text(storedLinks);
linksListEl.append(storedLinksAnchor);



// When the user clicks the Links nav item, populate the page with the standard elements as well as the <li>s with localStorage values if they arent already appended