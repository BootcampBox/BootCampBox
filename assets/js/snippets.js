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
var snipLocalStoreTitle = [];
var snipLocalStoreText = [];
var snipTitle = $('#input-title');
var snipInput = $('#input-snippet');

var enterBtn = $("#enter-btn");

enterBtn.on('click', function() {
    if (snipTitle.val() == '' || snipInput.val() == '') {
        var errMessage = "We couldn't save that one.";
        $('#modal-error').modal('open');
        $('#errmsg').text(errMessage);
        $('#posSolution').text('Try typing something . . . you dunce.');
        console.log(errMessage)
    } else {
        var codeResult = $('<pre class="snippet"><strong>' + snipTitle.val() + ': </strong><br/>' + snipInput.val() + '</pre>');
        snippetsListEl.append(codeResult);
        snipLocalStoreTitle.push(snipTitle.val());
        snipLocalStoreText.push(snipInput.val());
        localStorage.setItem('Local Snippets Titles', snipLocalStoreTitle);
        localStorage.setItem('Local Snippets Inputs', snipLocalStoreText);
        console.log(snipTitle.val());
        console.log(snipInput.val());
    }
    snipTitle.val('');
    snipInput.val('');
})