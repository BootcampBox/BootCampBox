// Saving data

$('#saveBtn').on('click', function(user) {
    var user = firebase.auth().currentUser;
    console.log(user);
    var snips_LS = localStorage.getItem('stored-snips');
    // var snipI_LS = localStorage.getItem('Local Snippets Inputs');
    var links_LS = localStorage.getItem('stored-links');
    // User is signed in. uid is now available to use
    fireStore.collection('users')
        .doc(user.uid)
        .update({
            snippets: snips_LS,

            links: links_LS
        }, {
            merge: true
        });
    console.log(fireStore.collection('users').doc(user.uid));
});