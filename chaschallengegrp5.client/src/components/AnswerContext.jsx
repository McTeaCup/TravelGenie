import React, {createContext, useContext, useState } from 'react';
import Activities from '../pages/4activites';

export const AnswerContext = createContext();

export const useAnswers = () => useContext(AnswerContext);

export const AnswerProvider = ({ children }) => {
    const [answers, setAnswers] = useState({
        city: '',
        date: '',
        party: [],
        budget: [],
        activities: [],
        food: [],
        events: []
    });

    return (
        <AnswerContext.Provider value={{answers, setAnswers}}>
            {children}
        </AnswerContext.Provider>
    );
}