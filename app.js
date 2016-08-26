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
                }

                let movieResults = (data.results[0]);
                let movieId = (movieResults.id);
                // console.log(movieId);
                // let movieId = data.id
                // console.log(movieId);
            }
        })
    })


});
