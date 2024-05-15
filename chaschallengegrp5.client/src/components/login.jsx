import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';
import style from '../style.module.css'



function Login() {
    const navigate = useNavigate();
    const { setSignedIn } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSignedIn(true);
        navigate(-1);
    }


    return (
        <div className={style.AccAlign}>
            <form onSubmit={handleSubmit} className={style.AccForm}>
                <h3>Sign In</h3>
                <input className={style.accountInputs} id="email" name='email' type='text' placeholder='Email' />
                <input className={style.accountInputs} type="text" name='password' id='password' placeholder='Password' />
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'>Forgot your password?</a>
                <div className={style.accountContainer}>
                    <button className={style.accountBtn} type='submit'>Submit</button>
                    <Link to="/signup">Dont have an account? Sign up here</Link>
                </div>
            </form>
        </div>
    )
}

export default Login;