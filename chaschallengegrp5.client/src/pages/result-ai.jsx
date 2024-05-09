import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAnswers } from '../components/AnswerContext'
import style from '../style.module.css';

const Card = ({ title, content }) => (
    <div className={style.card}>
        <h3>{title}</h3>
        <p>{content}</p>
    </div>
);

const Dropdown = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className={style.dropdown}>
            <button onClick={toggleDropdown} className={style.button}>
                {label}
            </button>
            {isOpen && <div className={style.content}>{children}</div>}
        </div>
    );
};

function AiResult() {
    const { answers } = useAnswers();
    const [tripPlan, setTripPlan] = useState([]);
    const [error, setError] = useState('');

    const {
        city,
        date,
        party,
        budget,
        activities,
        food,
        active,
        events
    } = answers;

    const prompt = `Generate a trip plan for ${party.length} people in ${city} from ${date} with a budget of ${budget.join(", ")}. Interests include: ${[...activities, ...food, ...active, ...events].join(", ")}.`;

    useEffect(() => {
        const fetchTripPlan = async () => {
            try {
                const response = await axios.post('/api/TravelApp/AItripplan?prompt=' + encodeURIComponent(prompt));
                setTripPlan(response.data.text);
                setError('');
            } catch (err) {
                setError('Error retrieving trip plan: ' + err.message);
            }
        };

        fetchTripPlan();
    }, [city, date, party, budget, activities, food, active, events]);

    return (
        <div>
            {error && <p className={style.error}>{error}</p>}
            {tripPlan.length === 0 ? (
                <p className={style.loading}>Loading trip plan...</p>
            ) : (
                tripPlan.map((dropdown, index) => (
                    <Dropdown key={index} label={dropdown.label}>
                        {dropdown.cards.map((card, idx) => (
                            <Card key={idx} title={card.title} content={card.content} />
                        ))}
                    </Dropdown>
                ))
            )}
        </div>
    );
}

export default AiResult;
