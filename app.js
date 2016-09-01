$(document).ready(function() {
    $('.btn').on('click', function(event) {


            $('.media').empty()
            if ($('#search').val() === '') {
                Materialize.toast("Please enter in a movie title", 3000)
            }
            // access guidebox api
            var searchTerm = ($('#search').val())
            $.ajax({
                method: 'Get',
                url: `https://api-public.guidebox.com/v1.43/US/rKdlIiwGSvS2KHovOWT8IdWJseMGPYiH/search/movie/title/${searchTerm}/fuzzy`,
                dataType: 'json',
                success: function(data) {
                    movies = []
                    let allMovies = data.results
                        // loop thru all movies and grab id
                    for (var i = 0; i < allMovies.length; i++) {
                        let movieList = allMovies[i]
                        let movieIds = (movieList.id);
                        $.ajax({
                            method: "GET",
                            url: `https://api-public.guidebox.com/v1.43/US/rKdlIiwGSvS2KHovOWT8IdWJseMGPYiH/movie/${movieIds}`,
                            dataType: 'json',
                            success: function(newData) {
                                let moviePoster = newData.poster_240x342
                                let trailer = newData.trailers.web[0].embed
                                let purchaseSources = (newData.purchase_web_sources);
                                let movieTitle = newData.title
                                let movieRating = newData.rating
                                let movieOverview = newData.overview
                                let releaseDate = newData.release_year
                                let movieLength = newData.duration / 60
                                let movieID = newData.id
                                let appendSites = "#movie-" + movieID + ' .sites'

                                let contentDiv =
                                    `<div id="movie-${movieID}" class="row">
                            <div class="row">
                              <div id="poster" class="col s12 m3 l3">
                                <div class="card">
                                  <div class="card-image">
                                      <img src="${moviePoster}">
                                  </div>
                                  <div class="card-action infoBtn center">
                                      <a class="waves-effect waves-light btn modal-trigger blue" href="#${movieID}">Info</a>
                                    <div id="${movieID}" class="modal">
                                      <div class="modal-content">
                                        <h4>${movieTitle}</h4>
                                        <p>Rating: ${movieRating}<br>
                                        Length: ${movieLength} min<br>
                                        Release Year: ${releaseDate}</p>
                                        <p>${movieOverview}</p>
                                      </div>
                                    <div class="modal-footer">
                                      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">X</a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="trailer col hide-on-small-only m9 l9">
                                <iframe src="${trailer}"></iframe>
                              </div>
                            </div

                            <div class="row">
                              <h4 class="center">Where to watch</h4>
                                <div class="sites col s12 m12 l12 center">

                                </div>
                            </div>
                          </div>
                          <hr>`;
                                // append content to page
                                $('.media').append(contentDiv)

                                console.log(newData.title);
                                console.log(purchaseSources);
                                // loops thru all watch sources
                                for (var i = 0; i < purchaseSources.length; i++) {
                                    let link = purchaseSources[i].link
                                    let source = purchaseSources[i].source

                                    if (source === 'itunes') {
                                        $(appendSites).append(`<a href="${link}"><img src="images/apple-icon.jpg"></a>`)
                                    } else if (source === 'amazon_buy') {
                                        $(appendSites).append(`<a href="${link}"><img src="images/amazon-icon.jpg"></a>`)
                                    } else if (source === 'vudu') {
                                        $(appendSites).append(`<a href="${link}"><img id="vudu" src="images/vudu-icon.png"></a>`)
                                    } else if (source === 'google_play') {
                                        $(appendSites).append(`<a href="${link}"><img src="images/google-play-icon.jpg"></a>`)
                                    } else if (source === 'disney_movies_anywhere') {
                                        $(appendSites).append(`<a href="${link}"><img src="images/disney-icon.png"></a>`)
                                    } else if (source === 'mgo') {
                                        $(appendSites).append(`<a href="${link}"><img id="fandango" src="images/fandango-icon.jpeg"></a>`)
                                    } else if (source === 'cinemanow') {
                                        $(appendSites).append(`<a href="${link}"><img id="cinemaNow" src="images/cinemanow-icon.jpeg"></a>`)
                                    } else if (source === 'youtube_purchase') {
                                        $(appendSites).append(`<a href="${link}"><img src="images/youtube-icon.jpg"></a>`)
                                    } else if (source === 'sony') {
                                        $(appendSites).append(`<a href="${link}"><img id="sony" src="images/sony-icon.png"></a>`)
                                    } else if (source === 'verizon_on_demand') {
                                        $(appendSites).append(`<a href="${link}"><img id="verizon" src="images/verizon-icon.png"></a>`)
                                    } else {
                                        console.log("i'm here");
                                        $(appendSites).append('Sorry, this movie is not available online.')
                                    }
                                }

                                $('.modal-trigger').leanModal();
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
        // submits search when enter is pressed
    $('#search').keypress(function(event) {
        if (event.which == 13) {
            $('.btn').click()
        }
    })

    //scroll to top when button clicked
    $("#toTop").click(function() {
        $('html, body').animate({
            scrollTop: $(".container").offset().top
        }, 1000);
    });
});;;
