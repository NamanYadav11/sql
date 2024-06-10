CREATE TABLE Surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE Questions (
    id SERIAL PRIMARY KEY,
    survey_id INTEGER REFERENCES Surveys(id),
    question_text VARCHAR(255) NOT NULL,
    question_type VARCHAR(50) CHECK (question_type IN ('text', 'multiple_choice', 'single_choice'))
);

CREATE TABLE AnswerOptions (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES Questions(id),
    option_text VARCHAR(255) NOT NULL
);

CREATE TABLE Responses (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES Questions(id),
    user_id VARCHAR(255) NOT NULL,
    response_text VARCHAR(255) NOT NULL
);

CREATE TABLE SurveyFlows (
    id SERIAL PRIMARY KEY,
    current_question_id INTEGER REFERENCES Questions(id),
    response_text VARCHAR(255),
    next_question_id INTEGER REFERENCES Questions(id)
);

-- Insert sample data
INSERT INTO Surveys (title) VALUES ('Customer Satisfaction Survey');

INSERT INTO Questions (survey_id, question_text, question_type) VALUES 
(1, 'How satisfied are you with our service?', 'single_choice'),
(1, 'Please describe your experience.', 'text'),
(1, 'Would you recommend us to others?', 'single_choice');

INSERT INTO AnswerOptions (question_id, option_text) VALUES 
(1, 'Very satisfied'),
(1, 'Satisfied'),
(1, 'Neutral'),
(1, 'Dissatisfied'),
(1, 'Very dissatisfied'),
(3, 'Yes'),
(3, 'No');

INSERT INTO SurveyFlows (current_question_id, response_text, next_question_id) VALUES 
(1, 'Very satisfied', 3),
(1, 'Satisfied', 3),
(1, 'Neutral', 2),
(1, 'Dissatisfied', 2),
(1, 'Very dissatisfied', 2);
