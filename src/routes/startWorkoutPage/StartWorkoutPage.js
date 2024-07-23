import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import ExerciseProgressPlot from "../../components/exerciseProgressPlot/ExerciseProgressPlot";
import styles from "./StartWorkoutPage.module.css";

import { selectUser } from "../../features/user/userSlice";
import { setActiveTemplate, selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { createWorkout, setLastWorkout } from "../../features/workouts/workoutSlice";

export default function StartWorkoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { templateId } = useParams();

    dispatch(setActiveTemplate(parseInt(templateId)));
    const template = useSelector(selectActiveTemplate);
    const user = useSelector(selectUser);

    const handleStartWorkout = () => {
        dispatch(createWorkout({
            alias: template.alias,
            description: template.description,
        })).then((response) => {
            const workout = response.payload;
            dispatch(setLastWorkout({
                templateId: template.id,
                userId: user.id,
            }));
            navigate(`/runWorkout/${workout.id}`);
        });
    };

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2>Start {template.alias}</h2>

                <ExerciseProgressPlot />

                <button type="button" 
                        className={styles.button}
                        onClick={handleStartWorkout}
                >
                    Start workout
                </button>
            </div>
        } />
    );
};
