//CDNJS Search Button and Results Parsing
var nameListItemEl;
var cdnListEl;
var cdnOlEl = $('#cdnjsResults ol');
$('#cdnjsBtn').on('click', function() {
        /*CDNJS Variables*/
        var cdnjsBaseUrl = 'https://api.cdnjs.com/libraries';
        var cdnjsInput = $('#cdnjsInput').val();
        var searchAdd = '?search=' + cdnjsInput;
        $('ol li').remove();

        console.log(cdnjsBaseUrl + searchAdd)
        $.ajax({
            url: cdnjsBaseUrl + searchAdd,
            method: 'GET',
        }).then(function(response) {
            console.log(response);
            if (response.results.length == 0) {
                console.log('Nothing in response ')
                $('#modal-cdnjs').modal('open');
            } else {

                cdnOlEl.addClass('scroll')
                    //Iterate through response data
                for (var x = 0; x < response.results.length; x++) {
                    var respName = response.results[x].name;
                    var respUrl = response.results[x].latest;
                    //create a list item for each name result
                    nameListItemEl = $('<li class="resultLi">' + respName + '</li>');
                    //creat a list item for each url 
                    cdnListEl = $('<li class="cdnLi">' + respUrl + '</li>')
                        //append them to the page
                    cdnOlEl.append(nameListItemEl);
                    nameListItemEl.append(cdnListEl);
                }
                /*Not Working yet, revisit*/
                $('#cdnjsResults').children().children('.resultLi').on('click', function() {
                    console.log(this.children[0].innerText, 'has been clicked');
                    var cdnjsScriptCopy = '<script>this.children[0].innerText</script>';
                    select(cdnjsScriptCopy);
                    document.execCommand("copy");
                })


            }

        });
})