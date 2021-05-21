// Create variables to make <li> and variables to refer to the input fields
var linkInput = $('#linkInput');
var nameInput = $('#nameInput');
var linksBtn = $("#linksBtn");
var linksList = $("#linksList");
// Add an event listener to the add button, which takes value from link and name input fields, save to localStorage, apply to <li> variable
linksBtn.on("click", linkMaker)

// var lsLinks = JSON.parse(localStorage.getItem("stored-links"));

function appendlsLinks(lsLinks) {
    console.log('appendlslinks has fired')
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

function linkMaker(user) {
    var linksInputAnchor = $("<a class='scroll linksLi'>");
    var linksListInputEl = $('<li>');
    linksInputAnchor.text(linkInput.val());
    linksList.append(linksListInputEl);
    linksListInputEl.append(linksInputAnchor);
    lsLinks.links.push(linkInput.val());
    localStorage.setItem("stored-links", JSON.stringify(lsLinks));
    console.log(lsLinks);
    linkInput.val("");
    localStorage.setItem("stored-links", JSON.stringify(lsLinks));
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