import { useSelector } from "react-redux";

import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

import {
    selectRecentWorkouts,
    selectTemplatesLoading
} from "../../features/workoutsTemplates/workoutTemplatesSlice";


export default function HomePage() {
    const recentWorkouts = useSelector(selectRecentWorkouts);
    const templatesLoading = useSelector(selectTemplatesLoading);

    return (
        <PagePresenter showBackButton={false} children={
            <div className={styles.homePageContainer}>
                <h2>Recent workouts</h2>
                {recentWorkouts.length === 0 && <p>No recent workouts</p>}
                {recentWorkouts.length > 0 && <RecentWorkoutsCarousel
                    recentWorkouts={recentWorkouts}
                    isLoading={templatesLoading}
                />}


                <div className={styles.buttonsContainer}>
                    <Link to="createTemplate" className={`primary-button ${styles.squareButton}`} type="button">Create template</Link>
                    <Link to="selectTemplate" className={`primary-button ${styles.squareButton}`} type="button">Select template</Link>
                    <Link to="createExercise" className={`primary-button ${styles.squareButton}`} type="button">Create exercise</Link>
                </div>
            </div>
        } />
    );
};
