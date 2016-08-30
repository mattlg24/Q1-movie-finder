$(document).ready(function() {

    console.log('locked and loaded');

    let movies = []

    function renderMovies() {

        for (var movie of movies) {

        }
    };


    // access guidebox api
    $('.btn').on('click', function(event) {
        $('.media').empty()
            // console.log(event.target);
        if ($('#search').val() === '') {
            Materialize.toast("Please enter in a movie title", 3000)
        }

        var searchTerm = ($('#search').val())
            // console.log(searchTerm);
        $.ajax({
            method: 'Get',
            url: `https://api-public.guidebox.com/v1.43/US/rKdlIiwGSvS2KHovOWT8IdWJseMGPYiH/search/movie/title/${searchTerm}/fuzzy`,
            dataType: 'json',
            success: function(data) {
                // console.log('ajax #1 data returned');
                movies = []
                    // console.log(data);
                let allMovies = data.results
                    // loop thru all movies and grab id
                for (var i = 0; i < allMovies.length; i++) {
                    let movieList = allMovies[i]
                    let movieIds = (movieList.id);
                    // console.log(movieIds)
                    $.ajax({
                        method: "GET",
                        url: `https://api-public.guidebox.com/v1.43/US/rKdlIiwGSvS2KHovOWT8IdWJseMGPYiH/movie/${movieIds}`,
                        dataType: 'json',
                        success: function(newData) {
                            console.log(newData);
                            let moviePoster = newData.poster_240x342
                                // movie trailer
                            let trailer = newData.trailers.web[0].embed
                                // watch sources
                            var sourceLinks;
                            let purchaseSources = (newData.purchase_web_sources);
                            let iTunes = purchaseSources[0]
                            let source2 = purchaseSources[1]
                            let source3 = purchaseSources[2]
                            let source4 = purchaseSources[3]
                            let source5 = purchaseSources[4]
                            console.log('source1', source1);
                            // loops thru all watch sources
                            // for (var i = 0; i < purchaseSources.length; i++) {
                            //     let sources = purchaseSources[i]
                            //     console.log(newData);
                            //     sourceLinks = sources.link;
                            //     // console.log('sourcelinks', sourceLinks);
                            // }
                            // console.log('sourcelinks=========================', sourceLinks);
                            // console.log('sourcelinks===============length==========', sourceLinks.length);
                            // end of tempory commented section
                            let contentDiv = `<div id="poster" class="col s12 m4 l3">
                                <div class="card">
                                    <div class="card-image">
                                        <img src="${moviePoster}">
                                    </div>
                                    <div class="card-action">
                                        <a href="#">This is a link</a>
                                    </div>
                                </div>
                            </div>
                            <div class="trailer col s12 m8 l9">
                                <iframe width="100%" height="362px" src="${trailer}">
                                </iframe>
                            </div>
                            <div class="row">
                                <div class="col l1">
                                    <a href="${source1.link}"><img src="${source1.link}"></a>
                                </div>
                                <div class="col l1">
                                    <a href="${sourceLinks}"><img src="http://www.fillmurray.com/50/50"></a>
                                </div>
                                <div class="col l1">
                                    <a href="${sourceLinks}"><img src="http://www.fillmurray.com/50/50"></a>
                                </div>
                                <div class="col l1">
                                    <a href="${sourceLinks}"><img src="http://www.fillmurray.com/50/50"></a>
                                </div>
                                <div class="col l1">
                                    <a href="${sourceLinks}"><img src="http://www.fillmurray.com/50/50"></a>
                                </div>
                                <div class="col l1">
                                    <a href="${sourceLinks}"><img src="http://www.fillmurray.com/50/50"></a>
                                </div>
                            </div>`
                                // append content to page
                            $('.media').append(contentDiv)
                        },
                        error: function(err) {
                            console.log('newData ERROR msg:', err);
                        }
                    })
                }
            },
            error: function(err) {
                console.log('ERROR msg:', err);
            }
        })
    })

    //scroll to top when button clicked
    $("#toTop").click(function() {
        $('html, body').animate({
            scrollTop: $(".container").offset().top
        }, 800);
    });
});;
