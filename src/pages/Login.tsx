// Login form with email and password
import React, { useState } from 'react';
import { auth } from '../firebase';
import useSignInWithEmailAndPassword from "../hooks/useSignInWithEmailAndPassword";
import logo from '../assets/seaquestLogo.png';
const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const handleSubmit = (event: any) => {
        signInWithEmailAndPassword(email, password);
    }


    return (
        <div className="dark-background">
            <div className="login-form-container">
                <div className="form-container" id="login-form">
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
                        <img src={logo} alt={'logo'} style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    {loading ? <p>Loading...</p> : <form onSubmit={handleSubmit}>

                        <label>Email:</label>
                        <input
                            className="primary-input"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>Password:</label>
                        <input
                            type="password"
                            className="primary-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="primary-button" type="submit">Login</button>
                        {error && <p style={{ color: 'red' }}>{error.message}</p>}
                    </form>}
                </div >
            </div>
        </div>
    );
};

export default Login;


