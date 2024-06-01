import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useOverlay } from './overlay';
import style from '../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import logo from '../assets/logo.png';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleOverlay } = useOverlay();

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={style.headerAlign}>
            <div className={style.header}>
                <div className="hamburger">
                    <FontAwesomeIcon icon={faBars} className={style.hamburgerIcon} onClick={toggleMenu} />
                    {isOpen && (
                        <ul>
                            <li>Home</li>
                            <li>About</li>
                            <li>Services</li>
                            <li>Contact</li>
                        </ul>
                    )}
                </div>
                <Link to="/">
                    <img src={logo} className={style.logo} alt="TravelGenie" />
                </Link>
                <div onClick={toggleOverlay}>
                    <FontAwesomeIcon icon={faUser} className={style.profileIcon} />
                </div>
            </div>
        </div>
    );
}

export default Header;
