import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MapView from './components/MapView';
import GarageSaleList from './components/GarageSaleList';
import AddGarageSale from './components/AddGarageSale';
import Login from './components/Login';
import Register from './components/Register';
import ManageGarageSales from './components/ManageGarageSales';
import EditGarageSale from './components/EditGarageSale';
import ProfilePage from './components/ProfilePage';
import AddItem from './components/AddItem';
import ViewGarageSale from './components/ViewGarageSale';
import axios from './services/api';
import './App.css';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setLoggedIn(!!token);
    }, []);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleSearch = async (query) => {
        if (!query) return;
        try {
            const response = await axios.get(`/api/items/search?query=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching items:', error);
            setSearchResults([]);
        }
    };

    return (
        <Router>
            <Header loggedIn={loggedIn} onSearch={handleSearch} />
            <main className="app-main container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                                <div style={{ flex: 2 }}>
                                    <MapView />
                                    <section className="search-results mt-4">
                                        <h3>Search Results</h3>
                                        {searchResults.length === 0 ? (
                                            <p>No results found.</p>
                                        ) : (
                                            <div className="row">
                                                {searchResults.map((item) => (
                                                    <div
                                                        key={item._id}
                                                        className="col-md-6 col-lg-4 mb-4"
                                                        onClick={() =>
                                                            (window.location.href = `/view-garage-sale/${item.garageSaleId._id}`)
                                                        }
                                                    >
                                                        <div className="card h-100">
                                                            <img
                                                                src={item.image || 'https://via.placeholder.com/150'}
                                                                alt={item.name}
                                                                className="card-img-top"
                                                            />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{item.name}</h5>
                                                                <p className="card-text text-truncate">{item.description}</p>
                                                                <p className="card-text">
                                                                    <strong>Price:</strong> ${item.price}
                                                                </p>
                                                                <p className="card-text">
                                                                    <small className="text-muted">
                                                                        Garage Sale: {item.garageSaleId.title}
                                                                    </small>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                </div>
                                <div style={{ flex: 1, overflowY: 'auto', maxHeight: '600px' }}>
                                    <GarageSaleList />
                                </div>
                            </div>
                        }
                    />
                    <Route
                        path="/login"
                        element={loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />}
                    />
                    <Route
                        path="/register"
                        element={loggedIn ? <Navigate to="/" /> : <Register />}
                    />
                    <Route path="/add-sale" element={<AddGarageSale />} />
                    <Route
                        path="/manage-garagesale"
                        element={loggedIn ? <ManageGarageSales /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/manage-garagesale/:id"
                        element={loggedIn ? <EditGarageSale /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/profile"
                        element={loggedIn ? <ProfilePage /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/manage-garagesale/:garageSaleId/add-item"
                        element={loggedIn ? <AddItem /> : <Navigate to="/login" />}
                    />
                    <Route path="/view-garage-sale/:id" element={<ViewGarageSale />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
