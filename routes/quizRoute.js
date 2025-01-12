const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Route to get all quizzes
router.get('/', quizController.getAllQuizzes);

// Route to get a quiz by ID
router.get('/:id', quizController.getQuizById);
router.post('/tags', quizController.getQuizzesByTags);

// Route to create a new quiz
router.post('/', quizController.createQuiz);

// Route to update a quiz by ID
router.put('/:id', quizController.updateQuiz);

// Route to delete a quiz by ID
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;