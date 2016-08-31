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
                            // let source1 = purchaseSources[0]
                            // let source2 = purchaseSources[1]
                            // let source3 = purchaseSources[2]
                            // let source4 = purchaseSources[3]
                            // let source5 = purchaseSources[4]
                            // console.log(purchaseSources);
                            // console.log(source1.display_name);

                            let contentDiv = `<div id="poster" class="col s12 m3 l3">
                                <div class="card">
                                  <div class="card-image">
                                      <img src="${moviePoster}">
                                  </div>
                                  <div class="card-action">
                                      <a href="#modal1">Info</a>
                                    <div id="${newData.id}" class="modal">
                                      <div class="modal-content">
                                        <h4>${newData.title}</h4>
                                        <p>A bunch of text</p>
                                      </div>
                                    </div>
                                    <div class="modal-footer">
                                      <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div class="trailer col hide-on-small-only m9 l9">
                                <iframe width="100%" height="362px" src="${trailer}">
                                </iframe>
                              </div>

                              <div class="row">
                                <p>Where to watch</p>
                                  <div class="sites">

                                  </div>
                              </div>`;
                            let divSites = ($(contentDiv).filter(":last-child").children())
                            console.log(divSites);
                            console.log($('.sites'));
                            // loops thru all watch sources
                            for (var i = 0; i < purchaseSources.length; i++) {
                                let link = purchaseSources[i].link
                                let source = purchaseSources[i].source
                                    // console.log('title:', newData.title);
                                    // console.log(purchaseSources[i].link);
                                if (source === 'itunes') {
                                    $('.sites').append(`<a href="${link}"><img src="images/apple-icon/jpg"></a>`)
                                } else if (source === 'amazon_buy') {
                                    $('.sites').append(`<a href="${link}"><img src="images/amazon-icon/jpg"></a>`)
                                } else if (source === 'vudu') {
                                    $('.sites').append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'google_play') {
                                    $('.sites').append(`<a href="${link}"><img src="images/google-play-icon.jpg"></a>`)
                                } else if (source === 'mgo') {
                                    $('.sites').append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'cinemanow') {
                                    $('.sites').append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'youtube_purchase') {
                                    $('.sites').append(`<a href="${link}"><img src="images/youtube-icon.jpg"></a>`)
                                } else if (source === 'sony') {
                                    $('.sites').append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                } else if (source === 'verizon_on_demand') {
                                    $('.sites').append(`<a href="${link}"><img src="http://www.fillmurray.com/50/50"></a>`)
                                }
                            }
                            // append content to page
                            $('.media').append(contentDiv)

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
