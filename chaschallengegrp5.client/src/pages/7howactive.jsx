import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';
import { useSelection, Toggle } from '../components/button';

function Active() {
    const { answers, setAnswers } = useAnswers();

    const handleEventSelect = (choice) => {
        setAnswers({ ...answers, active: [...answers.active, choice] })
    };

    const [selectedOption, handleSel] = useSelection();

    return (
        <div>
            <div className='progress'>
                <p>Step 6 of 6</p>
                <div className='line' />
            </div>
            <h1>How many activites do you want?</h1>
            <div className='btnContainer'>
                {['1-2', '2-4', '3-4', '5-6'].map(choice => (
                    <Toggle
                        key={choice}
                        value={choice}
                        selected={selectedOption === choice}
                        handleSel={handleSel}
                        handleChoice={handleEventSelect}
                    />
                ))}
            </div>
            <div>
                <Link to="/events"><button type="button">Back</button></Link>
                <Link to="/summary"><button type="button">Next</button></Link>
            </div>
        </div>
    );
}

export default Active;