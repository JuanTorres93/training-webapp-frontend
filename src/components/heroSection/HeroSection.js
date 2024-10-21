import styles from "./HeroSection.module.css";
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/register');
    };

    return (
        <div className={styles.container}>
            <div className={styles.heroWrapper}>
                <h1 className={styles.heroText}>
                    <span className={styles.heroMain}>
                        Home workouts tracked, progress
                    </span>
                    <span className={styles.heroAccent}>unleashed!</span>
                </h1>

                <button className={styles.buttonHero} onClick={handleClick}>
                    Elevate your workouts today!
                </button>

            </div>
        </div>
    );
};

export default HeroSection;
