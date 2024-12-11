import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './GarageSaleCard.module.css';

const GarageSaleCard = ({ sale }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/view-garage-sale/${sale._id}`);
    };

    return (
        <div 
            className={styles.card} 
            onClick={handleClick} 
            role="button" 
            tabIndex={0} 
            onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
        >
            <h4 className={styles.title}>{sale.title}</h4>
            <p className={styles.address}>{sale.address}</p>
            <p className={styles.dates}>
                <strong>Start:</strong> {new Date(sale.startDate).toLocaleString()}
            </p>
            <p className={styles.dates}>
                <strong>End:</strong> {new Date(sale.endDate).toLocaleString()}
            </p>
            <span className={styles.viewDetails}>View Details</span>
        </div>
    );
};

export default GarageSaleCard;
