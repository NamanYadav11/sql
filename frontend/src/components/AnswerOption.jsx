import React from 'react';

const AnswerOption = ({ option, onSelect }) => {
    return (
        <div>
            <input
                type="radio"
                name="answer"
                value={option.option_text}
                onChange={(e) => onSelect(e.target.value)}
            />
            <label>{option.option_text}</label>
        </div>
    );
};

export default AnswerOption;
