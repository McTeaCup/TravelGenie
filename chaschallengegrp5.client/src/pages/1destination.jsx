import React from 'react';
import { Link } from 'react-router-dom';
import style from '../style.module.css'

function Destination() {
    return (
        <div className={style.boxier}>
            <div className={style.progressContainer}>
                <p className={style.progressText}>1 of 6</p>
                <div className={style.progress}>
                    <div className={style.line} />
                </div>
            </div>

            <h1 className={style.formText}>What city are you going to?</h1>
            <div className={style.inputs}>
                <input className={style.input} placeholder="Select a country" />
                <input className={style.input} placeholder="Select a city" />
                <input className={style.input} type="date" />
            </div>
            <div className={style.btnContainer}>
                <Link to={'/'}><button className={style.desButton}>Back</button></Link>
                <Link to="/party"><button className={style.desButton} type="submit">Next</button></Link>

            </div>
        </div>
    );
}

export default Destination;
