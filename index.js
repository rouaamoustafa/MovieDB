const express = require('express'); // Import Express
const app = express(); // Create an Express app
const port = 3000; // Define the port your server will listen on


//Step 3
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
//Step 4
//1
// Route: /hello/:id
app.get('/hello/:id?', (req, res) => {
  const id = req.params.id || "Guest"; // Get 'id' from the URL or default to 'Guest'
  res.json({
    status: 200,
    message: `Hello, ${id}`
  });
});

//2
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

//Step 5
//1
const movies = [
  { title: 'Jaws', year: 1975, rating: 8 },
  { title: 'Avatar', year: 2009, rating: 7.8 },
  { title: 'Brazil', year: 1985, rating: 8 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]
// Route: /movies/create
app.get('/movies/create', (req, res) => {
  res.send('Movies: Create route');
});

// Route: /movies/read
app.get('/movies/read', (req, res) => {
  res.json({
    status: 200,
    data:movies,
  });
   
});

// Route: /movies/update
app.get('/movies/update', (req, res) => {
  res.send('Movies: Update route');
});

// Route: /movies/delete
app.get('/movies/delete', (req, res) => {
  res.send('Movies: Delete route');
});







// Define a fallback route for unmatched URLs
app.use((req, res) => {
  res.send('ok');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
