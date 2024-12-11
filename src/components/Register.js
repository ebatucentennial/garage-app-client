import React, { useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await axios.post('/api/auth/register', formData);
            setSuccess('Registration successful! You can now log in.');
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
            setError(
                error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : 'Failed to register. Please check your details.'
            );
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.formTitle}>Register</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {success && <p className={styles.successMessage}>{success}</p>}
            <form onSubmit={handleRegister}>
                <div className={styles.inputGroup}>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} value={formData.username} required />
                </div>
                <div className={styles.inputGroup}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
                </div>
                <div className={styles.inputGroup}>
                    <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} required />
                </div>
                <div className={styles.inputGroup}>
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required />
                </div>
                <div className={styles.inputGroup}>
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required />
                </div>
                <div className={styles.inputGroup}>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
                </div>
                <button type="submit" className={styles.submitBtn}>Register</button>
            </form>
        </div>
    );
};

export default Register;
