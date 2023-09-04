import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setVideoPlayerState } from '../redux/videoPlayerSlice';
import { io, Socket } from 'socket.io-client';
import { VideoPlayerState } from '../types/videoPlayerState';

const useSocketClient = () => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize and connect to the Socket.io server
    console.log('Connecting to server');
    const newSocket = io('http://localhost:3000'); // Replace with your server URL

    newSocket.on('connect', () => {
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    newSocket.on('welcome', () => {
      console.log('welcome from server');
    });

    newSocket.on('connectToRoom', () => {
      console.log('you are in room');
    });

    newSocket.on('syncNewView', (updatedVideoPlayerState: VideoPlayerState)  => {
      console.log('I am a new viewer and updating my playhead');
      // Dispatch the updated state to Redux
      dispatch(setVideoPlayerState(updatedVideoPlayerState));
    });

    // Listen for updates to the VideoPlayerState event
    newSocket.on('videoStateChanged', (updatedVideoPlayerState: VideoPlayerState) => {
      console.log('Received updated VideoPlayerState:', updatedVideoPlayerState);

      // Dispatch the updated state to Redux
      dispatch(setVideoPlayerState(updatedVideoPlayerState));
    });

    setSocket(newSocket);

    // Cleanup the socket connection when the component unmounts
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [dispatch]);

  return socket;
};

export default useSocketClient;
