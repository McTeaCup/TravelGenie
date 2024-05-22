import React, { createContext, useContext, useState } from 'react';

export const AnswerContext = createContext();

export const useAnswers = () => useContext(AnswerContext);

export const AnswerProvider = ({ children }) => {
    const initialAnswers = {
        country: '',
        city: '',
        arrivalDate: '',
        departureDate: '',
        numberOfDays: '',
        party: [],
        budget: [],
        activities: [],
        food: [],
        active: [],
        events: []
    };

    const [answers, setAnswers] = useState(initialAnswers);

    const resetAnswers = () => {
        setAnswers(initialAnswers);
    }

    return (
        <AnswerContext.Provider value={{ answers, setAnswers, resetAnswers }}>
            {children}
        </AnswerContext.Provider>
    );
}