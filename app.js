$(document).ready(function() {

    console.log('locked and loaded');

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
                // console.log(data);
                allMovies = data.results
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
                                // console.log(moviePoster);
                            $('img').attr({
                                src: moviePoster
                            })
                            let purchaseSources = (newData.purchase_web_sources);
                            // console.log(purchaseSources);
                            for (var i = 0; i < purchaseSources.length; i++) {
                                // console.log(purchaseSources[i])
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
