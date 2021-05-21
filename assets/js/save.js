// Saving data

$('#saveBtn').on('click', function(user) {
    console.log('save fired')
    var user = firebase.auth().currentUser;
    console.log(user)
    fireStore.collection('users').doc(user.uid).get().then((doc) => {
        console.log(doc.data().snippets);
    })
    var mon = localStorage.getItem('Monday')
    var tue = localStorage.getItem('Tuesday')
    var wed = localStorage.getItem('Wednesday')
    var thu = localStorage.getItem('Thursday')
    var fri = localStorage.getItem('Friday')
    var sat = localStorage.getItem('Saturday')
    var sun = localStorage.getItem('Sunday')
    var calendar_LS = [{
        mon
    }, {
        tue
    }, {
        wed
    }, {
        thu
    }, {
        fri
    }, {
        sat
    }, {
        sun
    }]
    console.log(calendar_LS)
    var snips_LS = localStorage.getItem('stored-snips');
    // var snipI_LS = localStorage.getItem('Local Snippets Inputs');

    var links_LS = localStorage.getItem('stored-links');
    // User is signed in. uid is now available to use
    fireStore.collection('users')
        .doc(user.uid)
        .set({
            snippets: snips_LS,

            links: links_LS
        }, { merge: true });
    console.log(fireStore.collection('users').doc(user.uid));
});