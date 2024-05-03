import React from 'react';
import { Link } from 'react-router-dom';
import { useAnswers } from '../components/AnswerContext';

function Result() {
    const { answers } = useAnswers();

    const categories = [
        {title: 'You plan to travel with...', key: 'party'},
        {title: 'Your budget is...', key: 'budget'},
        {title: 'You want to explore...', key: 'activities' },
        {title: 'You want to eat...', key: 'food'},
        {title: 'The events you want to see are...', key: 'events'}
    ];

    return (
        <div>
            <div>Edit</div>

            {categories.map( category => (
                <div>
                    <h1>{category.title}</h1>
                    {answers[category.key].map(item => <button key={item}>{item}</button>)}
                </div>
            ))}

            <div>
                <div><Link to="/"><button>Exit</button></Link></div>
                <Link to=""><button type="button">CTA</button></Link>
            </div>
        </div>
    );
}

export default Result;