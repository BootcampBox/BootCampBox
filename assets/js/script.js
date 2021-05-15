// Setup Materialize Components
document.addEventListener('DOMContentLoaded', function() {
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
});
//Firestore 
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


//Set Snippets to firestore
const snipRef = fireStore.collection('codesnippets')
snipRef.doc(`${newSnip.title}`).set({
        title: newBook.title,
        snippet: newBook.snippet,
    }).then(function(docRef) {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
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

//close modal if popped 
$('#modal-cdnjs--close').on('click', function() {
        $('#modal-cdnjs').hide();
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
            $('#modal-cdnjs').show();
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