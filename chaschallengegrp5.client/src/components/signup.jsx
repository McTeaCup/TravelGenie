import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from '../style.module.css'



function Signup() {
    return (
        <div className={style.AccAlign}>
            <form className={style.AccForm}>
                <h3>Sign Up </h3>
                <input className={style.accountInputs} id="email" name='email' type='text' placeholder='Email' />
                <input className={style.accountInputs} type="text" name='password' id='password' placeholder='Password' />
                <input className={style.accountInputs} type="text" name='password' id='password' placeholder='Confirm Password' />
                <div className={style.accountContainer}>
                    <button className={style.accountBtn} type='submit'>Submit</button>
                    <Link to="/signup">Already have an account? </Link>
                </div>
            </form>
        </div >

    );
}


export default Signup;