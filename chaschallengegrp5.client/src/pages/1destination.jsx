import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from '../style.module.css'

function Destination() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, SetDepatureDate] = useState("");
    const [numberOfDays, setNumberOfDays] = useState(0);

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await fetch("api/TravelApp/countries");
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error("error fetching countries", error);
            }
        }
    }, []);

    useEffect(() => {
        async function fetchCities() {
            if (selectedCountry) {
                try {
                    const response = await fetch(`api/TravelApp/cities?country=${selectedCountry.toLowerCase()}`);
                    const data = await response.json();
                    setCities(data);
                } catch (error) {
                    console.error("Error fetching cities", error);
                }
            }
        }
        fetchCities();
    }, [selectedCountry]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedCity("");
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleDateChange = (event) => {
        if (event.target.name === 'start') {
            setArrivalDate(event.target.value);
        } else if (event.target.name === 'end') {
            SetDepatureDate(event.target.value);
        }
    };

    const handleNextButtonClick = () => {
        if (selectedCountry && selectedCity && arrivalDate && departureDate) {
            const arrival = new Date(arrivalDate);
            const departure = new Date(departureDate);
            const numberOfDays = Math.floor((departure - arrival) / (1000 * 60 * 60 * 24));
            setNumberOfDays(numberOfDays);
            navigate(`/second-page/${selectedCountry}/${selectedCity}/${arrivalDate}/${departureDate}/${numberOfDays}`);
        } else {
            alert("Please fill in all fields.");
        }
    };



    return (
        <div className={style.mainContainer}>
            <div className={style.imgBox}></div>
            <div className={style.box}>
                <div className={style.progressContainer}>
                    <p className={style.progressText}>1 of 7</p>
                    <div className={style.progress}>
                        <div className={style.line1} />
                    </div>
                </div>

                <div className={style.inputs}>
                    <label htmlFor="country">Select a country:</label>
                    <select className={style.select} id="country" value={selectedCountry} onChange={handleCountryChange}>
                        <option value="">Select a country</option>
                        {countries.map((country, index) => (
                            <option key={index} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="city">Select a city:</label>
                    <select className={style.select} id="city" value={selectedCity} onChange={handleCityChange}>
                        <option value="">Select a city</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={style.inputs}>
                    <label htmlFor="start">Arrival Date:</label>
                    <input type="date" id="start" name="start" onChange={handleDateChange} />

                    <label htmlFor="end">Departure Date:</label>
                    <input type="date" id="end" name="end" onChange={handleDateChange} />
                </div>
                <div className={style.btnContainer}>
                    <Link to={'/'}><button className={style.desButton}>Back</button></Link>
                    <Link to="/party"><button className={style.desButton} type="submit">Next</button></Link>

                </div>
            </div>
        </div>
    );
}

export default Destination;
