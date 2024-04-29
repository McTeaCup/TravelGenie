import React from 'react'
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div>
            <div>
                <h1>Välkommen! Hitta dina favorit aktiviteter Sök nedan</h1>
                <label htmlFor="input" type="input">What City Are You Going To?*</label>
                <input placeholder="Select A City"></input><br />
                <label htmlFor="date">Date:</label>
                <input type="date" name="date" />
            </div>
            <div>
                {/* <div><Link><button>Back</button></Link></div> */}
                <div><Link to="/party"><button type="submit">Submit</button></Link></div>
            </div>
        </div>



    )
}

export default Landing;