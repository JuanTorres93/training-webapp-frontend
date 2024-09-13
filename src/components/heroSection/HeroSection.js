import styles from "./HeroSection.module.css";

function HeroSection() {
    return (
        <div className={styles.container}>
            <div className={styles.heroText}>
                Home workouts tracked, progress <span className={styles.heroAccent}>unleashed!</span>
            </div>
            <div className={styles.heroImg}>
                <img src="/images/hero.png" alt="Hero" />
            </div>
        </div>
    );
};

export default HeroSection;
