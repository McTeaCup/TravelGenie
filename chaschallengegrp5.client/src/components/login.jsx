import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth';




function Login() {
    const navigate = useNavigate();
    const { setSignedIn } = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSignedIn(true);
        navigate(-1);
    }


    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <h3>Sign In</h3>
                    <label htmlFor="email">Email</label>
                    <input id="email" name='email' type='text' />
                    <label htmlFor="password">Password</label>
                    <input type="text" name='password' id='password' />
                    <button type='submit'>Submit</button>
                    <Link to="/signup">Don't have an account? Sign up here</Link>
                </form>
            </div>
    )
}

export default Login;