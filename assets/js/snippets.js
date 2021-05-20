$(function() {
  //process contents of snippets
  $("pre.snippet").each(function() {

    //get contents of <pre> and create list and container
    var currentItem = $(this);
    var contents = (currentItem.text().indexOf("\n") != -1) ? currentItem.text().split("\n") : currentItem.text().split("\r")
    var list = $("<ul>");
    var container = $("<div>").addClass("snippet-container").insertBefore(currentItem.prev());

    //remove original contents and wrap in container
    $(this).text("").prev().andSelf().appendTo(container);

    //normalize height
    (currentItem.height() > 0) ? list.css("marginTop", -16): null;

    //create list item
    $.each(contents, function(i, val) {

      //create list item and inner p
      var li = $("<li>").appendTo(list),
        p = $("<p>").text(val).appendTo(li);

      //add stripe class
      (i % 2 === 0) ? li.addClass("stripe"): li.addClass("unstripe");
    });

    list.appendTo(currentItem);
  });
});

var snippetsFormEl = $('#snippets-form');
var snippetsListEl = $('#snippets-list');
var snipTitle = $('#input-title');
var snipInput = $('#input-snippet');

var enterBtn = $("#enter-btn");

enterBtn.on('click', function() {
  if (snipTitle.val() == '' || snipInput.val() == '') {
    console.log(snipTitle.value)
    console.log(snipInput.value)
    var errMessage = "We couldn't save that one.";
    $('#modal-error').modal('open');
    $('#errmsg').text(errMessage);
    $('#posSolution').text('Try typing something . . . you dunce.');
  } else {
    var codeResult = $('<div> <pre class="snippet"><strong>' + snipTitle.val() + ': </strong><br/>' + snipInput.val() + '</pre></div>');
    var codeHTML = codeResult.innerHTML;
    var removeBtn = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
    snippetsListEl.append(codeResult);
    snippetsListEl.append(removeBtn);
    snipTitleVal = snipTitle.val();
    snipInputVal = snipInput.val();
    var storedSnips = localStorage.setItem("stored-snips", JSON.stringify({
      snippets: [
        snipTitleVal,
        snipInputVal
      ]
    }));


  }
})

function appendlsSnips() {
  console.log('appendlsSnips has fired')
  var storedSnips = JSON.parse(localStorage.getItem("ls-snippets"));
  for (var i = 0, n = 1; i < storedSnips.snippets.length; i += 2, n += 2) {
    var codeResultForLoop = $('<div> <pre class="snippet"><strong>' + storedSnips.snippets[i] + ': </strong><br/>' + storedSnips.snippets[n] + '</pre></div>');
    var codeHTMLForLoop = codeResultForLoop.innerHTML;
    var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
    snippetsListEl.append(codeResultForLoop);
    snippetsListEl.append(removeBtnForLoop);
    // console.log('stored snipTitles ', storedSnips.snippetText, 'stored snippets', storedSnips.snippetTitle);
  }
}


function appendfsSnips(fsSnips) {
  console.log('appendfsSnips has fired')
  for (var i = 0, n = 1; i <= fsSnips.snippets.length; i += 2, n += 2) {
    console.log(i)
    console.log(n)
    var codeResultForLoop = $('<div> <pre class="snippet"><strong>' + fsSnips.snippets[i] + ': </strong><br/>' + fsSnips.snippets[n] + '</pre></div>');
    var codeHTMLForLoop = codeResultForLoop.innerHTML;
    var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
    snippetsListEl.append(codeResultForLoop);
    snippetsListEl.append(removeBtnForLoop);
  };


}