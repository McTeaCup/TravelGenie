import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAnswers } from '../components/AnswerContext';
import style from '../style.module.css';
import Accordion from '../components/Accordion'; // Importing the Accordion component

function AiResult() {
    const { answers } = useAnswers();
    const [tripPlan, setTripPlan] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // State to track loading status

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
                setTripPlan(response.data.plan);
                setError('');
                setLoading(false); // Update loading state after fetching data
            } catch (err) {
                setError('Error retrieving trip plan: ' + err.message);
                setLoading(false); // Update loading state in case of error
            }
        };

        fetchTripPlan();
    }, [city, date, party, budget, activities, food, active, events, prompt]);

    return (
        <div>
            {/* Display loading message if loading */}
            {loading && (
                <Accordion items={[{ id: 1, title: 'Loading...', content: 'Loading...' }]} />
            )}
            
            {/* Display error message if there's an error */}
            {error && <p className={style.error}>{error}</p>}
            
            {/* Render Accordion component with trip plan data */}
            <Accordion
                items={tripPlan.map((item) => ({
                    id: item.day,
                    title: loading ? 'Loading...' : `Day ${item.day}`,
                    content: loading ? 'Loading...' : item.activities
                }))}
            />

            {/* Additional Accordions */}   
            <Accordion items={[
                { id: 1, title: 'Accordion 1', content: 'Content 1' },
                { id: 2, title: 'Accordion 2', content: 'Content 2' }
            ]} />
        </div>
    );
}

export default AiResult;
