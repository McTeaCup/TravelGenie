import React from "react"
import { Link } from 'react-router-dom';
import { useChoice } from "../components/landingchoice-logic";

function Landing() {
    const { setAiHelp } = useChoice();

    return (
        <div className="box">
            <h1>Welcome!</h1>
            <h4>Do you want to scroll through diffrent options and make your own activity plan or do you want an AI inspired plan</h4>
            <div className="btn-container">
                <Link to={'/destination'}><button onClick={() => setAiHelp(false)}>I want to decide for myself</button></Link>
                <Link to={'/destination'}><button onClick={() => setAiHelp(true)}>AI generate for me!</button></Link>
            </div>

        </div>
    )
}

export default Landing