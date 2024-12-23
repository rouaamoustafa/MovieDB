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

//Step 6
// Route: /movies/read/by-date
app.get('/movies/read/by-date', (req, res) => {
  const sortedByDate = [...movies].sort((a, b) => a.year - b.year); 
  res.json({
    status: 200,
    data: sortedByDate
  });
});

// Route: /movies/read/by-rating
app.get('/movies/read/by-rating', (req, res) => {
  const sortedByRating = [...movies].sort((a, b) => b.rating - a.rating);
  res.json({
    status: 200,
    data: sortedByRating
  });
});

// Route: /movies/read/by-title
app.get('/movies/read/by-title', (req, res) => {
  const sortedByTitle = [...movies].sort((a, b) => a.title.localeCompare(b.title)); 
  res.json({
    status: 200,
    data: sortedByTitle
  });
});


//Step 7
app.get('/movies/read/id/<ID>', (req, res) => {
  const movieId = parseInt(req.params.id); 
  const movie = movies.find(m => m.id === movieId); 

  if (search) {
    res.json({
      status: 200,
      data: movie
    });
  } else {
    res.status(404).json({
      status:404, 
      error:true,
      message:`the movie ${movie_id} does not exist`
    });
  }
});

///Using Query:
// app.get('/movies/read', (req, res) => {
//   const movieId = parseInt(req.query.id); // Get the ID from the query string
//   const movie = movies.find(m => m.id === movieId); // Find the movie by its ID

//   if (movie) {
//     res.json({
//       status: 200,
//       data: movie
//     });
//   } else {
//     res.status(404).json({
//       status: 404,
//       error: true,
//       message: `The movie with ID ${movieId} does not exist.`
//     });
//   }
// });

//Step 8
app.get('/movies/add', (req, res) => {
  const { title, year, rating } = req.query;

 
  if (!title || !year || isNaN(year) || year.length !== 4) {
    res.status(403).json({
      status: 403,
      error: true,
      message: 'You cannot create a movie without providing a title and a year'
    });
  }
  else{
    const movieRating = rating ? parseFloat(rating) : 4;

    // Create the new movie object
    const newMovie = {
      id: movies.length + 1,  
      title: title,
      year: parseInt(year),
      rating: movieRating
    };
  
    
    movies.push(newMovie);
  
    // Respond with the updated list of movies
    res.json({
      status: 200,
      data: movies
    });
  }

  
 
});

//Step 9
app.get('/movies/delete/:id', (req, res) => {
  const movieId = parseInt(req.params.id); 
  const movieIndex = movies.findIndex(m => m.id === movieId);
  if (movieIndex === -1) {
    res.status(404).json({
      status: 404,
      error: true,
      message: `the movie ${movieId} does not exist`
    });
  }
  else{
    movies.splice(movieIndex, 1);
    res.json({
      status: 200,
      data: movies
    });
  }
});


//Step 10
// Route: /movies/update/<ID>
app.get('/movies/update/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find(m => m.id === movieId); 

  if (!movie) {
    return res.status(404).json({
      status: 404,
      error: true,
      message: `Movie with ID ${movieId} does not exist`
    });
  }

  const { title, rating } = req.query;
  if (title) {
    movie.title = title; // Update title if provided
  }
  if (rating) {
    movie.rating = parseFloat(rating); // Update rating if provided
  }

  res.json({
    status: 200,
    data: movies
  });
});







// Define a fallback route for unmatched URLs
app.use((req, res) => {
  res.send('ok');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

