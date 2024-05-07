import React from "react"
import { Link } from 'react-router-dom';
import { useChoice } from "../components/landingchoice-logic";
import style from '../style.module.css'

function Landing() {
    const { setAiHelp } = useChoice();

    return (
        <div className={style.boxier}>

            <h1 className={style.formTitle}>Welcome!</h1>
            <h4 className={style.formText}>Do you want to scroll through diffrent options and make your own activity plan or do you want an AI inspired plan?</h4>
            <div className={style.btnContainer}>
                <Link to={'/destination'}><button className={style.landButton} onClick={() => setAiHelp(false)}>I want to decide for myself</button></Link>
                <Link to={'/destination'}><button className={style.landButton} onClick={() => setAiHelp(true)}>AI generate for me!</button></Link>
            </div>


        </div>
    )
}

export default Landing