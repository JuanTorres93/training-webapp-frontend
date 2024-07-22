import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import ExerciseProgressPlot from "../../components/exerciseProgressPlot/ExerciseProgressPlot";
import styles from "./StartWorkoutPage.module.css";

import { setActiveTemplate, selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { createWorkout } from "../../features/workouts/workoutSlice";

export default function StartWorkoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { templateId } = useParams();

    dispatch(setActiveTemplate(parseInt(templateId)));
    const template = useSelector(selectActiveTemplate);

    const handleStartWorkout = () => {
        dispatch(createWorkout({
            alias: template.alias,
            description: template.description,
        })).then((response) => {
            const workout = response.payload;
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
