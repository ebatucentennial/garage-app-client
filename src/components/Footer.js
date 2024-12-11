import React from 'react';
import styles from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faFacebookF, 
    faTwitter, 
    faInstagram, 
    faGithub, 
    faLinkedinIn, 
    faYoutube 
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.footerColumn}>
                    <h5 className={styles.footerTitle}>About</h5>
                    <ul className={styles.footerLinks}>
                        <li><a href="/">Services</a></li>
                        <li><a href="/">Portfolio</a></li>
                        <li><a href="/">Pricing</a></li>
                        <li><a href="/">Customers</a></li>
                        <li><a href="/">Careers</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h5 className={styles.footerTitle}>Resources</h5>
                    <ul className={styles.footerLinks}>
                        <li><a href="/">Docs</a></li>
                        <li><a href="/">Blog</a></li>
                        <li><a href="/">eBooks</a></li>
                        <li><a href="/">Webinars</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h5 className={styles.footerTitle}>Contact</h5>
                    <ul className={styles.footerLinks}>
                        <li><a href="/">Help</a></li>
                        <li><a href="/">Sales</a></li>
                        <li><a href="/">Advertise</a></li>
                    </ul>
                </div>
                <div className={styles.footerColumn}>
                    <h5 className={styles.footerTitle}>Stay Updated</h5>
                    <p>Subscribe to our newsletter to get our latest news.</p>
                    <div className={styles.subscribeContainer}>
                        <input 
                            type="email" 
                            className={styles.subscribeInput} 
                            placeholder="Enter email address" 
                            aria-label="Email" 
                        />
                        <button className={styles.subscribeButton} type="button">Subscribe</button>
                    </div>
                </div>
            </div>

            <hr className="bg-secondary" />

            <div className={`container ${styles.footerBottom}`}>
                <div className={styles.socialIcons}>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faFacebookF} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faInstagram} />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </div>
                <div className={styles.footerBottomLinks}>
                    <a href="/">Terms & Conditions</a>
                    <a href="/">Privacy Policy</a>
                    <span>© {currentYear} GTA Garage Sale Deals. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
