// Login form with email and password
import { signinWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // signinWithEmailAndPassword(login, email, password)
     
        login({
            email: email,
            password: password
        });
    };

    return (
        <div className="dark-background">
            <div className="login-form-container">
                <div className="form-container" id="login-form">
                    <h1>Seaquest</h1>
                    <form onSubmit={handleSubmit}>

                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />


                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button type="submit">Login</button>
                    </form>
                </div >
            </div>
        </div>
    );
};

export default Login;


