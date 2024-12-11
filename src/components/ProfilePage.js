import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const response = await axios.get('/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const user = response.data;
                setFormData({
                    username: user.username,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: '',
                    confirmPassword: '',
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { password, confirmPassword } = formData;

        if (password && password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const { confirmPassword, ...updateData } = formData;

            const response = await axios.put('/api/auth/profile', updateData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const updatedUser = response.data;
            localStorage.setItem('seller', JSON.stringify(updatedUser));
            setSuccess('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.response && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError('Failed to update profile.');
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Profile</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            {success && <p className={styles.successMessage}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Email</label>
                    <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Phone Number</label>
                    <input 
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>First Name</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={styles.input}
                        required 
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>New Password (leave blank if not changing)</label>
                    <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Confirm Password</label>
                    <input 
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>Update Profile</button>
            </form>
        </div>
    );
};

export default ProfilePage;
