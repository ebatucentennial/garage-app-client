import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { Link } from 'react-router-dom';
import styles from './GarageSaleList.module.css';

const GarageSaleList = () => {
    const [garageSales, setGarageSales] = useState([]);
    const [currentDate] = useState(new Date().toISOString());
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchActiveGarageSales = async () => {
            try {
                const response = await axios.get(`/api/garage-sales/active-garage-sales?currentDate=${currentDate}`);
                setGarageSales(response.data);
            } catch (error) {
                console.error("Error fetching garage sales:", error);
                setError('Failed to load garage sales. Please try again later.');
            }
        };
        fetchActiveGarageSales();
    }, [currentDate]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Active Garage Sales</h2>
            {error && <p className={styles.noSales}>{error}</p>}
            {garageSales.length > 0 ? (
                <div className={styles.saleList}>
                    {garageSales.map((sale) => (
                        <div key={sale._id} className={styles.saleCard}>
                            <h3 className={styles.saleTitle}>
                                <Link to={`/view-garage-sale/${sale._id}`}>
                                    {sale.title}
                                </Link>
                            </h3>
                            <p className={styles.saleDetails}>{sale.address}</p>
                            <p className={styles.saleDetails}>
                                <strong>Start Date:</strong> {new Date(sale.startDate).toLocaleString()}
                            </p>
                            <p className={styles.saleDetails}>
                                <strong>End Date:</strong> {new Date(sale.endDate).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className={styles.noSales}>No active garage sales available.</p>
            )}
        </div>
    );
};

export default GarageSaleList;
