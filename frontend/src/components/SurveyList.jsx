import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyList = ({ onSelectSurvey }) => {
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const fetchSurveys = async () => {
            const response = await axios.get('http://localhost:5000/api/surveys');
            setSurveys(response.data);
        };
        fetchSurveys();
    }, []);

    return (
        <div>
            <h1>Available Surveys</h1>
            <ul>
                {surveys.map(survey => (
                    <li key={survey.id} onClick={() => onSelectSurvey(survey.id)}>
                        {survey.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurveyList;
