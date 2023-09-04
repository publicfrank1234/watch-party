class VideoPlayerState {
  constructor(videoUrl, isPlaying = true, playheadPosition = 0) {
    this.videoUrl = videoUrl;
    this.isPlaying = isPlaying;
    this.playheadPosition = playheadPosition; // in seconds
    this.playheadCurrentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
    }
  }

  pause() {
    if (this.isPlaying) {
      this.isPlaying = false;
    }
  }

  seekTo(positionInSeconds) {
    // Validate the position (e.g., ensure it's within the video duration)
    // Seek to the specified position in the video
    this.playheadPosition = positionInSeconds;
    this.playheadCurrentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
  }

  switchVideo(newVideoUrl) {
    // Switch to a different video
    this.videoUrl = newVideoUrl;
    this.playheadPosition = 0; // Reset playhead position for the new video
  }
}

module.exports = VideoPlayerState;
