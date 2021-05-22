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

// var lsLinks = JSON.parse(localStorage.getItem("stored-links"));

function appendlsLinks(lsLinks) {
    console.log('appendlslinks has fired')
    var lsLinks = JSON.parse(localStorage.getItem("stored-links"))
    console.log(lsLinks);
    for (i = 0; i < lsLinks.links.length; i++) {
        var linksListEl = $('<li>');
        var linksAnchor = $("<a class='scroll linksLi'>");
        linksAnchor.text(lsLinks.links[i]);
        linksList.append(linksListEl);
        linksListEl.append(linksAnchor);
    }
}

function appendfsLinks(fsLinks) {
    console.log('appendfslinks has fired');
    var fsLinks = JSON.parse(localStorage.getItem("fs-links"));
    for (var i = 0; i < fsLinks.links.length; i++) {
        var linksListEl = $('<li>');
        var linksAnchor = $("<a class='scroll linksLi'>");
        linksAnchor.text(fsLinks.links[i]);
        console.log(fsLinks.links[i]);
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
    localStorage.setItem("stored-links", JSON.stringify(lsLinks));
    console.log(lsLinks);
    linkInput.val("");
    localStorage.setItem("stored-links", JSON.stringify(lsLinks));
}

// TODO: localStorage removals
function theLinksRemover() {
  var theLinks = $("#linksList");
  console.log(theLinks)
  var lsLinks = JSON.parse(localStorage.getItem("stored-links"));
  if ($(this).attr("class") == "fullRemover") {   
      // Remove Loop
      for (var i = 0; i < theLinks.length; i++) {
          theLinks[i].remove();
          lsLinks.pop();
          localStorage.setItem("stored-links", JSON.stringify(lsLinks));
        }
  } else if ($(this).attr("class") == "lastRemover") {
      var i = theLinks.length - 1;
      theLinks[i].remove();
      lsLinks.pop();
      localStorage.setItem("stored-links", JSON.stringify(lsLinks));
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