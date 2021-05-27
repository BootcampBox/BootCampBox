// const userDBget
const accountDetails = $('.account-details');
var userID
//Listen for login state changes
auth.onAuthStateChanged(function(user) {

  //Get Data
  if (user) {
    localStorage.setItem('UID', user.uid);
    var tempSnip = {
      snippets: []
    };
    localStorage.setItem('snippets', JSON.stringify(tempSnip));
    userID = localStorage.getItem('UID')
    fireStore.collection('users').doc(userID.snippets).get().then((snapshot) => {
      console.log(snapshot);
    })
    setupUI(user);
    console.log('user logged in: ', user.email);
    console.log('uid is: ', user.uid);

  } else {
    //hide account info
    accountDetails.innerHTML = '';
    $('.logged-in').hide();
    $('.logged-out').show();
    $('#greeting').hide();
    $('#emailDisplay').text('');
    $('#snippets-list').children().remove();
    localStorage.clear();
    console.log('user logged out');
  };
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const username = signupForm['signup-user'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    userID = cred.user.uid;
    console.log(cred.user.uid)
    return cred.user.updateProfile({
      displayName: username
    })
  }).then(function() {
    placeholderItems();
  }).then(function() {
    fireStore.collection('users').doc(userID).set({
      username: username,
      snippets: '',
      links: '',
    })

    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  })
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', function(e) {
  e.preventDefault();
  $('#linksList').children().remove();
  auth.signOut();
})

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred => {
    console.log(cred.user)
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }), function(error) {
    var errMessage = error.message;
    $('#modal-error').modal('open');
    $('#modal-login').modal('close');
    $('#errmsg').text(errMessage);
    $('#posSolution').html('Try using the <a href="#signup-form">Sign Up</a> option.');

    console.log(errMessage)
  })

});