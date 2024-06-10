import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerOption from './AnswerOption.jsx';

const Question = ({ surveyId, questionId, onAnswer }) => {
    const [question, setQuestion] = useState({});
    const [options, setOptions] = useState([]);
    const [response, setResponse] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            const response = await axios.get(`http://localhost:5000/api/questions/${surveyId}`);
            const currentQuestion = response.data.find(q => q.id === questionId);
            setQuestion(currentQuestion);

            if (currentQuestion.question_type !== 'text') {
                const optionsResponse = await axios.get(`http://localhost:5000/api/questions/options/${questionId}`);
                setOptions(optionsResponse.data);
            }
        };
        fetchQuestion();
    }, [surveyId, questionId]);

    const handleResponse = async () => {
        await axios.post('http://localhost:5000/api/responses', {
            question_id: questionId,
            user_id: 'user123', // Replace with actual user ID
            response_text: response
        });
        onAnswer(questionId, response);
    };

    return (
        <div>
            <h2>{question.question_text}</h2>
            {question.question_type === 'text' ? (
                <textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                />
            ) : (
                options.map((option) => (
                    <AnswerOption key={option.id} option={option} onSelect={setResponse} />
                ))
            )}
            <button onClick={handleResponse}>Next</button>
        </div>
    );
};

export default Question;
