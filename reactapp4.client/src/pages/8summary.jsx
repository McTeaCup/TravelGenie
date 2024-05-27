import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';
import { useChoice } from '../components/landingchoice-logic';
import { useSelection } from '../components/button';
import style from '../style.module.css';

function Summary() {
    const { answers, resetAnswers } = useAnswers();
    const { aiHelp } = useChoice();
    const [selected, handleToggle, reset] = useSelection();

    const categories = [
        { title: <>You want to travel to <span className={style.highlight}>{answers.city}</span> in <span className={style.highlight}>{answers.country}</span></>, key: 'destination' },
        { title: <>You will arrive <span className={style.highlight}>{answers.arrivalDate}</span> and leave on <span className={style.highlight}>{answers.departureDate}</span>. And you will stay for <span className={style.highlight}>{answers.numberOfDy}</span> days</>, key: 'numberOfDays' },
        { title: 'You plan to travel with...', key: 'party' },
        { title: 'Your budget is...', key: 'budget' },
        { title: 'You want to explore...', key: 'activities' },
        { title: 'You want to eat...', key: 'food' },
        { title: 'Activites per day', key: 'active' },
        { title: 'The events you want to see are...', key: 'events' }
    ];


    return (
        <div className={style.summary}>
            {categories.map(category => (
                <div key={category.key}>
                    <h1>{category.title}</h1>
                    {Array.isArray(answers[category.key]) ? (
                        answers[category.key].map(item => <button key={item}>{item}</button>)
                    ) : (
                        <p>{answers[category.key]}</p>
                    )}
                </div>
            ))}
            <div>
                <div><Link to="/"><button onClick={resetAnswers} >Exit</button></Link></div>
                {aiHelp !== null && (
                    <Link to={aiHelp ? "/airesult" : "/manresult"}><button>CBA</button></Link>
                )}
            </div>
        </div>
    );
}

export default Summary;