// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const quizRoutes = require('./routes/quizRoute');
const authRoutes = require('./routes/authRoute');

// Initialize the Express app
const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://repatonicole:PPnN2SnABBVhy0pH@codecrack.m9gaj.mongodb.net/?retryWrites=true&w=majority&appName=codecrack", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
