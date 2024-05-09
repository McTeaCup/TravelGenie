import React, { useState } from 'react';
import style from '../style.module.css';

const Card = ({ title, content }) => (
    <div className={style.card}>
        <h3>{title}</h3>
        <p>{content}</p>
    </div>
);

const Dropdown = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className={style.dropdown}>
            <button onClick={toggleDropdown} className={style.button}>
                {label}
            </button>
            {isOpen && <div className={style.content}>{children}</div>}
        </div>
    );
};


//TEST DATA

const data = [
    {
        label: "Day 1",
        cards: [
            { title: "Stockholms Akvarium", content: "Finaste Fiskarna i världen" },
            { title: "Gröna Lund", content: "Välkommen till Gröna Lund tivolii. Upplev 27 adrenalinhöjande attraktioner. Kul för hela familjen" },
        ]
    },
    {
        label: "Day 2",
        cards: [
            { title: "Cirkus konsert", content: "upplev Lady Gagas nyaste hits och hennes mest populära låtar på Cirkus i Stockholm" },
            { title: "Gud", content: "TBH jag kan inte komma på vad mer för aktiviter som finns" },
            { title: "ide", content: "Vi skulle behöva nån sorts hemsida som hittar aktiviter åt en så man inte behöver söka själv" },
            { title: "Lorem", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est pariatur inventore natus ratione obcaecati quaerat corrupt" },
            { title: "Loren", content: "Finland e knäppa på eurovision" }
        ]
    },
    {
        label: "Day 3",
        cards: [
            { title: "Test", content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est pariatur inventore natus ratione obcaecati quaerat corrupt" },
            { title: "League of Long Names", content: "Hur långt namn kan en title/beskrivning vara" },
            { title: "vi borde kanske sätta en gräns", content: "Så vi inte får några konsitga namn" },
            { title: "Welsh City", content: "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch" },
            { title: "yes", content: "Det är en äkta stad i storbritanien" },
        ]
    },
]

function AiResult() {

    return (
        <div >
            {data.map((dropdown, index) => (
                <Dropdown key={index} label={dropdown.label}>
                    {dropdown.cards.map((card, idx) => (
                        <Card key={idx} title={card.title} content={card.content} />
                    ))}
                </Dropdown>
            ))}
        </div>
    )
}

export default AiResult;