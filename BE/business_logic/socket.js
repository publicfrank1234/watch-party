// Import the required modules
const socketIO = require('socket.io');
const debug = require('debug')('socket');

const VideoPlayerState = require('./VideoPlayerState'); // Import the VideoPlayerState class
const uuid = require('uuid');

// Store VideoPlayerState instances for each session
const sessionStates = new Map(); // Declare sessionStates here in the outermost scope
const sessionSockets = {};

// Function to update and broadcast the video state
function updateAndBroadcastVideoState(
  sessionId,
  videoUrl,
  action,
  data = null
) {
  let videoState = sessionStates.get(sessionId);

  // Create a new VideoPlayerState if it doesn't exist for this session
  if (!videoState) {
    videoState = new VideoPlayerState(videoUrl);
    sessionStates.set(sessionId, videoState);
  }

  if (videoState) {
    switch (action) {
      case 'play':
        videoState.play();
        break;
      case 'pause':
        console.log('paused');
        videoState.pause();
        break;
      case 'seek':
        videoState.seekTo(data);
        break;
      case 'switchVideo':
        videoState.switchVideo(data);
        break;
      default:
      // Handle other actions or errors as needed
    }
  }
  return videoState;
}

// Export a function to initialize Socket.io
module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*', // Replace with the origin of your frontend
      methods: ['GET', 'POST'], // Specify the HTTP methods allowed
      credentials: true, // Allow cookies and credentials to be sent
    },
  });

  io.on('connection', (socket) => {
    socket.id = uuid.v4();

    socket.emit('welcome', 'Welcome to the chat!');

    socket.on('joinSession', (sessionId, videoUrl) => {
      // Join the Socket.io room associated with the session
      if (!sessionSockets[sessionId]) {
        sessionSockets[sessionId] = [];
      } else {
        // Sync the new viewer with current playhead
        const videoState = sessionStates.get(sessionId);
        socket.emit('syncNewViewer', videoState);
      }
      sessionSockets[sessionId].push(socket);

      socket.sessionId = sessionId;
      socket.videoUrl = videoUrl;

      // Handle video-related events
      socket.on('videoEvent', (action, data) => {
        videoState = updateAndBroadcastVideoState(
          socket.sessionId,
          socket.videoUrl,
          action,
          data
        );

        // [TODO]: sockeio room does not send out messages and wasted a lot of time and later to figure out why
        // before: io.to(roomName).emit('videoStateChanged', 'hi');
        // Broadcast the updated state to all sockets in the session using sockets
        sessionSockets[sessionId].forEach((clientSocket) => {
          if (clientSocket !== socket) {
            clientSocket.emit('videoStateChanged', videoState);
          }
        });
      });

      socket.on('disconnect', () => {
        // Remove the user from the room and clean up resources if needed
        const index = sessionSockets[sessionId].indexOf(socket);
        if (index !== -1) {
          sessionSockets[sessionId].splice(index, 1);
        }
        console.log('A user disconnected ', socket.id);
      });
    });
    socket.on('disconnect', () => {
      // Remove the user from the room and clean up resources if needed
      console.log('A user disconnected ', socket.id);
    });
  });
};
