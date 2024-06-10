const express = require('express');
const pool = require('../db/db');
const router = express.Router();

// Get questions for a specific survey
router.get('/:surveyId', async (req, res) => {
    try {
        const { surveyId } = req.params;
        const result = await pool.query('SELECT * FROM Questions WHERE survey_id = $1', [surveyId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get answer options for a specific question
router.get('/options/:questionId', async (req, res) => {
    try {
        const { questionId } = req.params;
        const result = await pool.query('SELECT * FROM AnswerOptions WHERE question_id = $1', [questionId]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
