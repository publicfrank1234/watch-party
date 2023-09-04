const assert = require('assert');
const { io } = require('socket.io-client');
const { describe, it } = require('mocha'); // For Mocha

// Import your VideoPlayerState class and server setup if needed

describe('Video State Synchronization Tests', function () {
  let client1, client2, client3;

  // Before running the tests, set up your Socket.io clients and connect them to the server
  before(function () {
    console.log('starting all clients');
    client1 = io('http://localhost:3000');
    client2 = io('http://localhost:3000');
    client3 = io('http://localhost:3000');
    console.log('started all clients');
  });

  // After running the tests, disconnect your clients if needed
  after(function () {
    console.log('closing all clients');
    client1.disconnect();
    client2.disconnect();
    client3.disconnect();
    console.log('closed all clients');
  });

  it('should test the video state synchronization', function (done) {
    const sessionId = 'test-session-id';
    const videoUrl = 'test-video-url';

    client1.emit('joinSession', sessionId, videoUrl);
    client2.emit('joinSession', sessionId, videoUrl);
    client3.emit('joinSession', sessionId, videoUrl);

    client1.emit('videoEvent', 'play');
    client2.on('videoStateChanged', (videoState) => {
      console.log('client2', client2);
      assert.equal(videoState.isPlaying, true);
    });
    client3.on('videoStateChanged', (videoState) => {
      console.log('client2', client2);
      assert.equal(videoState.isPlaying, true);
    });

    client1.emit('videoEvent', 'pause');
    client2.on('videoStateChanged', (videoState) => {
      assert.equal(videoState.isPlaying, false);
    });
    client3.on('videoStateChanged', (videoState) => {
      assert.equal(videoState.isPlaying, false);
    });

    setTimeout(() => {
      done();
    }, 1500);
  });
});
