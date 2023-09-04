// Define the VideoPlayerState type
export interface VideoPlayerState {
    videoUrl: string;
    isPlaying: boolean;
    playheadPosition: number;
    sessionId: string | null; 
    playheadCurrentTimeInSeconds: number;
  }
  