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

// snipsRemoverA.on("click", theSnipsRemover)
// snipsRemoverB.on("click", theSnipsRemover)

enterBtn.on('click', function() {
    var localSnips = JSON.parse(localStorage.getItem('snippets'))
    console.log(localSnips)
    if (snipTitle.val() == '' || snipInput.val() == '') {
        console.log(snipTitle.value)
        console.log(snipInput.value)
        var errMessage = "We couldn't save that one.";
        $('#modal-error').modal('open');
        $('#errmsg').text(errMessage);
        $('#posSolution').text('Try typing something.');
    } else {
        var removeBtn = $('<button type=button class="rmSnips btn blue darken-2">Remove Snippy</button>')
        var codeResult = $(`<div class="snipsDiv"> <pre class="snippet"><strong>${snipTitle.val().replace(/[<>&\n]/g, function(x) {
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
        snippetsListEl.append(codeResult);
        codeResult.append(removeBtn);
        removeBtn.on('click', rmSnip)
        var preppedTitle = codeResult[0].children[0].childNodes[0].childNodes[0].nodeValue;
        var preppedCode = codeResult[0].children[0].childNodes[2].nodeValue;
        console.log(preppedTitle);
        console.log(preppedCode);
        localSnips.snippets.push(preppedTitle, preppedCode);
        console.log(localSnips)
        let setUpSnips = JSON.stringify(localSnips);
        localStorage.setItem('snippets', setUpSnips);
        packSnips()
    }
    //Clear Input Fields
    snipTitle.val("");
    snipInput.val("");

})

function packSnips() {
    var packedSnips = {
        snippets: []
    }
    let lsSnippets = JSON.parse(localStorage.getItem('snippets'))
    console.log(lsSnippets)
    let setUpSnips = lsSnippets.snippets
    for (let i = 0; i < lsSnippets.snippets.length; i++) {
        packedSnips.snippets.push(setUpSnips[i])
    }
    sendToFS(packedSnips)
}

function rmSnip() {

    let snipObj = JSON.parse(localStorage.getItem('snippets'));
    console.log(snipObj)
    let rmS = $(this).prev().children().last()[0].innerText;
    let rmT = $(this).prev().children().first()[0].innerText;
    console.log(snipObj.snippets)
    let index = snipObj.snippets.indexOf(rmT);
    console.log(index)
    modSnips = snipObj.snippets.splice(index, 2)
    console.log('modSnips=', modSnips)
    console.log('snipObj=', snipObj)
    localStorage.setItem('snippets', JSON.stringify(snipObj))
    $(this).prev().remove();
    $(this).remove();
    packSnips()
}

function sendToFS(packedSnips) {
    var userID = auth.currentUser.uid;
    console.log(packedSnips)
    console.log(userID)
    let uiddocRef = fireStore.collection('users').doc(userID);
    uiddocRef.set({
        'snippets': packedSnips
    }, {
        merge: true
    });
    uiddocRef.get('snippets').then((doc) => {
        console.log(doc.data())
    });
}

function appendSnips() {
    console.log('appendSnips has fired')
    let setUpSnips = JSON.parse(localStorage.getItem('snippets'))
    console.log(setUpSnips.snippets.length)
    if (setUpSnips.snippets != null && setUpSnips.snippets != '') {
        for (var i = 0, n = 1; i < setUpSnips.snippets.length; i += 2, n += 2) {
            var removeBtn = $('<button type=button class="rmSnips btn blue darken-1">Remove Snippy</button>')
            console.log('i=', setUpSnips.snippets[i], 'n=', n)
            var codeResultForLoop = $(`<div class="snipsDiv"> <pre class="snippet"><strong>${setUpSnips.snippets[i].replace(/[:<>&\n]/g, function(x) {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                   '\n': '<br>'
                }[x];
            })}: </strong><br/>${setUpSnips.snippets[n].replace(/[<>&\n]/g, function(x) {
                return {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                   '\n': '<br>'
                }[x];
            })}</pre></div>`);
            snippetsListEl.append(codeResultForLoop);
            codeResultForLoop.append(removeBtn);
            removeBtn.on('click', rmSnip)

        }
    } else {
        placeholderItems();
        console.log('setUpSnips was null')
    }

};



// function theSnipsRemover() {
//     var theSnips = $(".snipsDiv");
//     if (typeof JSON.parse(localStorage.getItem("ls-snippets")) === "object") {

//         var lsSnips = JSON.parse(localStorage.getItem("ls-snippets"));
//         console.log(setUpSnips);
//         if ($(this).attr("class") == "fullRemover") {
//             // Remove Loop
//             for (var i = 0; i < theSnips.length; i++) {
//                 theSnips[i].remove();
//                 lsSnipsSnippets.pop();
//                 localStorage.setItem("ls-snippets", JSON.stringify(lsSnipsSnippets));
//             }
//         } else if ($(this).attr("class") == "lastRemover") {
//             var i = theSnips.length - 1;
//             console.log(theSnips);
//             theSnips[i].remove();
//             lsSnipsSnippets.pop();
//             localStorage.setItem("ls-snippets", JSON.stringify(lsSnipsSnippets));
//         }
//     } else {
//         if ($(this).attr("class") == "fullRemover") {
//             // Remove Loop
//             for (var i = 0; i < theSnips.length; i++) {
//                 theSnips[i].remove();
//                 lsSnips = [];
//                 localStorage.setItem("ls-snippets", lsSnips);
//             }
//         } else if ($(this).attr("class") == "lastRemover") {
//             var i = theSnips.length - 1;
//             theSnips[i].remove();
//             lsSnipsSnippets = [];
//             localStorage.setItem("ls-snippets", lsSnipsSnippets);
//         }
//     }
// }