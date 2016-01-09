$(document).ready(function() {

    function addCuePoints(cuePoints) {
        var video = document.getElementsByTagName('video')[0];   
        var track = video.addTextTrack('metadata');
        $.when(getData("/data/cuepoints.json"), getData("data/images.json")).done(function(response1, response2){
            var images = response2[0].images;
            var cuePoints = response1[0].cuepoints.cuepoint;
            console.log('images',images);
            console.log('cuePoints', cuePoints);
            cuePoints.forEach(function(cuePoint, index){
                function matchImage(element){
                    return (element.id === cuePoint.image.toString());
                };
                if (typeof(cuePoint.stock)!=="undefined" && Number(cuePoint.stock.replace(',','')) >= 100) {
                    var image = images.find(matchImage);
                    //console.log(image);
                    cuePoint.imageLink = image.image;
                    //console.log(cuePoint.imageLink);
                    var cue = makeCue(cuePoint);
                    track.addCue(cue);
                };
            });
        });
    }

    function makeCue(cuePoint) {
        cuePoint.timeStamp = timeToSeconds(cuePoint.timeStamp);
        console.log(cuePoint.timeStamp);
        var cue = new VTTCue(cuePoint.timeStamp, cuePoint.timeStamp + 2, cuePoint.desc);
        cue.onenter = function() {
            console.log(this.text);
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
            console.log("An error occured: " + xhr.status + " " + xhr.statusText)
            }
        });
    }

    function timeToSeconds(timeStamp) {
      var a = timeStamp.split(':');
      var seconds = (+a[0])*3600 + (+a[1])*60 + (+a[2]);
      return seconds;
    }


    function renderProductInfo(product) {
        var productHTML = Mustache.render("{{desc}},{{price}},<img src='{{imageLink}}'>", product);
        $('#productBox').html(productHTML);
    }

    addCuePoints();

   
});


