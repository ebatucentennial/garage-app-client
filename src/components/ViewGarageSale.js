import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';
import styles from './ViewGarageSale.module.css';

const ViewGarageSale = () => {
    const { id } = useParams();
    const [garageSale, setGarageSale] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch garage sale details (no auth required)
                const saleResp = await axios.get(`/api/garage-sales/${id}`);
                setGarageSale(saleResp.data);

                // Fetch items for this garage sale (no auth required)
                const itemsResp = await axios.get(`/api/items/${id}`);
                setItems(itemsResp.data);
            } catch (error) {
                console.error('Error fetching garage sale details:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className={`container ${styles.container}`}>
            {garageSale ? (
                <>
                    <div className={`card mb-4 ${styles.saleCard}`}>
                        <div className="card-body">
                            <h2 className="card-title">{garageSale.title}</h2>
                            <p className="card-text"><strong>Address:</strong> {garageSale.address}</p>
                            <p className="card-text">
                                <strong>Start:</strong> {new Date(garageSale.startDate).toLocaleString()}
                            </p>
                            <p className="card-text">
                                <strong>End:</strong> {new Date(garageSale.endDate).toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <h3 className="mb-4">Items for Sale</h3>
                    <div className="row">
                        {items.map((item) => (
                            <div key={item._id} className="col-md-4 mb-4">
                                <div className={`card h-100 ${styles.itemCard}`}>
                                    <img 
                                        src={item.image || 'https://via.placeholder.com/150'} 
                                        alt={item.name} 
                                        className={`card-img-top ${styles.itemImage}`} 
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">
                                            <strong>Price:</strong> ${item.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading garage sale details...</p>
            )}
        </div>
    );
};

export default ViewGarageSale;
