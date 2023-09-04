## Frontend Implementation

The frontend of the collaborative "Watch Party" app is responsible for delivering an interactive and synchronized video-watching experience. Here's an overview of the frontend implementation steps:

### WebSocket Integration

- Utilize the `socket.io-client` library to establish WebSocket connections with the backend.
- Listen for real-time updates from the server and dispatch actions to handle them in the frontend.

### Redux for State Management

- Employ Redux, a state management library, to manage the video state and ensure synchronization with WebSocket updates.
- Create Redux actions to update the state based on WebSocket messages.
- Configure a Redux store and connect your components to it for centralized state management.

### Redux Actions and Reducers

- Define Redux actions and reducers to manage the video state.
- Actions should include updates for video URL, play/pause, seek, and other video-related properties.
- Reducers process these actions and update the Redux store accordingly.

### Configure Redux Store

- Create and configure the Redux store to store and manage the video state.
- Initialize the store with an initial state that includes video URL, play/pause status, and current time.

### Connect Components to Redux

- Use the `connect` function from `react-redux` to connect your React components to the Redux store.
- Access the video state properties from the Redux store and use them to render the video player UI.

### Updating Video State

- When WebSocket updates are received from the server, dispatch the corresponding Redux action (e.g., `updateVideoState`) to update the video state in the Redux store.

### Controlling Video Playback

- Implement the user interface for controlling video playback, including play, pause, seek, and video switching.
- Use the Redux store to manage the video state and ensure seamless interaction.

### Real-Time Interaction

- When a user interacts with the video player controls, send WebSocket actions to notify the server of the action.
- The server broadcasts these actions to all participants, ensuring synchronized video playback.


## Run 

To run the project,  
```bash
npm i
npm start
```