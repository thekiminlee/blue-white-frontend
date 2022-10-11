import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { login } from '../repositories/auth.repo';


export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const loginResp = await login({
            email,
            password
        });
        if (loginResp.token) {
            setToken(loginResp.token);
        } else {
            setMessage(loginResp.message);
        }
    }

    return (
        <div className='container'>
            {/* Logo */}
            <img style={{width: '200px'}} src={process.env.PUBLIC_URL + '/logo.png'}/>
            {/* Login form */}
            <div className='error-message'>
                {message}
            </div>
            <form className='form-container' onSubmit={handleSubmit}>
                <section>
                    <label>Username</label><br/>
                    <input type='email' onChange={ e=>setEmail(e.target.value) }/>
                </section>
                <section>
                    <label>Password</label><br/>
                    <input type='password' onChange={ e => setPassword(e.target.value) }/>
                </section>
                <br/>
                <button type="submit" className='btn'>Login</button>
            </form>
            <br/>
            <a href="/register">Register</a>
        </div>
    );
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
}