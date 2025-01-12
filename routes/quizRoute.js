const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// Quiz Routes
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/tags', quizController.getQuizzesByTags);
router.post('/', quizController.createQuiz);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
