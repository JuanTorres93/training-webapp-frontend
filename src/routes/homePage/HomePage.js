import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RecentWorkoutsCarousel from "../../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

import {
    selectRecentWorkouts,
    selectTemplatesLoading
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { selectWorkoutsLoading } from "../../features/workouts/workoutSlice";
import { selectExercisesLoading } from "../../features/exercises/exercisesSlice";
import { selectUser, loginUser } from "../../features/user/userSlice";

import { userValidationSchema } from "../../validators/userValidator";


export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const recentWorkouts = useSelector(selectRecentWorkouts);
    const templatesLoading = useSelector(selectTemplatesLoading);
    const workoutsLoading = useSelector(selectWorkoutsLoading);
    const exercisesLoading = useSelector(selectExercisesLoading);
    const location = useLocation();

    const isLoading = templatesLoading || workoutsLoading || exercisesLoading;

    useEffect(() => {
        // Crear una instancia de URLSearchParams para obtener los query params
        const queryParams = new URLSearchParams(location.search);

        if (queryParams.size > 0) {
            const userViaOAuth = {
                id: encodeURIComponent(queryParams.get("id")),
                alias: queryParams.get("alias"),
                email: queryParams.get("email"),
                last_name: queryParams.get("last_name"),
                second_last_name: queryParams.get("second_last_name"),
                img: queryParams.get("img"),
                expirationDate: queryParams.get("expirationDate"),
            };
            // Validar el objeto `user`
            userValidationSchema.validate(userViaOAuth)
                .then((validatedData) => {
                    dispatch(loginUser({
                        userIdOAuth: validatedData.id,
                    })).then((response) => {
                        navigate("/");
                    });
                })
        }
    }, [location]);

    return (
        <div>
            {!user && !isLoading && navigate("/")}
            {user &&
                <PagePresenter showBackButton={false} children={
                    <div className={styles.homePageContainer}>
                        <h2 className="heading">Recent workouts</h2>
                        {recentWorkouts.length === 0 &&
                            <div>
                                {isLoading && <div className="spinner-heading-size"></div>}
                                {!isLoading && <p style={{ marginTop: "1.5rem" }}>No recent workouts</p>}
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
        </div>
    );
};
