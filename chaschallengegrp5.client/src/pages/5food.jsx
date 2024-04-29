import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';
import { Toggle, useSelection } from '../components/button';

function Food() {
    const { answers, setAnswers } = useAnswers();

    const handleFoodSelect = (choice) => {
        setAnswers({ ...answers, food: [...answers.food, choice] })
    };

    const [selectedOption, handleSel] = useSelection();

    return (
        <div>
            <h1>What Kind of Food Do You Want?</h1>
            <div className='btnContainer'>
                {['Vegan', 'Meat & Fish', 'Pizza', 'i eat everything'].map(choice => (
                    <Toggle
                        key={choice}
                        value={choice}
                        selected={selectedOption === choice}
                        handleSel={handleSel}
                        handleChoice={handleFoodSelect}
                    />
                ))}
            </div>
            <div>
                <Link to="/activities"><button type="button">Back</button></Link>
                <Link to="/events"><button type="button">Next</button></Link>
            </div>
        </div>
    );
}
export default Food;