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
        var codeResult = $('<div class="snipsDiv"> <p><strong>' + snipTitle.val() + '</strong></p><br/><code class="snippet">' +
            snipInput.val()
            .replace(/(-)/g, '&#8209')
            .replace(/(\}|\}\s)+/g, '\}\r\n')
            .replace(/(\{\s)/g, '\{\r\n\ ')
            .replace(/(\<)/g, '&lt')
            .replace(/(\>)/g, '&gt')
            .replace(/(\;)+/g, '\;\r\n\ ') + '</code></div>');
        snippetsListEl.append(codeResult);
        codeResult.append(removeBtn);
        removeBtn.on('click', rmSnip)
        var preppedTitle = codeResult[0].children[0].childNodes[0].innerText
        var preppedCode = codeResult[0].children[2].innerText
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
    let rmT = $(this)[0].parentElement.children[0].innerText
    console.log(rmT)
    let index = snipObj.snippets.indexOf(rmT);
    console.log(index)
    modSnips = snipObj.snippets.splice(index, 2)
    console.log('modSnips=', modSnips)
    console.log('snipObj=', snipObj)
    localStorage.setItem('snippets', JSON.stringify(snipObj))
    $(this).parent().remove();
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
            console.log('i=', setUpSnips.snippets[i], 'n=', setUpSnips.snippets[n])
            var codeResultForLoop = $('<div class="snipsDiv"> <p><strong>' + setUpSnips.snippets[i] + '</strong></p><br/><code class="snippet">' +
                setUpSnips.snippets[n]
                .replace(/(-)/g, '&#8209')
                .replace(/(\}|\}\s)+/g, '\}\r\n')
                .replace(/(\{\s)/g, '\{\r\n\ ')
                .replace(/(\<)/g, '&lt')
                .replace(/(\>)/g, '&gt')
                .replace(/(\;)+/g, '\;\r\n\ ') +
                '</code></div>');
            snippetsListEl.append(codeResultForLoop);
            codeResultForLoop.append(removeBtn);
            codeResultForLoop.attr('select', 'unset;');
            removeBtn.on('click', rmSnip)

        }
    } else {
        placeholderItems();
        console.log('setUpSnips was null')
    }

};