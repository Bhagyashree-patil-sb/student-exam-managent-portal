const express = require('express');
const router = express.Router();

router.get('/startTest', (req, res) => {
    const testQuestions = [
        { question: 'What is 2 + 2?', options: ['3', '4', '5'], answer: '4' },
        { question: 'What is 3 + 5?', options: ['7', '8', '9'], answer: '8' },
    ];
    res.json(testQuestions);
});

module.exports = router;
