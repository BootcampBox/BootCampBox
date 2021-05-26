// Create variables to make <li> and variables to refer to the input fields
var linkInput = $('#linkInput');
var nameInput = $('#nameInput');
var linksBtn = $("#linksBtn");
var linksList = $("#linksList");
var linksRemoverA = $("#linksRemoverA");
var linksRemoverB = $("#linksRemoverB");

// Add an event listener to the add button, which takes value from link and name input fields, save to localStorage, apply to <li> variable
linksBtn.on("click", linkMaker)
linksRemoverA.on("click", theLinksRemover);
linksRemoverB.on("click", theLinksRemover);


function appendLinks(setUpLinks) {
  console.log('appendlinks has fired')
  var lsLinks = localStorage.getItem("links")
  console.log(setUpLinks);
  for (i = 0; i < setUpLinks.length; i++) {
    var linksListEl = $('<li>');
    var linksAnchor = $("<a class='scroll linksLi'>");
    linksAnchor.text(lsLinks.links[i]);
    linksList.append(linksListEl);
    linksListEl.append(linksAnchor);
  }
}

function linkMaker() {
  var linksInputAnchor = $("<a class='scroll linksLi'>");
  var linksListInputEl = $('<li>');
  linksInputAnchor.text(linkInput.val());
  linksList.append(linksListInputEl);
  linksListInputEl.append(linksInputAnchor);
  console.log(lsLinks.links);
  lsLinks.links.push(linkInput.val());
  localStorage.setItem("links", JSON.stringify(lsLinks));
  console.log(lsLinks);
  linkInput.val("");
  localStorage.setItem("links", JSON.stringify(lsLinks));
}

// TODO: localStorage removals
function theLinksRemover() {
  var theLinks = $(".linksLi");
  var lsLinks = JSON.parse(localStorage.getItem("links"));
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
}

// On page load, add the values from localStorage to <li>s and add them (hidden) to the <ul>
// if (!localStorage.getItem("stored-links") == null || localStorage.getItem("stored-links") == undefined) {
//   localStorage.setItem("stored-links", JSON.stringify({
//     links: [
//       "https://github.com/public-apis/public-apis",
//       "https://unicode.org/emoji/charts/full-emoji-list.html",
//       "https://www.w3schools.com/",
//       "https://developer.mozilla.org/en-US/",
//       "https://devhints.io/",
//       "https://jquery.com/download/"
//     ]
//   }));
// }
// console.log(localStorage.getItem("stored-links"));



// function restoreLinks() {
//     for (i = 0; i < lsLinks.links.length; i++) {
//         var linksListEl = $('<li>');
//         var linksAnchor = $("<a class='scroll linksLi'>");
//         linksAnchor.text(lsLinks.links[i]);
//         linksList.append(linksListEl);
//         linksListEl.append(linksAnchor);
//     }
// }