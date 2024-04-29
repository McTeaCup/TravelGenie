import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';
import { useSelection, Toggle } from '../components/button';

function Activities() {
    const { answers, setAnswers } = useAnswers();

    const handleActivitiesSelect = (choice) => {
        setAnswers({ ...answers, activities: [...answers.activities, choice] })
    };

    const [selectedOption, handleSel] = useSelection();


    return (
        <div>
            <h1>What Activities Are You Interested In?</h1>
            <div className='btnContainer'>
                {['Stränder', 'Nattliv', 'Mat', 'Adrenalin Höjare', 'Sevärdigheter', 'Evenemang', 'Nöjesparker'].map(choice => (
                    <Toggle
                        key={choice}
                        value={choice}
                        selected={selectedOption === choice}
                        handleSel={handleSel}
                        handleChoice={handleActivitiesSelect}
                    />
                ))}
            </div>
            <div>
                <Link to="/budget"><button type="button">Back</button></Link>
                <Link to="/food"><button type="button">Next</button></Link>
            </div>
        </div>
    );
}
export default Activities;