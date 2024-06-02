import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom';
import { useChoice } from "../components/landingchoice-logic";
import style from '../style.module.css'
import Desktop1 from ''

function Landing() {
    const { setAiHelp } = useChoice();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const updateScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
    }

    useEffect(() => {
        window.addEventListener('resize', updateScreenSize);
        return () => window.removeEventListener('resize', updateScreenSize);
    }, []);

    return (
        <div>
            <div className={style.boxTest}>
                <div className={style.form}>
                    <h1 className={style.formTitle}>Welcome!</h1>
                    <h4 className={style.landText}>Plan your trip today!</h4>
                    <div className={style.landingContainer}>
                        <Link to={'/destination'}><button disabled className={style.landButton} onClick={() => setAiHelp(false)}>I want to decide for myself</button></Link>
                        <Link to={'/destination'}><button className={style.landButton} onClick={() => setAiHelp(true)}>AI generate for me!</button></Link>
                    </div>
                </div>
            </div>
            <div className={style.article}>
                <article className={style.art}>
                    <h1 className={style.stepTitle}>How It Works</h1>
                    <div className={style.stepContainer}>

                        <div className={style.step}>
                            <p>4 simple steps to creare an activity plan on your trips! TravelGenie with us!</p>
                            <img src="" alt="How it works image" />
                        </div>
                        <div className={style.stepRev}>
                            <img src="" alt="How it works image" />
                            <p>4 simple steps to creare an activity plan on your trips! TravelGenie with us!</p>
                        </div>
                        <div className={style.step}>
                            <p>4 simple steps to creare an activity plan on your trips! TravelGenie with us!</p>
                            <img src="" alt="How it works image" />
                        </div>
                        <div className={style.stepRev}>
                            <img src="" alt="How it works image" />
                            <p>4 simple steps to creare an activity plan on your trips! TravelGenie with us!</p>
                        </div>
                        <div className={style.landingContainer}>
                            <Link to={'/destination'}><button disabled className={style.landButton} onClick={() => setAiHelp(false)}>I want to decide for myself</button></Link>
                            <Link to={'/destination'}><button className={style.landButton} onClick={() => setAiHelp(true)}>AI generate for me!</button></Link>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Landing