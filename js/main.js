$(document).ready(function() {

  var cueAdder = cueAdder || function(){

    $.fn.addCuePoints = function(urlCues, urlImages) { 
    var self = this;  
      var track = this[0].addTextTrack('metadata');
      $.when(getData(urlCues), getData(urlImages)).done(function(response1, response2){
          var images = response2[0].images;
          var cuePoints = response1[0].cuepoints.cuepoint;
          cuePoints.forEach(function(cuePoint){
              var image = images.find(matchImage, cuePoint);
              cuePoint.imageLink = image.image;
              cuePoint.stock = typeof(cuePoint.stock) !== "undefined" ?Number(cuePoint.stock.replace(',','')) : 0;
              cuePoint.timeStamp = timeToSeconds(cuePoint.timeStamp);
              if (cuePoint.stock >= 100) {
                  var cue = makeCue(cuePoint);
                  track.addCue(cue);
              }
          });
        });
      return this;
    };

    function matchImage(element){
      return (element.id === this.image.toString());
    }

    function makeCue(cuePoint) {
        var cue = new VTTCue(cuePoint.timeStamp, cuePoint.timeStamp + 2, cuePoint.desc);
        cue.onenter = function() {
          renderProductInfo(cuePoint);
        };
        return cue;
    }

    function getData(url) {
        return $.ajax({
          url: url,
          dataType: "json",
          success: function(response) {
                    return response;
            },
          error: function(xhr){
            console.log("An error occured: " + xhr.status + " " + xhr.statusText);
            }
        });
    }

    function timeToSeconds(timeStamp) {
      var a = timeStamp.split(':');
      var seconds = (+a[0])*3600 + (+a[1])*60 + (+a[2]);
      return seconds;
    }

    function renderProductInfo(product) {
        var productHTML = Mustache.render(
            "<h3 class='product-name'><a href='{{link}}' target='_blank'>{{desc}}</a></h3><h3 class='product-price'>{{price}}</h3><a href='{{link}}' target='_blank'><img class='product-image' src='{{imageLink}}'></a>"
            , product);
        $('#productBox').html(productHTML);
    }
  }();

  //If you had multiple videos with data in the same format, you could use addCuePoints(urlCues, urlImages) as follows:

  $('#savile-row').addCuePoints("/data/cuepoints.json", "data/images.json");
});



