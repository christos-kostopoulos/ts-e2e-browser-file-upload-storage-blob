// Login form with email and password
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password);
        // login({
        //     email: email,
        //     password: password
        // });
    };

    useEffect(() => {
        signOut(auth);
    }, []);

    console.log(loading, user);
    return (
        <div className="dark-background">
            <div className="login-form-container">
                <div className="form-container" id="login-form">
                    <h1>Seaquest</h1>
                    {loading ? <p>Loading...</p> : <form onSubmit={handleSubmit}>

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
                    </form>}
                </div >
            </div>
        </div>
    );
};

export default Login;


