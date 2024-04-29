import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';

import { useSelection, Toggle } from '../components/button';
function Budget() {
    const { answers, setAnswers } = useAnswers();

    const handleBudgetSelect = (choice) => {
        setAnswers({ ...answers, budget: [...answers.budget, choice] })
    };


    const [selectedOption, handleSel] = useSelection();

    return (
        <div>
            <h1>What Is Your Budget?</h1>
            <div className='btnContainer'>
                {['Low', 'Medium', 'High', 'None of your buisness'].map(choice => (
                    <Toggle
                        key={choice}
                        value={choice}
                        selected={selectedOption === choice}
                        handleSel={handleSel}
                        handleChoice={handleBudgetSelect}
                    />
                ))}
            </div>
            <div>
                <Link to="/party"><button type="button">Back</button></Link>
                <Link to="/activites"><button type="button">Next</button></Link>
            </div>
        </div>
    );
}
export default Budget;