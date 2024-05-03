import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const useSelection = (initialState = null) => {
    const [selected, setSelected] = useState(initialState);

    const handleSel = (value) => {
        setSelected(value);
    };

    return [selected, handleSel];
};

const Toggle = ({ value, selected, handleSel, handleChoice }) => {
    const buttonStyle = selected ? { backgroundColor: 'lightgray', color: 'black', border: 'solid 1px black' } : {};

    const handleClick = () => {
        handleSel(value);
        handleChoice(value);
    }

    return (
        //Bootstrap knapp borde kanske ändra 
        <button type="button" className="btn btn-outline-secondary" style={buttonStyle} onClick={handleClick}>{value} </button>
    )
}
export { useSelection, Toggle };