import React from 'react';
import '../../src/App.css';

const StartPage = () => {
  return (
    <section className='Page'>
      <section className='wrapper'>
      <div className='toptext'>
        <h1>Welcome to the AI planner</h1>
      </div>

      <div className='top-question'>
        <p>Where and when do you wish to travel?</p>
      </div>

      <section className='form-wrapper'>
        <form>
          <label htmlFor="country">Select a country:</label>
          <select id="country" defaultValue="">
            <option disabled value="">Choose a country</option>
            <option value="usa">USA</option>
            <option value="uk">UK</option>
            <option value="france">France</option>
            
          </select>

          <label htmlFor="city">Select a city:</label>
          <select id="city" defaultValue="">
            <option disabled value="">Choose a city</option>
           
          </select>
        </form>
      </section>

      <section className='date-selector'>
        <form>
          <label htmlFor="start">Arrival Date:</label>
          <input type="date" id="start" name="start" />

          <label htmlFor="end">Departure Date:</label>
          <input type="date" id="end" name="end" />
        </form>
      </section>
    
      </section>
      <button className='btn' onClick="#">Next</button>
    </section>
  );
}

export default StartPage;
