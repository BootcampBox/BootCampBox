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
var snipsRemoverA = $("#snipsRemoverA");
var snipsRemoverB = $("#snipsRemoverB");

var enterBtn = $("#enter-btn");

snipsRemoverA.on("click", theSnipsRemover())
snipsRemoverB.on("click", theSnipsRemover)

enterBtn.on('click', function() {
    if (snipTitle.val() == '' || snipInput.val() == '') {
        console.log(snipTitle.value)
        console.log(snipInput.value)
        var errMessage = "We couldn't save that one.";
        $('#modal-error').modal('open');
        $('#errmsg').text(errMessage);
        $('#posSolution').text('Try typing something.');
    } else {
        var codeResult = $(`<div> <pre class="snippet"><strong>${snipTitle.val().replace(/[<>&\n]/g, function(x) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
               '\n': '<br />'
            }[x];
        })}: </strong><br/>${snipInput.val().replace(/[<>&\n]/g, function(x) {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
               '\n': '<br />'
            }[x];
        })}</pre></div>`);
        // var removeBtn = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
        // removeBtn.on("click", theSnipsRemover);
        snippetsListEl.append(codeResult);
        // snippetsListEl.append(removeBtn);
        snippets.push(snipTitle.val(), snipInput.val());

        localStorage.setItem("ls-snippets", JSON.stringify({
            snippets
        }));
        // firebase.firestore().collections('users').doc(user.uid).update({ snippets: JSONStringify({ snipArray }) });
        snipTitle.val("");
        snipInput.val("");

    }
})

// function appendlsSnips() {
//     console.log('appendlsSnips has fired')
//     var lsSnips = JSON.parse(localStorage.getItem("ls-snippets"));
//     if (lsSnips) {
//     for (var i = 0; i < lsSnips.snippets.length; i++) {
//         if (i === 0) {
//             // Do the first name at index 0
//             var snipsTitle = lsSnips.snippets[i]
//             console.log(snipsTitle);
//         } else if (i % 2 === 0 && i !== 0) {
//             // Do the even number one, concatenating to the previous
//             snipsTitle = lsSnips.snippets[i]
//             console.log(lsSnips.snippets[i]);
//         } else {
//             //  Do the odd number one
//             var snipsText = lsSnips.snippets[i]
//             console.log(snipsText);
//         };
//         console.log(i % 2);
//         var codeResultForLoop = $('<div class="snipsDiv"> <pre class="snippet"><strong>' + snipsTitle + ': </strong><br/>' + snipsText + '</pre></div>');
//         // var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
//         snippetsListEl.append(codeResultForLoop);
//         // snippetsListEl.append(removeBtnForLoop);
//         // console.log('stored snipTitles ', storedSnips.snippetText, 'stored snippets', storedSnips.snippetTitle);
//     }
// }

function appendfsSnips(fsSnips) {
    console.log('appendfsSnips has fired')
    for (var i = 0; i < fsSnips.snippets.length; i++) {
        if (i === 0) {
            // Do the first name at index 0
            var snipsTitle = fsSnips.snippets[i]
        } else if (i % 2 === 0 && i !== 0) {
            // Do the even number one, concatenating to the previous
            snipsTitle = fsSnips.snippets[i]
        } else {
            //  Do the odd number one
            var snipsText = fsSnips.snippets[i]
        }
        var codeResultForLoop = $('<div class="snipsDiv"> <pre class="snippet"><strong>' + snipsTitle + ': </strong><br/>' + snipsText + '</pre></div>');
        // var codeHTMLForLoop = codeResultForLoop.innerHTML;
        // var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
        snippetsListEl.append(codeResultForLoop);
        // snippetsListEl.append(removeBtnForLoop);
    };


}

function appendlsSnips() {
    console.log('appendlsSnips has fired')
    if (JSON.parse(localStorage.getItem("ls-snippets")).snippets) {
        var lsSnips = JSON.parse(localStorage.getItem("ls-snippets"));
        for (var i = 0; i < lsSnips.snippets.length; i++) {
        if (i === 0) {
            // Do the first name at index 0
            var snipsTitle = lsSnips.snippets[i]
            console.log(snipsTitle);
        } else if (i % 2 === 0 && i !== 0) {
            // Do the even number one, concatenating to the previous
            snipsTitle = lsSnips.snippets[i]
            console.log(lsSnips.snippets[i]);
        } else {
            //  Do the odd number one
            var snipsText = lsSnips.snippets[i]
            console.log(snipsText);
        };
        console.log(i % 2);
        var codeResultForLoop = $('<div class="snipsDiv"> <pre class="snippet"><strong>' + snipsTitle + ': </strong><br/>' + snipsText + '</pre></div>');
        // var removeBtnForLoop = $('<button type=button class="btn teal darken-2">Remove Aforementioned Snippy</button>')
        snippetsListEl.append(codeResultForLoop);
        // snippetsListEl.append(removeBtnForLoop);
        // console.log('stored snipTitles ', storedSnips.snippetText, 'stored snippets', storedSnips.snippetTitle);
    }
}
}

function theSnipsRemover() {
    var theSnips = $(".snipsDiv");
    if (typeof JSON.parse(localStorage.getItem("ls-snippets")) ===  "object") {
        var lsSnips = JSON.parse(localStorage.getItem("ls-snippets"));
        var lsSnipsSnippets = lsSnips.snippets;
        if ($(this).attr("class") == "fullRemover") {   
            // Remove Loop
            for (var i = 0; i < theSnips.length; i++) {
                theSnips[i].remove();
                lsSnipsSnippets.pop();
                localStorage.setItem("ls-snippets", JSON.stringify(lsSnipsSnippets));
            }
        } else if ($(this).attr("class") == "lastRemover") {
            var i = theSnips.length - 1;
            theSnips[i].remove();
            lsSnipsSnippets.pop();
            localStorage.setItem("ls-snippets", JSON.stringify(lsSnipsSnippets));
        }
    } else  {
        if ($(this).attr("class") == "fullRemover") {   
            // Remove Loop
            for (var i = 0; i < theSnips.length; i++) {
                theSnips[i].remove();
                lsSnips = [];
                localStorage.setItem("ls-snippets", lsSnips);
            }
        } else if ($(this).attr("class") == "lastRemover") {
            var i = theSnips.length - 1;
            theSnips[i].remove();
            lsSnipsSnippets = [];
            localStorage.setItem("ls-snippets", lsSnipsSnippets);
        }
    }
}