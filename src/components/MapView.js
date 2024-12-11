import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import axios from '../services/api';
import GarageSaleCard from './GarageSaleCard';
import styles from './MapView.module.css';

const MapView = () => {
    const [garageSales, setGarageSales] = useState([]);
    const [currentDate] = useState(new Date().toISOString());
    const [selectedSale, setSelectedSale] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        const fetchActiveGarageSales = async () => {
            try {
                const response = await axios.get(`/api/garage-sales/active-garage-sales?currentDate=${currentDate}`);
                setGarageSales(response.data);
            } catch (error) {
                console.error("Error fetching garage sales:", error);
            }
        };
        fetchActiveGarageSales();
    }, [currentDate]);

    const mapContainerStyle = { width: '100%', height: '100%' };
    const center = { lat: 43.6532, lng: -79.3832 }; // Toronto

    const handleMarkerClick = (sale) => {
        setSelectedSale(sale);
    };

    const handleInfoWindowClose = () => {
        setSelectedSale(null);
    };

    if (loadError) return <p className={styles.noSales}>Error loading map.</p>;

    if (!isLoaded) return <p className={styles.noSales}>Loading map...</p>;

    return (
        <div className={styles.mapContainer}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                {garageSales.map((sale) => (
                    <Marker
                        key={sale._id}
                        position={{ lat: sale.latitude, lng: sale.longitude }}
                        onClick={() => handleMarkerClick(sale)}
                    />
                ))}
                {selectedSale && (
                    <InfoWindow
                        position={{ lat: selectedSale.latitude, lng: selectedSale.longitude }}
                        onCloseClick={handleInfoWindowClose}
                    >
                        <GarageSaleCard sale={selectedSale} />
                    </InfoWindow>
                )}
            </GoogleMap>
            {garageSales.length === 0 && !loadError && <p className={styles.noSales}>No active garage sales available.</p>}
        </div>
    );
};

export default MapView;
