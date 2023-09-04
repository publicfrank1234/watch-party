## Backend Role in Video Synchronization

The backend plays a critical role in ensuring synchronized video playback:

1. **Ground Truth Management**:
   - Maintains the authoritative video state.
   - Validates and updates the ground truth based on client actions.

2. **Broadcasting Updates**:
   - Processes client actions, updates the ground truth, and broadcasts changes to all clients.
   - Clients receive updates and reflect them in their video player UI.

## Backend Technology Stack

The collaborative "Watch Party" app's backend uses:

- **Express.js**:
   - Minimal Node.js framework for handling HTTP requests and routing.
   - Manages RESTful API endpoints and session control.

- **SQLite**: A lightweight and serverless relational database that stores session data for our application. SQLite simplifies the setup and management of our database.

- **Sequelize**: An Object-Relational Mapping (ORM) library for Node.js that streamlines database interactions. We use Sequelize to define models, perform database operations, and manage the schema.

- **Socket.io**:
   - Real-time communication library for WebSocket connections.
   - Facilitates real-time synchronization of video playback and updates between clients and the server.





## Testing

To run the project's tests which use Mocha, 

Open one terminal 
```bash
npm start 
```


Open 2nd terminal 
```bash 
npm test
```

## Run 

To run the project,  
```bash
npm i
npm start
```
