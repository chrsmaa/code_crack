const mongoose = require('mongoose');

const ChoiceSchema = new mongoose.Schema({
    option: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const QuizSchema = new mongoose.Schema({
    question: { 
        type: String, 
        required: true 
    },
    type: { type: String, 
        enum: ['multiple_choice', 'true_false', 'fill_in_the_blank'], 
        required: true 
    },
    choices: { type: [ChoiceSchema], 
        required: function () { 
            return this.type === 'multiple_choice';
         } 
    },
    feedback: { 
        type: String, 
        default: '' 
    },
    explanation: { 
        type: String, 
        default: '' 
    },
    tags: { 
        type: [String], 
        default: []
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});
const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz