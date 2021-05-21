//git Search Button and Results Parsing
var nameListItemEl;
var gitListEl;
var gitOlEl = $('#gitResults ol');

$('#gitBtn').on('click', function() {
        console.log('GitBtn Fired');
        $('#gitOl').children().remove();
        $('#gitInstructions').show();
        /*git Variables*/
        var gitBaseUrl = 'https://api.github.com/search/users?q='
        var gitInput = $('#gitInput').val();

        console.log(gitBaseUrl + gitInput);
        $.ajax({
            url: gitBaseUrl + gitInput,
            method: 'GET',
        }).then(function(answer) {
            console.log(answer);
            if (answer.items.length == 0) {
                console.log('Nothing in answer ')
                $('#modal-git').modal('open');
            } else {
                gitOlEl.addClass('scroll')
                    //Iterate through answer data
                for (var x = 0; x < answer.items.length; x++) {
                    console.log(x);
                    console.log(answer.items.length)
                    var respAvatar = answer.items[x].avatar_url;
                    var respName = answer.items[x].login;
                    var resURL = answer.items[x].html_url;
                    var resRepoUrl = answer.items[x].repos_url;

                    //create a list item for each thing
                    // resultDiv =$('<div class="gitResultDiv"></div>'))
                    nameListItemEl = $('<li class="gitResultLi">' + respName + '</li>');
                    avatarIMGEl = $('<a href="' + resURL + '" target="_blank"><img src="' + respAvatar + 'alt="Github user avatar"></a>');
                    gitDivEl = $('<div class="gitResCard wrapper"></div>');
                    repoUrlLiEL = $('<li class="repoURL">' + resRepoUrl + '</li>');

                    //append them to the page
                    gitOlEl.append(gitDivEl);
                    // nameListItemEl.append(avatarIMGEl);
                    gitDivEl.append(repoUrlLiEL);
                    gitDivEl.append(nameListItemEl);
                    gitDivEl.append(avatarIMGEl);

                    // tooltipgitLi.append(gitListEl);


                }
            }
        });
    })
    //             /*Not Working yet, revisit*/
    //             $('#gitResults').children().children('.resultLi').on('click', function(lsLinks) {

//                 var lsLinks = localStorage.getItem('stored-links');
//                 var gitScriptCopy = this.children[0].textContent;
//                 var linksInputAnchor = $("<a class='scroll linksLi'>");
//                 var linksListInputEl = $('<li>');
//                 linksInputAnchor.text(gitScriptCopy);
//                 linksList.append(linksListInputEl);
//                 linksListInputEl.append(linksInputAnchor);
//                 lsLinks.push(gitScriptCopy);
//                 // console.log(lsLinks);
//                 localStorage.setItem("stored-links", JSON.stringify(lsLinks));
//                 console.log(lsLinks);
//                 linkInput.val("");
//                 $(this).hide();

//             })


//         }

//     });