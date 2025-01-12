const Quiz = require('../models/quizModel.js');

// Get all quizzes
exports.getAllQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quizzes' });
    }
};

// Get a single quiz by ID
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quiz' });
    }
};

// Get quizzes by tags
exports.getQuizzesByTags = async (req, res) => {
    const { tags } = req.body;
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: 'Tags must be a non-empty array.' });
    }

    try {
        // Find quizzes that match any of the tags in the array
        const quizzes = await Quiz.find({ tags: { $in: tags } });

        if (quizzes.length === 0) {
            return res.status(404).json({ message: 'No quizzes found for the given tags.' });
        }

        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch quizzes by tags', details: error.message });
    }
};


// Create a new quiz
exports.createQuiz = async (req, res) => {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create quiz', details: error.message });
    }
};

// Update a quiz by ID
exports.updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update quiz', details: error.message });
    }
};

// Delete a quiz by ID
exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete quiz' });
    }
};