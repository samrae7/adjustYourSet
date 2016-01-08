$(document).ready(function() {

    function addCuePoints(cuePoints) {
        var video = document.getElementsByTagName('video')[0];   
        var track = video.addTextTrack('metadata');
        $.when(getData("/data/cuepoints.json")).done(function(response){
            console.log(response);
            var cuePoints = response.cuepoints.cuepoint;
            cuePoints.forEach(function(cuePoint, index){
                var cue = makeCue(cuePoint);
                track.addCue(cue);
            });
        });
    }

    function makeCue(cuePoint) {
        cuePoint.timeStamp = timeToSeconds(cuePoint.timeStamp);
        console.log(cuePoint.timeStamp);
        var cue = new VTTCue(cuePoint.timeStamp, cuePoint.timeStamp, cuePoint.desc);
        cue.onenter = function() {
            console.log(this.text);
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
    
    addCuePoints();

});


