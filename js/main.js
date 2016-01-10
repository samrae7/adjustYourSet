$(document).ready(function() {

    function addCuePoints(cuePoints) {
        var video = document.getElementsByTagName('video')[0];   
        var track = video.addTextTrack('metadata');
        $.when(getData("/data/cuepoints.json"), getData("data/images.json")).done(function(response1, response2){
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
    }

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
            "<h3 class='product-name'><a href='{{link}}' target='_blank'>{{desc}}</a></h3><h3 class='product-price'>{{price}}</h3><img class='product-image' src='{{imageLink}}'>"
            , product);
        $('#productBox').html(productHTML);
    }

    addCuePoints();
});



