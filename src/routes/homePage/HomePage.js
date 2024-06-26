import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export default function HomePage() {
    // TODO Get recent workouts from redux and DB
    const recentWorkouts = [
        { id: 1, date: "2024-06-05", name: "Push" },
        { id: 2, date: "2024-06-04", name: "Pull" },
        { id: 3, date: "2024-06-03", name: "Leg" },
        { id: 4, date: "2024-06-02", name: "Push" },
        { id: 5, date: "2024-06-01", name: "Pull" },
    ];

    return (
        <div className={styles.homePageContainer}>
            <h2>Recent workouts</h2>
            <RecentWorkoutsCarousel recentWorkouts={recentWorkouts} />

            <div className={styles.buttonsContainer}>
                <Link to="createTemplate" className={`primary-button ${styles.squareButton}`} type="button">Create template</Link>
                <Link to="selectTemplate" className={`primary-button ${styles.squareButton}`} type="button">Select template</Link>
                <Link to="createExercise" className={`primary-button ${styles.squareButton}`} type="button">Create exercise</Link>
            </div>
        </div>
    );
};