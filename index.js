// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoute');
const authRoutes = require('./routes/authRoute');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to ensure DB connection is available before processing routes
mongoose
  .connect("mongodb+srv://test:test@code-crack.z7pjg.mongodb.net/?retryWrites=true&w=majority&appName=Code-Crack")
  .then(() => console.log('MongoDB Connected'.green))
  .catch((err) => console.log("Error:", err.red));

  app.use(bodyParser.json());
  app.use(cors());


app.use('/api/quizzes', quizRoutes);
app.use('/api/users', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
