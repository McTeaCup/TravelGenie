import React, { useState } from 'react';
import style from '../style.module.css'

const useSelection = (initialState = null) => {
    const [selected, setSelected] = useState(initialState);

    const handleSel = (value) => {
        setSelected(value);
    };

    return [selected, handleSel];
};

const Toggle = ({ value, selected, handleSel, handleChoice }) => {
    const buttonStyle = selected ? { border: 'solid 1px black' } : {};

    const handleClick = () => {
        handleSel(value);
        handleChoice(value);
    }

    return (
        //Bootstrap knapp borde kanske ändra 
        <button type="button" className={style.formButton} style={buttonStyle} onClick={handleClick}>{value} </button>
    )
}
export { useSelection, Toggle };