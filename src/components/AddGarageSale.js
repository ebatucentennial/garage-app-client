import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import axios from '../services/api';
import styles from './AddGarageSale.module.css';

const AddGarageSale = () => {
    const [title, setTitle] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [postalCode, setPostalCode] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    const center = latitude && longitude ? { lat: latitude, lng: longitude } : { lat: 43.6532, lng: -79.3832 };

    const handleAddressChange = async (e) => {
        const input = e.target.value;
        setAddress(input);

        if (input.length > 2) {
            try {
                const response = await axios.get(`/api/google-places/autocomplete`, {
                    params: { input },
                });
                setSuggestions(response.data.predictions);
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        setAddress(suggestion.description);
        setSuggestions([]);

        const placeId = suggestion.place_id;
        try {
            const response = await axios.get('/api/google-places/place-details', {
                params: { place_id: placeId },
            });

            const place = response.data.result;
            setLatitude(place.geometry.location.lat);
            setLongitude(place.geometry.location.lng);

            const postalCodeComponent = place.address_components.find((component) =>
                component.types.includes('postal_code')
            );
            setPostalCode(postalCodeComponent ? postalCodeComponent.long_name : '');
        } catch (error) {
            console.error('Error fetching place details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !startDate || !endDate || !latitude || !longitude || !postalCode || !address) {
            alert('All fields are required.');
            return;
        }

        const newGarageSale = {
            title,
            startDate,
            endDate,
            createdDate: startDate,
            updatedDate: startDate,
            latitude,
            longitude,
            postalCode,
            address,
        };

        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            await axios.post('/api/garage-sales', newGarageSale, { headers });
            alert('Garage sale added successfully!');
            // Reset form
            setTitle('');
            setStartDate('');
            setEndDate('');
            setAddress('');
            setLatitude(null);
            setLongitude(null);
            setPostalCode('');
        } catch (error) {
            console.error('Error adding garage sale:', error);
            alert('Failed to add garage sale.');
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.formTitle}>Add Garage Sale</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Start Date</label>
                    <input
                        type="datetime-local"
                        className={styles.datetimeInput}
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>End Date</label>
                    <input
                        type="datetime-local"
                        className={styles.datetimeInput}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Address</label>
                    <input
                        type="text"
                        className={styles.input}
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                    {suggestions.length > 0 && (
                        <ul className={styles.suggestionsList}>
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.place_id}
                                    className={styles.suggestionItem}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion.description}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {!isLoaded ? (
                    <p className={styles.loadingText}>Loading map...</p>
                ) : (
                    <div className={styles.mapContainer}>
                        <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={center} zoom={15}>
                            {latitude && longitude && <Marker position={{ lat: latitude, lng: longitude }} />}
                        </GoogleMap>
                    </div>
                )}
                <button type="submit" className={styles.submitBtn}>Submit</button>
            </form>
        </div>
    );
};

export default AddGarageSale;
