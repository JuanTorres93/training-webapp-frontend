import React from 'react';
import styles from './CompetitiveAdvantage.module.css';

function CompetitiveAdvantage({ image, title, description, reverse = false }) {
    return (
        <div className={`${styles.container} ${reverse ? styles.reverse : ''}`}>
            <div className={styles.imageContainer}>
                <img src={image} alt={title} className={styles.image} />
            </div>
            <div className={styles.textContainer}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}


export default CompetitiveAdvantage;