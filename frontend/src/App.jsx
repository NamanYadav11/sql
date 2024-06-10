import React, { useState } from 'react';
import SurveyList from './components/SurveyList.jsx';
import Question from './components/Question.jsx';
import axios from 'axios';

const App = () => {
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [currentQuestionId, setCurrentQuestionId] = useState(null);

    const handleSelectSurvey = async (surveyId) => {
        setSelectedSurvey(surveyId);
        const response = await axios.get(`http://localhost:5000/api/questions/${surveyId}`);
        setCurrentQuestionId(response.data[0].id);
    };

    const handleAnswer = async (questionId, responseText) => {
        const nextQuestion = await axios.get(
            `http://localhost:5000/api/responses/next/${questionId}/${responseText}`
        );
        setCurrentQuestionId(nextQuestion.data.next_question_id);
    };

    return (
        <div className="container mx-auto p-4">
            
            {!selectedSurvey ? (
                <SurveyList onSelectSurvey={handleSelectSurvey} />
            ) : (
                <Question
                    surveyId={selectedSurvey}
                    questionId={currentQuestionId}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    );
};

export default App;
