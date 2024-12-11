import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useParams } from 'react-router-dom';
import styles from './GarageSaleDetails.module.css';

const GarageSaleDetails = () => {
    const { id } = useParams();
    const [garageSale, setGarageSale] = useState(null);
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        const fetchGarageSaleAndItems = async () => {
            try {
                const saleResponse = await axios.get(`/api/garage-sales/${id}`);
                setGarageSale(saleResponse.data);

                const itemsResponse = await axios.get(`/api/items/${id}`);
                setItems(itemsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchGarageSaleAndItems();
    }, [id]);

    const handleAddItem = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/items', {
                ...newItem,
                garageSaleId: id,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setItems([...items, response.data]);
            setNewItem({ name: '', description: '', price: '' });
        } catch (error) {
            console.error('Error adding item:', error.message);
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
            console.error('Error deleting item:', error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>{garageSale?.title}</h2>
                <p className={styles.address}>{garageSale?.address}</p>
            </div>

            <h3>Items for Sale</h3>
            <div className={styles.itemsList}>
                {items.map((item) => (
                    <div key={item._id} className={styles.itemCard}>
                        <h4>{item.name}</h4>
                        <p>${item.price}</p>
                        {item.description && <p>{item.description}</p>}
                        <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    </div>
                ))}
            </div>

            <h4>Add a New Item</h4>
            <div className={styles.addItemForm}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                />
                <button className={styles.addItemButton} onClick={handleAddItem}>
                    Add Item
                </button>
            </div>
        </div>
    );
};

export default GarageSaleDetails;
