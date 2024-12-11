// src/components/AddItem.js

import React, { useState } from 'react';
import axios from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AddItem.module.css';

const AddItem = () => {
    const { garageSaleId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('garageSaleId', garageSaleId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        if (image) {
            formData.append('image', image);
        }

        try {
            await axios.post('/api/items', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });
            alert('Item added successfully!');
            navigate(`/manage-garagesale/${garageSaleId}`);
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item.');
        }
    };

    const handleCancel = () => {
        navigate(`/manage-garagesale/${garageSaleId}`);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add Item</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className={styles.textarea}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Price (CAD):</label>
                    <input 
                        type="number"
                        step="0.01"
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        required 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Image:</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        className={styles.input}
                    />
                    {preview && <img src={preview} alt="Preview" className={styles.imagePreview} />}
                </div>
                <div className={styles.buttonGroup}>
                    <button type="submit" className={`${styles.button} ${styles.submitButton}`}>Add Item</button>
                    <button type="button" onClick={handleCancel} className={`${styles.button} ${styles.cancelButton}`}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
