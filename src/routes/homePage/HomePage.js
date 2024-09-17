import { useSelector } from "react-redux";

import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

import {
    selectRecentWorkouts,
    selectTemplatesLoading
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { selectWorkoutsLoading } from "../../features/workouts/workoutSlice";
import { selectExercisesLoading } from "../../features/exercises/exercisesSlice";
import { selectUser } from "../../features/user/userSlice";

import LandingPage from "../landingPage/LandingPage";


export default function HomePage() {
    const user = useSelector(selectUser);
    const recentWorkouts = useSelector(selectRecentWorkouts);
    const templatesLoading = useSelector(selectTemplatesLoading);
    const workoutsLoading = useSelector(selectWorkoutsLoading);
    const exercisesLoading = useSelector(selectExercisesLoading);

    const isLoading = templatesLoading || workoutsLoading || exercisesLoading;

    return (
        <div>
            {user &&
                <PagePresenter showBackButton={false} children={
                    <div className={styles.homePageContainer}>
                        <h2 className="heading">Recent workouts</h2>
                        {recentWorkouts.length === 0 &&
                            <div>
                                {isLoading && <div className="spinner-heading-size"></div>}
                                {!isLoading && <p>No recent workouts</p>}
                            </div>
                        }
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
            }
            {!user && !isLoading && <LandingPage />}
        </div>
    );
};
