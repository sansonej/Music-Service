// server.js
const express = require('express');
const path = require('path');
const { searchTracks } = require('./music'); // Import the search function from music.js

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Search route
app.get('/search', async (req, res) => {
  const query = req.query.q; // Get the search query from the URL

  if (!query) {
    return res.status(400).send('Query parameter "q" is required');
  }

  try {
    const results = await searchTracks(query); // This will automatically fetch the access token
    res.json(results); // Send the results as JSON
  } catch (error) {
    res.status(500).send('Error searching tracks');
  }
});

// Start the server on port 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
