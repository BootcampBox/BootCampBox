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


var snipArray = [];
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
        snipArray.push(snipTitle.val(), snipInput.val());

        localStorage.setItem("ls-snippets", JSON.stringify({
            snippets: [
                snipArray
            ]
        }));
        snipTitle.val("");
        snipInput.val("");

    }
})

function appendlsSnips() {
    console.log('appendlsSnips has fired')
    var lsSnips = JSON.parse(localStorage.getItem("ls-snippets"));
    for (var i = 0; i < lsSnips.snippets.length; i++) {
        if (i === 0) {
            // Do the first name at index 0
            var snipsTitle = lsSnips.snippets[i]
            console.log(snipsTitle);
        } else if (i % 2 === 0) {
            // Do the even number one, concatenating to the previous
            snipsTitle = lsSnips.snippets[i]
            console.log(lsSnips.snippets[i]);
        } else {
            //  Do the odd number one
            var snipsText = lsSnips.snippets[i]
            console.log(snipsText);
        };
        console.log(i % 2);
        var codeResultForLoop = $('<div> <pre class="snippet"><strong>' + snipsTitle + ': </strong><br/>' + snipsText + '</pre></div>');
        var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
        snippetsListEl.append(codeResultForLoop);
        snippetsListEl.append(removeBtnForLoop);
        // console.log('stored snipTitles ', storedSnips.snippetText, 'stored snippets', storedSnips.snippetTitle);
    }
}

function appendfsSnips(fsSnips) {
    console.log('appendfsSnips has fired')
    for (var i = 0; i < fsSnips.snippets.length; i++) {
        if (i === 0) {
            // Do the first name at index 0
            var snipsTitle = fsSnips.snippets[i]
        } else if (i % 2 === 0) {
            // Do the even number one, concatenating to the previous
            snipsTitle = fsSnips.snippets[i]
        } else {
            //  Do the odd number one
            var snipsText = fsSnips.snippets[i]
        }
        var codeResultForLoop = $('<div> <pre class="snippet"><strong>' + snipsTitle + ': </strong><br/>' + snipsText + '</pre></div>');
        // var codeHTMLForLoop = codeResultForLoop.innerHTML;
        var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
        snippetsListEl.append(codeResultForLoop);
        snippetsListEl.append(removeBtnForLoop);
    };


}