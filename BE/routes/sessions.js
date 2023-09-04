const express = require('express');
const router = express.Router();
const { Session } = require('../models'); // Import the Session model

// Create a new session
router.post('/create-session', async (req, res) => {
  try {
    // Get data from the request body
    const { sessionId, videoLink } = req.body;

    // Create a new session in the database
    const session = await Session.create({
      name: sessionId,
      videoLink,
    });

    // Send a response indicating success
    res.status(201).json(session);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while creating the session.' });
  }
});

router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    console.log(sessionId);
    // Query the database to find the session by sessionId
    const session = await Session.findOne({ where: { name: sessionId } });

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Extract the videoLink from the session
    const { videoLink } = session;

    // Send the videoLink in the response
    res.json({ videoLink });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while searching for the session.' });
  }
});

module.exports = router;
