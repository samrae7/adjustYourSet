$(document).ready(function() {

    var video = document.getElementsByTagName('video')[0];   
    var track = video.addTextTrack('metadata');
    var cuePoints;

    function getCuePoints() {
        $.ajax({
          url: "/data/cuepoints.json",
          success: function(response) {
            cuePoints = response.cuepoints.cuepoint;
            console.log(cuePoints);
          },
          error: function(xhr){
                    console.log("An error occured: " + xhr.status + " " + xhr.statusText)}
        });
    }

    function timeToSeconds(timeStamp) {
      var a = timeStamp.split(':');
      var seconds = (+a[0])*3600 + (+a[1])*60 + (+a[2]);
      return seconds;
    }


    function addCuePoints(cuePoints) {
        cuePoints.forEach(function(element, index){
            console.log(timeToSeconds(element.timeStamp));
            element.timeStamp = timeToSeconds(element.timeStamp);
            var cue = new VTTCue(element.timeStamp, element.timeStamp, element.desc)
            cue.onenter = function() {
                console.log(this.text);
            }
            track.addCue(cue);
        });
    }

    video.addEventListener('loadeddata', function() {
        getCuePoints();

        $(document).ajaxStop(function () {
            addCuePoints(cuePoints)
        });
    }, false);

});


