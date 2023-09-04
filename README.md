## Minimum Feature Set

This section outlines the essential features that the collaborative "Watch Party" app must include to provide a basic and functional experience for users. These features ensure synchronized video playback and a seamless watching experience for all participants.

### 1. Creating a Session

- Users can create a new session by providing a session name and a YouTube video link.
- Upon creating a session, they are automatically redirected to the session's "Watch" page.

### 2. Joining a Session

- Users can join an existing session using a shareable session link.
- When they join a session, they are connected to the ongoing video playback.

### 3. Synchronized Video Playback

- All participants in a session watch the same YouTube video and are kept in sync.
- Play, pause, seek, and video switch actions by one user are immediately reflected for all participants.

### 4. Late Joining

- If a user joins a session after it has started, they join at the current video playback time, not from the beginning.

### 5. Intuitive Player Controls

- Implement intuitive player controls (play, pause, and seek) either using built-in YouTube controls or custom UI elements.

These features constitute the minimum functionality required for the collaborative "Watch Party" app. They ensure that users can create and join sessions, watch videos together in sync, and control the video playback seamlessly.


## Architecture Overview

The collaborative "Watch Party" app follows a client-server architecture with real-time synchronization. Here's how it works:

### Clients (Frontend)

- Users interact with the app through clients.
- Clients can create/join sessions and control video playback.
- Real-time updates are achieved via WebSocket connections with the server.

### Backend Server

- The backend manages the ground truth of video state, including video, playback status, and time.
- It handles session management and initial HTTP requests.
- WebSocket connections with clients enable real-time communication.
- The server broadcasts video state changes to keep all participants in sync.

### Real-Time Communication (Socket.io)

- Socket.io enables real-time bidirectional communication between clients and the server.
- Clients subscribe to video state changes, and the server broadcasts updates.
- This ensures everyone watches the same video in sync.



### BE PORT: 3000 
### FE PORT: 3002



