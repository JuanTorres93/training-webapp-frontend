import { useNavigate } from 'react-router-dom';

import styles from './LastCTA.module.css';

function LastCTA() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/register');
    }

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: `url(/images/lastCTA.png)` }} // Inline style to reference the image in public folder
        >
            <div className={styles.overlay}>
                <h2 className={styles.title}>Track your gains - challenge, improve, and outperform at home</h2>
                <button onClick={handleClick} className={styles.ctaButton}>Join now</button>
            </div>
        </div>
    );
}

export default LastCTA;
