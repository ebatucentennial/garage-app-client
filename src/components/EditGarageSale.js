import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/api';
import styles from './EditGarageSale.module.css';

const EditGarageSale = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [items, setItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const saleResponse = await axios.get(`/api/garage-sales/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const sale = saleResponse.data;
                setTitle(sale.title);
                setStartDate(new Date(sale.startDate).toISOString().slice(0, 16));
                setEndDate(new Date(sale.endDate).toISOString().slice(0, 16));
                setAddress(sale.address);
                setLatitude(sale.latitude);
                setLongitude(sale.longitude);
                setPostalCode(sale.postalCode);

                const itemsResponse = await axios.get(`/api/items/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setItems(itemsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch garage sale details.');
            }
        };

        fetchData();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `/api/garage-sales/${id}`,
                {
                    title,
                    startDate,
                    endDate,
                    address,
                    latitude,
                    longitude,
                    postalCode,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            alert('Garage sale updated successfully!');
            navigate('/manage-garagesale');
        } catch (error) {
            console.error('Error updating garage sale:', error);
            setError('Failed to update garage sale.');
        }
    };

    const handleDeleteItem = async (itemId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/items/${itemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems(items.filter((item) => item._id !== itemId));
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Failed to delete item.');
        }
    };

    const handleCancel = () => {
        navigate('/manage-garagesale');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Edit Garage Sale</h2>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.formAndItems}>
                <div className={styles.editForm}>
                    <form onSubmit={handleUpdate}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Title:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Start Date:</label>
                            <input
                                type="datetime-local"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>End Date:</label>
                            <input
                                type="datetime-local"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Address:</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Latitude:</label>
                            <input
                                type="number"
                                value={latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Longitude:</label>
                            <input
                                type="number"
                                value={longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Postal Code:</label>
                            <input
                                type="text"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.buttonGroup}>
                            <button
                                type="submit"
                                className={`${styles.button} ${styles.submitButton}`}
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className={`${styles.button} ${styles.cancelButton}`}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                <div className={styles.itemsSection}>
                    <h3 className={styles.itemsTitle}>Items</h3>
                    <ul className={styles.itemList}>
                        {items.map((item) => (
                            <li key={item._id} className={styles.item}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className={styles.itemImage}
                                />
                                <div>
                                    <p>
                                        <strong>{item.name}</strong>
                                    </p>
                                    <p>${parseFloat(item.price).toFixed(2)}</p>
                                </div>
                                <button
                                    className={`${styles.button} ${styles.deleteButton}`}
                                    onClick={() => handleDeleteItem(item._id)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={() => navigate(`/manage-garagesale/${id}/add-item`)}
                        className={styles.addItemButton}
                    >
                        + Add Item
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditGarageSale;
