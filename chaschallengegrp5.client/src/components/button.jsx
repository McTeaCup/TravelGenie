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
    const buttonStyle = selected ? { backgroundColor: 'blue', color: 'white' } : {};

    const handleClick = () => {
        handleSel(value);
        handleChoice(value);
    }

    return (
        <Button variant="primary" style={buttonStyle} onClick={handleClick}>{value} </Button>
    )
}
export { useSelection, Toggle };