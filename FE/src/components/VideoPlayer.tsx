import { Box, Button } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import useSocketClient from './useSocketClient';
import { useSelector } from "react-redux";
import { selectVideoPlayerState, selectIsPlaying, selectPlayheadCurrentTimeInSeconds} from '../redux/videoPlayerSlice';

interface VideoPlayerProps {
  url: string;
  hideControls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, hideControls }) => {
  const [hasJoined, setHasJoined] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const socketClient = useSocketClient(); 
  const videoPlayerState = useSelector(selectVideoPlayerState);
  const isPlaying = useSelector(selectIsPlaying);
  const [prevProgress, setPrevProgress] = useState<number | null>(null);
  const playheadCurrentTimeInSeconds = useSelector(selectPlayheadCurrentTimeInSeconds);

  const handleReady = () => {
    setIsReady(true);
  };

  useEffect(() => {
    // Check if the videoplayer reference is available and playheadPosition has changed
    if (playerRef.current) {
      playerRef.current.seekTo(videoPlayerState.playheadPosition + (Math.floor(new Date().getTime() / 1000) - playheadCurrentTimeInSeconds));
    }

  }, [playheadCurrentTimeInSeconds]);

  const handleWatchSession = () => {
    if (socketClient) {
      // Send a Socket.IO message to the server to indicate that the video is paused
      console.log("Joining session: ", videoPlayerState)
      socketClient.emit('joinSession', videoPlayerState.sessionId, videoPlayerState.videoUrl);
    }
    setHasJoined(true)

  }
  

  const handleEnd = () => {
    console.log("Video ended");
  };

  const handleSeek = (seconds: number) => {
    // Ideally, the seek event would be fired whenever the user moves the built in Youtube video slider to a new timestamp.
    // However, the youtube API no longer supports seek events (https://github.com/cookpete/react-player/issues/356), so this no longer works

    // You'll need to find a different way to detect seeks (or just write your own seek slider and replace the built in Youtube one.)
    // Note that when you move the slider, you still get play, pause, buffer, and progress events, can you use those?

    console.log(
      "This never prints because seek decetion doesn't work: ",
      seconds
    );
  };

  const handlePlay = () => {
    console.log(
      "User played video at time: ",
      playerRef.current?.getCurrentTime()
    );
    if (socketClient) {
      // Send a Socket.IO message to the server to indicate that the video is paused
      socketClient.emit('videoEvent', 'play');
    }
  };

  const handlePause = () => {
    console.log(
      "User paused video at time: ",
      playerRef.current?.getCurrentTime()
    );

    if (socketClient) {
      // Send a Socket.IO message to the server to indicate that the video is paused
      socketClient.emit('videoEvent', 'pause');
    }
  };

  const handleBuffer = () => {
    console.log("Video buffered");
  };

  const handleProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    if (prevProgress !== null) {
      const currentTime = state.playedSeconds;
      const timeDifference = Math.abs(currentTime - prevProgress);
      console.log("Time difference: ", timeDifference, currentTime, prevProgress)
      // Define a threshold for what you consider a seek event
      const seekThreshold = 2; // Adjust this value as needed

      if (timeDifference > seekThreshold) {
        // A seek event has occurred
        console.log('Seek event detected.');
        if (socketClient) {
          socketClient.emit('videoEvent', 'seek', currentTime);
        }
      }
    }

    // Update the previous progress
    setPrevProgress(state.playedSeconds);

    console.log("Video progress: ", state);
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        width="100%"
        height="100%"
        display={hasJoined ? "flex" : "none"}
        flexDirection="column"
      >
        <ReactPlayer
          ref={playerRef}
          url={videoPlayerState.videoUrl}
          playing={hasJoined && isPlaying}
          controls={!hideControls}
          onReady={handleReady}
          onEnded={handleEnd}
          onSeek={handleSeek}
          onPlay={handlePlay}
          onPause={handlePause}
          onBuffer={handleBuffer}
          onProgress={handleProgress}
          onError={(e) => console.log("Error: ", e)}
          width="100%"
          height="100%"
          style={{ pointerEvents: hideControls ? "none" : "auto" }}
        />
      </Box>
      {!hasJoined && isReady && (
        // Youtube doesn't allow autoplay unless you've interacted with the page already
        // So we make the user click "Join Session" button and then start playing the video immediately after
        // This is necessary so that when people join a session, they can seek to the same timestamp and start watching the video with everyone else
        <Button
          variant="contained"
          size="large"
          onClick={handleWatchSession}
        >
          Watch Session
        </Button>
      )}
    </Box>
  );
};


export default VideoPlayer;
