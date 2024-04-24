import React, { useState, useEffect } from 'react';
import '../../src/App.css';

function EventCard({ event }) {
    return (
        <div className="event-card">
            {event.thumbnail && <img src={event.thumbnail} alt="Event Thumbnail" />}

            <h3>{event.eventName}</h3>
            <p><strong>Venue:</strong> {event.venue}</p>
            <p><strong>City:</strong> {event.venueCity || 'N/A'}</p>
            <p><strong>Address:</strong> {event.venueAddress || 'N/A'}</p>
            <p><strong>Start Time:</strong> {event.startTime}</p>
            <p><strong>End Time:</strong> {event.endTime || 'N/A'}</p>
            <p><strong>Ticket Link:</strong> {event.ticketLink ? event.ticketLink.map((link, i) => (
                <a key={i} href={link.link} target="_blank" rel="noopener noreferrer">{link.source}</a>
            )) : 'N/A'}</p>
        </div>
    );
}

function Home() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [events, setEvents] = useState([]);
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        async function fetchCountries() {
            try {
                const response = await fetch("api/TravelApp/countries");
                const data = await response.json();
                setCountries(data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        }

        fetchCountries();
    }, []);

    useEffect(() => {
        async function fetchCities() {
            if (selectedCountry) {
                try {
                    const response = await fetch(`api/TravelApp/cities?country=${selectedCountry.toLowerCase()}`);
                    const data = await response.json();
                    setCities(data);
                } catch (error) {
                    console.error('Error fetching cities:', error);
                }
            }
        }

        fetchCities();
    }, [selectedCountry]);

    useEffect(() => {
        async function fetchEvents() {
            if (selectedCity && selectedType) {
                try {
                    const response = await fetch(`api/TravelApp/events?type=${selectedType}&city=${selectedCity}`);
                    const data = await response.json();
                    setEvents(data);
                } catch (error) {
                    console.error('Error fetching events:', error);
                }
            }
        }

        fetchEvents();
    }, [selectedCity, selectedType]);

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedCity(""); 
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className="container">
            <h1>Event / Activity</h1>
            <div>
                <label htmlFor="country">Choose a country:</label>
                <select id="country" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">Select a country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select> <br /><br />
            </div> <br /><br />

            <div>
                <label htmlFor="city">Choose a city:</label>
                <select id="city" value={selectedCity} onChange={handleCityChange}>
                    <option value="">Select a city</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div> <br /><br />

            <div>
                <label htmlFor="type">Choose an activity type:</label>
                <select id="type" value={selectedType} onChange={handleTypeChange}>
                    <option value="">Select an activity type</option>
                    <option value="sightseeing">Sightseeing</option>
                    <option value="shopping">Shopping</option>
                    <option value="concert">Concert</option>
                    <option value="Sports">Sport</option>
                    
                </select>
            </div> <br /><br />

            <div className="event-cards-container">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>
    );
}

export default Home;
