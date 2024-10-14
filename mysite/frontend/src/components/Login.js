import { REACT_APP_HOST_IP_ADDRESS } from '../env';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${REACT_APP_HOST_IP_ADDRESS}gallery/api/login/`, {
                username,
                password,
            });
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                alert('Login successful!');
                navigate('/select-ward'); // Redirect to ward selection
            }
        } catch (error) {
            setError(error.response ? error.response.data.detail : 'Login failed');
        }
    };

    const handleSignUpRedirect = () => {
        navigate('/signup'); // Redirect to signup page
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p>Don’t have an account?</p>
            <button onClick={handleSignUpRedirect}>Sign Up</button>
        </div>
    );
};

export default Login;
