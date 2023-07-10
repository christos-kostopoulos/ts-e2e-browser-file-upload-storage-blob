// Login form with email and password
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import useSignInWithEmailAndPassword from "../hooks/useSignInWithEmailAndPassword";

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
                        {error && <p>{error.message}</p>}
                    </form>}
                </div >
            </div>
        </div>
    );
};

export default Login;


