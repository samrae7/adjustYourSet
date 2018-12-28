# Adjust Your Set Developer Assessment

A code test to add cue points to a video. When cues are hit the page displays data fetched from two json files.

## To view this project:
- Clone the repo
- Install dependencies: ```npm install```
- Run ```gulp``` to serve the files (serves on port 9000)

NB: This doesn't currently work in Firefox as Firefox doesn't support VTTCue.onenter(). Working on a different solution for that. Works fine in Chrome and Safari. Haven't tested it on IE yet.

![alt tag](./assets/images/savile-row-screenshot.png)

# Original instructions

This test is designed to assess your JavaScript skills and your approach to a design problem.

Feel free to use libraries to help with your implementation. **Keep in mind we want to assess YOUR JavaScript skills**


## Requirements

Using the video files at http://cdn.adjustyourset.tv/ays-dev-test/videos.zip and the JSON files provided implement a video player that displays product cue points as the video plays.

The finished project should

- allow the viewer to play the full video
- display product cue points at the appropriate times
- not display cue points with a stock value of 100 or less
- allow the viewer to click through to the cuepoint products
- be fully functional in browsers that support HTML video
- use both JSON data files

Good luck!
