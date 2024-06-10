const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// Store user response
router.post('/', async (req, res) => {
    try {
        const { question_id, user_id, response_text } = req.body;
        await pool.query(
            'INSERT INTO Responses (question_id, user_id, response_text) VALUES ($1, $2, $3)',
            [question_id, user_id, response_text]
        );
        res.status(201).send('Response recorded');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get next question based on current response
router.get('/next/:currentQuestionId/:responseText', async (req, res) => {
    try {
        const { currentQuestionId, responseText } = req.params;
        const result = await pool.query(
            'SELECT next_question_id FROM SurveyFlows WHERE current_question_id = $1 AND response_text = $2',
            [currentQuestionId, responseText]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
