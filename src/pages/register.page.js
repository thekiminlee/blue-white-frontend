import React, { useState } from 'react';
import { register } from '../repositories/auth.repo';
import { useNavigate } from 'react-router-dom';

export default function Register({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const handleRegister = async e => {
        e.preventDefault();
        let payload = {
            "name": {
                "first": firstName,
                "last": lastName
            },
            "email": email,
            "password": password,
            "phone": phoneNumber,

            "balance": "$0",
            "company": "",
            "eyeColor": "",
            "isActive": false,
            "picture": "",
            "age": 0,
            "address": ""
        }

        const registerResp = await register(payload);
        if (registerResp.registrationSuccess) {
            setToken(registerResp.token);
            navigate('/');
        } else {
            setMessage(registerResp.message);
        }
    }
    
    return (
        <div className='container'>
            <form className='form-container' onSubmit={handleRegister}>
                <section>
                    <label>Email</label><br/>
                    <input required type="email" onChange={ e => setEmail(e.target.value)}></input><br/>
                </section>
                
                <section>
                    <label>Password</label><br/>
                    <input required type="password" onChange={ e => setPassword(e.target.value)}></input><br/>
                </section>

                <section>
                    <label>First Name</label><br/>
                    <input required type="text" onChange={ e => setFirstName(e.target.value)}></input><br/>
                </section>

                <section>
                    <label>Last Name</label><br/>
                    <input required type="text" onChange={ e => setLastName(e.target.value)}></input><br/>
                </section>

                <section>
                    <label>Phone number</label><br/>
                    <input required type="tel" maxLength={10} onChange={ e => setPhoneNumber(e.target.value)}></input><br/>
                </section>

                <br/>
                <div className='error-message'>{message}</div>
                <button type="submit" className='btn'>Register</button>
            </form>
        </div>
    )
}