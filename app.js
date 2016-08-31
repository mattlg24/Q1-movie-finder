$(document).ready(function() {

    console.log('locked and loaded');

    // access guidebox api
    $('.btn').on('click', function(event) {
        $('.media').empty()
        if ($('#search').val() === '') {
            Materialize.toast("Please enter in a movie title", 3000)
        }

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
                            // movie poster
                            let moviePoster = newData.poster_240x342
                                // movie trailer
                            let trailer = newData.trailers.web[0].embed
                                // watch sources
                            let purchaseSources = (newData.purchase_web_sources);
                            let movieTitle = newData.title
                            let movieRating = newData.rating
                            let movieOverview = newData.overview
                            let releaseDate = newData.release_year
                            let movieLength = newData.duration / 60
                            let movieID = newData.id
                            let appendSites = "#movie-" + movieID + ' .sites'
                            console.log(appendSites);

                            let contentDiv =
                                `<div id="movie-${movieID}" class="row">
                            <div class="row">
                              <div id="poster" class="col s12 m3 l3">
                                <div class="card">
                                  <div class="card-image">
                                      <img src="${moviePoster}">
                                  </div>
                                  <div class="card-action">
                                      <a class="waves-effect waves-light btn modal-trigger" href="#${movieID}">Info</a>
                                    <div id="${movieID}" class="modal modal-fixed-footer">
                                      <div class="modal-content">
                                        <h4>${movieTitle}</h4>
                                        <p>Rating: ${movieRating}<br>
                                        Release Year: ${releaseDate}</p>
                                        <p>${movieOverview}</p>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">X</a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="trailer col hide-on-small-only m9 l9">
                                <iframe width="100%" height="362px" src="${trailer}">
                                </iframe>
                              </div>
                            </div

                            <div class="row">
                              <p>Where to watch</p>
                                <div class="sites col l12">

                                </div>
                            </div>
                          </div>`;
                            // append content to page
                            $('.media').append(contentDiv)

                            // let divSites = ($(contentDiv).filter(":last-child").children('.sites'))
                            // console.log('divs:', divSites);
                            // console.log($('.sites'));
                            // loops thru all watch sources
                            for (var j = 0; j < purchaseSources.length; j++) {
                                let link = purchaseSources[j].link
                                let source = purchaseSources[j].source

                                if (source === 'itunes') {
                                    $(appendSites).append(`<a href="${link}"><img src="images/apple-icon.jpg"></a>`)
                                } else if (source === 'amazon_buy') {
                                    $(appendSites).append(`<a href="${link}"><img src="images/amazon-icon.jpg"></a>`)
                                } else if (source === 'vudu') {
                                    $(appendSites).append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'google_play') {
                                    $(appendSites).append(`<a href="${link}"><img src="images/google-play-icon.jpg"></a>`)
                                } else if (source === 'mgo') {
                                    $(appendSites).append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'cinemanow') {
                                    $(appendSites).append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'youtube_purchase') {
                                    $(appendSites).append(`<a href="${link}"><img src="images/youtube-icon.jpg"></a>`)
                                } else if (source === 'sony') {
                                    $(appendSites).append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'verizon_on_demand') {
                                    $(appendSites).append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
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

    //scroll to top when button clicked
    $("#toTop").click(function() {
        $('html, body').animate({
            scrollTop: $(".container").offset().top
        }, 800);
    });
});
