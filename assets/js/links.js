// Create variables to make <li> and variables to refer to the input fields
var linkInput = $('#linkInput');
var nameInput = $('#nameInput');
var linksBtn = $("#linksBtn");
var linksList = $("#linksList");
var linksRemoverA = $("#linksRemoverA");
var linksRemoverB = $("#linksRemoverB");
// var lsLinks = JSON.parse(localStorage.getItem("links"));

// Add an event listener to the add button, which takes value from link and name input fields, save to localStorage, apply to <li> variable
linksBtn.on("click", linkMaker)
linksRemoverA.on("click", theLinksRemover);
linksRemoverB.on("click", theLinksRemover);


function appendLinks() {
  console.log('appendlinks has fired')
  let setUpLinks = JSON.parse(localStorage.getItem("links"));
  if (setUpLinks.links.length <= 0) {
    placeholderItems()
  }
  console.log(setUpLinks.links.length);
  for (i = 0; i < setUpLinks.links.length; i++) {
    var linksListEl = $('<li>');
    var linksAnchor = $("<a class='scroll linksLi' href='" + setUpLinks.links[i] + "' target='_blank'>");
    linksAnchor.text(setUpLinks.links[i]);
    linksList.append(linksListEl);
    linksListEl.append(linksAnchor);
  }
}

function linkMaker() {
  let lsLinks = JSON.parse(localStorage.getItem('links'))
  var linksInputAnchor = $("<a class='scroll linksLi'>");
  var linksListInputEl = $('<li>');
  linksInputAnchor.text(linkInput.val());
  linksList.append(linksListInputEl);
  linksListInputEl.append(linksInputAnchor);
  console.log(lsLinks)
  lsLinks.links.push(linkInput.val());
  localStorage.setItem("links", JSON.stringify(lsLinks));
  linkInput.val('')
  packLinks();

}

function packLinks() {
  var packedLinks = {
    links: []
  }
  let lsLinks = JSON.parse(localStorage.getItem('links'))
  console.log(lsLinks)
  let setUpLinks = lsLinks.links
  console.log(setUpLinks)
  for (let i = 0; i < lsLinks.links.length; i++) {
    packedLinks.links.push(setUpLinks[i])
  }
  console.log(packedLinks)
  sendLinksToFS(packedLinks)
}

function sendLinksToFS(packedLinks) {
  var userID = auth.currentUser.uid;
  console.log(packedLinks)
  console.log(userID)
  let uiddocRef = fireStore.collection('users').doc(userID);
  uiddocRef.set({
    'links': packedLinks
  }, {
    merge: true
  });
  uiddocRef.get('links').then((doc) => {
    console.log(doc.data())
  });
}


// TODO: localStorage removals
function theLinksRemover() {
  var theLinks = $(".linksLi");
  let lsLinks = JSON.parse(localStorage.getItem('links'))
  lsLinksLinks = lsLinks.links;
  if ($(this).attr("class") == "fullRemover") {
    // Remove Loop
    for (var i = 0; i < theLinks.length; i++) {
      theLinks[i].remove();
      lsLinks.pop();
      localStorage.setItem("links", JSON.stringify(lsLinks));
    }
  } else if ($(this).attr("class") == "lastRemover") {
    var i = theLinks.length - 1;
    theLinks[i].remove();
    lsLinksLinks.pop();
    localStorage.setItem("links", JSON.stringify(lsLinks));
  }
  packLinks();
}

// On page load, add the values from localStorage to <li>s and add them (hidden) to the <ul>