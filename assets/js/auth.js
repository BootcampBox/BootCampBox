//Listen for login state changes
auth.onAuthStateChanged(function(user) {
  //Get Data
  if (user) {
    if (localStorage.getItem('ls-snippets') == null) {
      localStorage.setItem('ls-snippets', JSON.stringify({
        snippets: [
          'This is a snippet Title saved in localStorage:',
          'This is a snippet. Saved to localStorage whenever you click save'
        ]
      }));
    }
    if (localStorage.getItem('stored-links') == null) {
      console.log('LocalStorage was Empty')
      localStorage.setItem('stored-links', JSON.stringify({
        links: [
          "https://github.com/public-apis/public-apis",
          "https://unicode.org/emoji/charts/full-emoji-list.html",
          "https://www.w3schools.com/",
        ]
      }))
    }
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
  };
  console.log('user logged out');
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
    return cred.user.updateProfile({
      displayName: username
    });
  }).then(function() {
    placeholderItems();
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