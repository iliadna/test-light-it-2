$(document).ready(function(){
	$("#navsearch").keypress(function(key){
    if (key.which == 13) {
      $.ajax({
        url: 'https://itunes.apple.com/search?term=' + $(this).val(),
        dataType: 'json',
        success: function(data) {
          $(".tracklist").empty();
          if (data.resultCount == 0) {
            $(".head").css({"display":"none"});
            $('<div class="nothing"><p>Nothing found</p></div>').prependTo(".tracklist");
          }  else {
            $(".head").css({"display":"flex"});
            for (let i=0; i<data.resultCount; i++) {
              $('<div class="container-fluid main-info" data-toggle="collapse" data-parent="#accordion">' +
                  '<div class="user row" >' +
                    '<div class="col-sm-2 col-md-2">' +
                      '<img class="thumb" src=' + data.results[i].artworkUrl100 + '>' +
                    '</div>' +
                    '<div class="col-sm-2 col-md-2">' +
                      '<p class="artist">' + data.results[i].artistName + '</p>' +
                    '</div>' +
                    '<div class="col-sm-3 col-md-3">' +
                      '<p class="track">' + data.results[i].trackName + '</p>' +
                    '</div>' +
                    '<div class="col-sm-2 col-md-2">' +
                      '<p class="collection">' + data.results[i].collectionName + '</p>' +
                    '</div>' +
                    '<div class="col-sm-2 col-md-2">' +
                      '<p class="genre">' + data.results[i].primaryGenreName + '</p>' +
                    '</div>' +
                    '<div class="col-sm-1 col-md-1">' +
                      '<i class="fa opened-status fa-2x"></i>' +
                    '</div>' +
                  '</div>' +
   //Adding a detail user info
                  '<div class="container detail-info collapse">' +
                    '<div class="row data">' +
                      '<div class="col-md-1"></div>'+
                      '<div class="col-md-11">'+
                        '<span class="name">' + data.results[i].artistName + ' - ' + data.results[i].trackName + ' </span>' +
                        '<i class="fa fa-music fa-2x"></i>' +
                      '</div>' +
                    '</div>' +
                    '<div class="col-md-1"></div>' +
                    '<div class="col-xs-6 col-sm-6 col-md-6">' +
                      '<ul>' +
                        '<li><b>Collection:</b> ' + data.results[i].collectionName + '</li>' +
                        '<li><b>Track Count:</b> ' + data.results[i].trackNumber + '</li>' +
                        '<li><b>Price:</b> ' + data.results[i].collectionPrice + ' ' + data.results[i].currency + '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="col-xs-6 col-sm-6 col-md-5">' +
                      '<ul>' +
                        '<li><b>Track duration:</b> ' + millisToMinutesAndSeconds(data.results[i].trackTimeMillis) + '</li>' +
                        '<li><b>Track Price:</b> ' + data.results[i].trackPrice + ' ' + data.results[i].currency + '</li>'+
                      '</ul>' +
                    '</div>'+
                  '</div>' +
                '</div>'
                ).appendTo($(".tracklist"));
            }
          }
        }
      });
    }
  });
});

//Milliseconds to minutes
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds + ' min';
}

//Accordion on click
let onClick = function() {
  $('.main-info').click(function() {
    $(this).siblings('.opened').removeClass('opened');
    $(this).toggleClass('opened');
    $(this).parent().find('.collapse.in').collapse("toggle");
    $(this).closest('.main-info').find('.collapse').collapse("toggle");
  });
};
$(document).ajaxComplete(onClick);

