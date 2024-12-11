import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = ({ onLogin }) => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('/api/auth/login', { identifier, password });
            const { token, seller } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('seller', JSON.stringify(seller));

            if (typeof onLogin === 'function') {
                onLogin(seller);
            }
            
            navigate('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Invalid username/email or password');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.formTitle}>Login</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username or Email</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        type="password"
                        className={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.submitBtn}>Login</button>
            </form>
            <p className={styles.registerLink}>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default Login;
