$(document).ready(function() {

    console.log('locked and loaded');

    let movies = []

    function loadMovies() {

        for (var movie of movies) {

        }
    };


    // access guidebox api
    $('.btn').on('click', function(event) {
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
                            // console.log('ajax #2 returned');
                            // console.log(newData);
                            movies.push(newData)
                                // console.log(movies);
                                // appends movie poster to page
                            let moviePoster = newData.poster_240x342
                            let movieDiv = $('<div class="col m4 l12">')
                            $('<img>', {
                                src: moviePoster,
                                alt: `${newData.title}`
                            }).appendTo(movieDiv)
                            $('.poster').append(movieDiv)
                                // console.log(moviePoster);

                            // movie trailer
                            let trailer = newData.trailers.web[0].embed
                            let iframe = $('<iframe>')
                            $('<iframe>', {
                                src: trailer,
                            }).appendTo(movieDiv)


                            // watch sources
                            let sourceLinks;
                            let purchaseSources = (newData.purchase_web_sources);
                            // loops thru all watch sources
                            for (var i = 0; i < purchaseSources.length; i++) {
                                let sources = purchaseSources[i]
                                    // console.log(newData.title);
                                sourceLinks = (sources.link);
                                // console.log(sourceLinks);
                                // appends links to page
                                $('<a>', {
                                    href: sourceLinks,
                                    text: 'Watch Here'
                                }).appendTo(movieDiv)
                            }

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

});
