import React from 'react';
import styles from './CTA.module.css';
import { useNavigate } from 'react-router-dom';

function CTA() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/register');
    };

    return (
        <div className={styles.ctaContainer}>
            <p className={styles.ctaText}>Elevate your workouts today!</p>
            <button
                onClick={handleClick}
                className={styles.ctaButton}>
                Get Started
            </button>
        </div>
    );
}

export default CTA;