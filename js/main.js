var cuePoints;

$.ajax({
  url: "/data/images.json",
  success: function(data) {
    console.log(data);
  },
  error: function(xhr){
            console.log("An error occured: " + xhr.status + " " + xhr.statusText)}
});

$.ajax({
  url: "/data/cuepoints.json",
  success: function(response) {
    console.log(response);
  },
  error: function(xhr){
            console.log("An error occured: " + xhr.status + " " + xhr.statusText)}
});



var video = document.getElementsByTagName('video')[0];

var track = video.addTextTrack('metadata');

function timeToSeconds(time) {
  var a = time.split(':');
  var seconds = (+a[0])*3600 + (+a[1])*60 + (+a[2]);
  return seconds;
}

// console.log(cuePoints);

// var cuePoint = cuepoints.cuepoint[0];
// console.log(cuePoint.timeStamp);
// cuePoint.timeStamp = timeToSeconds(cuePoint.timeStamp);

// var cue = new VTTCue(cuePoint.timeStamp, cuePoint.timeStamp + 2, cuePoint.desc)

// track.addCue(cue); 

// console.log(track);

// cue.onenter = function() {
//   console.log(this.text);
// }

