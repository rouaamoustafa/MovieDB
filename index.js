const express = require('express'); // Import Express
const app = express(); // Create an Express app
const port = 3000; // Define the port your server will listen on

// Define a route that responds with "ok" for any URL
app.use((req, res) => {
  res.send('ok');
});

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
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
