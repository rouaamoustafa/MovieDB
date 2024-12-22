const express = require('express'); // Import Express
const app = express(); // Create an Express app
const port = 3000; // Define the port your server will listen on

// Route: /test
app.get('/test', (req, res) => {
  res.json({
    status: 200,
    message: "ok"
  });
});

// Route: /time
app.get('/time', (req, res) => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}`; // Format time as HH:MM
  res.json({
    status: 200,
    message: time
  });
});

// Route: /hello/:id
app.get('/hello/:id?', (req, res) => {
  const id = req.params.id || "Guest"; // Get 'id' from the URL or default to 'Guest'
  res.json({
    status: 200,
    message: `Hello, ${id}`
  });
});


// Route: /search
app.get('/search', (req, res) => {
  const search = req.query.s; // Extract 's' query parameter from the URL

  if (search) {
    // If 's' query parameter is provided, respond with status 200
    res.status(200).json({
      status: 200,
      message: "ok",
      data: search
    });
  } else {
    // If 's' query parameter is not provided, respond with status 500
    res.status(500).json({
      status: 500,
      error: true,
      message: "you have to provide a search"
    });
  }
});

// Define a fallback route for unmatched URLs
app.use((req, res) => {
  res.send('ok');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
