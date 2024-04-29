import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';
import { useSelection, Toggle } from '../components/button';

function Events() {
    const { answers, setAnswers } = useAnswers();

    const handleEventSelect = (choice) => {
        setAnswers({ ...answers, events: [...answers.events, choice] })
    };

    const [selectedOption, handleSel] = useSelection();

    return (
        <div>
            <h1>What kind of events are you interested in?</h1>
            <div className='btnContainer'>
                {['Teather', 'Stand up', 'Sport', 'Everything'].map(choice => (
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
                <Link to="/food"><button type="button">Back</button></Link>
                <Link to="/result"><button type="button">Next</button></Link>
            </div>
        </div>
    );
}

export default Events;