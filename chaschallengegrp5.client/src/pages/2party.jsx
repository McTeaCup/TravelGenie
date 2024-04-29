import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';
import { useSelection, Toggle } from '../components/button.jsx';

const Party = () => {
    const { answers, setAnswers } = useAnswers();

    const handlePartySelect = (choice) => {
        setAnswers({ ...answers, party: [...answers.party, choice] })
    }


    const [selectedOption, handleSel] = useSelection();

    return (
        <div>
            <div className='progress'>
                <p>Step 2 of 4</p>
                <div className='line' />
            </div>
            <div className='box'>
                <h2>Who do you plan on traveling with on your next adventure?</h2>
                <div className='btnContainer'>
                    {['Solo', 'Couple', 'Family', 'Friends'].map(choice => (
                        <Toggle
                            key={choice}
                            value={choice}
                            selected={selectedOption === choice}
                            handleSel={handleSel}
                            handleChoice={handlePartySelect}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div><Link to="/"><button>Back</button></Link></div>
                <div><Link to="/budget"><button type="submit">Submit</button></Link></div>
            </div>
        </div>
    )
}
export default Party;