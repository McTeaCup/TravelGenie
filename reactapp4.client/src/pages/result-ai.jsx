import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import style from '../style.module.css';
import Accordion from '../components/Accordion';

const AiResult = () => {
    const { selectedCity, arrivalDate, departureDate, numberOfDays, selectedType, selectedBudget, numTravelers, selectedInterests } = useParams();
    const [tripPlan, setTripPlan] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchTripPlan = async () => {
            try {
                const response = await axios.get(`/api/TravelApp/tripplan?day=${numberOfDays}&city=${selectedCity}&activities=${selectedInterests}&numberofppl=${numTravelers}&budjet=${selectedBudget}&companions=${selectedType}`);
                setTripPlan(response.data.plan);
                setError('');
            } catch (err) {
                setError('Error retrieving trip plan: ' + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTripPlan();
    }, [selectedCity, arrivalDate, departureDate, numberOfDays, selectedType, selectedBudget, numTravelers, selectedInterests]);

    return (
        <div>
            {loading ? (
                <Accordion items={[{ id: 1, title: 'Loading...', content: 'Loading...' }]} />
            ) : (
                <>
                    {error && <p className={style.error}>{error}</p>}
                    <Accordion
                        items={tripPlan.map((item) => ({
                            id: item.day,
                            title: `Day ${item.day}`,
                            content: item.activities
                        }))}
                    />
                </>
            )}

            <Accordion items={[
                { id: 1, title: 'Accordion 1', content: 'Content 1' },
                { id: 2, title: 'Accordion 2', content: 'Content 2' }
            ]} />
        </div>
    );
};

export default AiResult;
