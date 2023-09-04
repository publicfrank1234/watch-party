import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VideoPlayerState } from "../types/videoPlayerState";
import { RootState } from './store'; 


const initialState: VideoPlayerState = {
  sessionId: null, // Initialize sessionId as null
  videoUrl: "",
  isPlaying: true,
  playheadPosition: 0,
  playheadCurrentTimeInSeconds: 0, // Add this property
};

const videoPlayerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {
    setVideoUrl: (state, action: PayloadAction<string>) => {
      state.videoUrl = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      console.log("setIsPlaying", action.payload);
      state.isPlaying = action.payload;
    },
    setPlayheadPosition: (state, action: PayloadAction<number>) => {
      state.playheadPosition = action.payload;
    },
    setVideoPlayerState: (state, action: PayloadAction<VideoPlayerState>) => {
      // Always replace the entire state with the new state
      return action.payload;
    },
    setSessionId: (state, action: PayloadAction<string | null>) => {
      state.sessionId = action.payload;
    },
  },
});

export const {
  setVideoUrl,
  setIsPlaying,
  setPlayheadPosition,
  setVideoPlayerState,
  setSessionId,
} = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;

// Define a selector to select the isPaused state
export const selectVideoPlayerState = (state: RootState) => state.videoPlayer;
export const selectIsPlaying = (state: RootState) => state.videoPlayer.isPlaying;
export const selectPlayheadCurrentTimeInSeconds = (state: RootState) => state.videoPlayer.playheadCurrentTimeInSeconds;