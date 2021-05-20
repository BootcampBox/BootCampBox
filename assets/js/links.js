// Create variables to make <li> and variables to refer to the input fields
var linkInput = $('#linkInput');
var nameInput = $('#nameInput');
var linksBtn = $("#linksBtn");
var linksList = $("#linksList");
// Add an event listener to the add button, which takes value from link and name input fields, save to localStorage, apply to <li> variable
linksBtn.on("click", linkMaker)


function linkMaker(user) {
  var linksInputAnchor = $("<a class='scroll linksLi'>");
  var linksListInputEl = $('<li>');
  linksInputAnchor.text(linkInput.val());
  linksList.append(linksListInputEl);
  linksListInputEl.append(linksInputAnchor);
  storedLinks.links.push(linkInput.val());
  localStorage.setItem("stored-links", JSON.stringify(storedLinks));
  console.log(storedLinks);
  linkInput.val("");
  localStorage.setItem("stored-links", JSON.stringify(storedLinks));
}
// On page load, add the values from localStorage to <li>s and add them (hidden) to the <ul>
if (!localStorage.getItem("stored-links") == null || localStorage.getItem("stored-links") == undefined) {
  localStorage.setItem("stored-links", JSON.stringify({
    links: [
      "https://github.com/public-apis/public-apis",
      "https://unicode.org/emoji/charts/full-emoji-list.html",
      "https://www.w3schools.com/",
      "https://developer.mozilla.org/en-US/",
      "https://devhints.io/",
      "https://jquery.com/download/"
    ]
  }));
  fsLinks();
}
console.log(localStorage.getItem("stored-links"));
var storedLinks = JSON.parse(localStorage.getItem("stored-links"));

function restoreLinks() {

  for (i = 0; i < storedLinks.links.length; i++) {
    var linksListEl = $('<li>');
    var linksAnchor = $("<a class='scroll linksLi'>");
    linksAnchor.text(storedLinks.links[i]);
    linksList.append(linksListEl);
    linksListEl.append(linksAnchor);
  }
}