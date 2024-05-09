import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from './Auth';
import style from '../style.module.css';

function Header() {

    //För BurgerMenu
    const [isOpen, setIsOpen] = useState(false);

    //För signin conditonal rendering
    const { isSignedIn, setSignedIn } = useContext(AuthContext);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const signOut = () => {
        setSignedIn(false);
    }

    return (
        <div className={style.headerAlign}>
            <div className={style.header}>
                <div className="hamburger">
                    <button onClick={toggleMenu}>
                        {isOpen ? 'Close' : 'Menu'}
                    </button>
                    {isOpen && (
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Services</li>
                            <li>Contact</li>
                        </ul>
                    )}
                </div>
                <Link to="/"><img src="" alt="TravelGenie" /></Link>
                <div>
                    {!isSignedIn ? (
                        <Link to="/login"><button onClick={() => console.log('Sign In')}>Sign In</button></Link>
                    ) : (
                        <div>
                            <div>
                                <img src="profile-pic.jpg" alt="Profile" />
                                <p>Profile</p>
                            </div>
                            <button onClick={signOut}>Sign out</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header;