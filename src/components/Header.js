import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Header = ({ loggedIn, onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('seller');
        window.location.href = '/';
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch(searchQuery);
        }
    };

    return (
        <header className={styles.header}>
            <div className="container d-flex align-items-center justify-content-between">
                <div className={styles.logoContainer}>
                    <Link to="/" className="d-flex align-items-center text-decoration-none">
                        <img src={logo} alt="GTA Garage Deals" className={styles.logo} />
                        <div className={styles.titleContainer}>
                            <h1 className={styles.title}>GTA Garage Deals</h1>
                            <span className={styles.subtitle}>Search your hidden treasure around the Greater Toronto Area</span>
                        </div>
                    </Link>
                </div>

                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search..."
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className={styles.searchButton}
                        type="button"
                        onClick={() => onSearch(searchQuery)}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>

                <div className={loggedIn ? styles.btnGroup : styles.authButtons}>
                    {!loggedIn ? (
                        <>
                            <Link to="/login" className={`btn ${styles.btnSignIn}`}>Sign In</Link>
                            <Link to="/add-sale" className={`btn ${styles.btnAddSale}`}>Add Garage Sale</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/manage-garagesale" className={`btn btn-secondary`}>Manage Sales</Link>
                            <Link to="/profile" className={`btn btn-secondary`}>Profile</Link>
                            <Link to="/add-sale" className={`btn btn-secondary`}>Add Garage Sale</Link>
                            <button className={`btn ${styles.btnLogout}`} onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
