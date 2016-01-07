var video;
var track;

function getVideoTime() { 
    var time = video.currentTime;
    console.log(time);
}
video = document.getElementsByTagName('video')[0];
//video.addEventListener('click', getVideoTime);

track = video.addTextTrack('metadata');

var cue = new VTTCue(18.7, 21.5, "This blade has a dark past.")

 track.addCue(cue); 

//track.addCue(new TextTrackCue(18.7, 21.5, "Test text"));

console.log(track);

cue.onenter = function() {
  console.log(this.text);
}

