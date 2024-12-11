import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './ManageGarageSales.module.css';

const ManageGarageSales = () => {
    const [garageSales, setGarageSales] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGarageSales = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }
                const response = await axios.get('/api/garage-sales/seller', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setGarageSales(response.data);
            } catch (error) {
                console.error('Error fetching garage sales:', error.message);
            }
        };

        fetchGarageSales();
    }, [navigate]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/garage-sales/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setGarageSales(garageSales.filter((sale) => sale._id !== id));
            alert('Garage sale deleted successfully.');
        } catch (error) {
            console.error('Error deleting garage sale:', error.message);
            alert('Failed to delete garage sale.');
        }
    };

    return (
        <div className={`container ${styles.container}`}>
            <h2 className={styles.title}>Manage Garage Sales</h2>
            {garageSales.length === 0 ? (
                <p className={styles.noSales}>No garage sales found.</p>
            ) : (
                <div className={styles.garageSalesList}>
                    {garageSales.map((sale) => (
                        <div key={sale._id} className={styles.garageSaleCard}>
                            <div className={styles.details}>
                                <h3 className={styles.garageSaleTitle}>{sale.title}</h3>
                                <p className={styles.garageSaleInfo}>
                                    <strong>Address:</strong> {sale.address}
                                </p>
                                <p className={styles.garageSaleInfo}>
                                    <strong>Start Date:</strong>{' '}
                                    {new Date(sale.startDate).toLocaleString()}
                                </p>
                                <p className={styles.garageSaleInfo}>
                                    <strong>End Date:</strong>{' '}
                                    {new Date(sale.endDate).toLocaleString()}
                                </p>
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    className={`${styles.button} ${styles.editButton}`}
                                    onClick={() => navigate(`/manage-garagesale/${sale._id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className={`${styles.button} ${styles.deleteButton}`}
                                    onClick={() => handleDelete(sale._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageGarageSales;
