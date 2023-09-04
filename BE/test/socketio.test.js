const chai = require('chai');
const expect = chai.expect;
const ioClient = require('socket.io-client');

// Replace 'http://localhost:3000' with the URL where your Socket.IO server is running
const socketURL = 'http://localhost:3000';

describe('Socket.IO Tests', () => {
  let client;

  // Before each test, create a new Socket.IO client
  beforeEach(() => {
    client = ioClient.connect(socketURL);
  });

  // After each test, disconnect the Socket.IO client
  afterEach(() => {
    client.disconnect();
  });

  it('should receive a welcome message', (done) => {
    // Listen for the 'welcome' event from the server
    client.on('welcome', (message) => {
      expect(message).to.equal('Welcome to the chat!');
      done(); // Signal that the test is complete
    });
  });
});
