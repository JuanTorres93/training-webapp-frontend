import { useSelector } from "react-redux";

import { selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { selectLastWorkout, selectActiveWorkout } from "../../features/workouts/workoutSlice";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./RunWorkoutPage.module.css";
import GenericList from "../../components/genericList/GenericList";
import ExerciseCompleter from "../../components/exerciseCompleter/ExerciseCompleter";

export default function RunWorkoutPage() {
    const lastWorkout = useSelector(selectLastWorkout);
    const activeTemplate = useSelector(selectActiveTemplate);
    const activeWorkout = useSelector(selectActiveWorkout);

    const handleFinishWorkout = () => {
        const workoutId = activeWorkout.id;
        const exercises = activeWorkout.exercises;
    
        // TODO dispatch async action to add exercises to workout
    };

    let exerciseCompleters;

    // If last workout does not exist
    if (lastWorkout.exercises.length === 0) {
        exerciseCompleters = activeTemplate.exercises.map((exercise) => {
            // For each number represented in "sets" create an object
            const sets = Array.from({ length: exercise.sets }, (_, i) => ({
                setNumber: i + 1,
                weight: 0,
                reps: 0,
            }));

            return (
                <ExerciseCompleter
                    key={exercise.id}
                    exerciseName={exercise.alias}
                    sets={sets}
                    exerciseId={exercise.id}
                    exerciseOrder={exercise.order}
                />
            )
        });
    } else {
        // TODO probably I'll have to process this
        exerciseCompleters = lastWorkout.exercises.map((exercise) => (
            <ExerciseCompleter
                key={exercise.id}
                exerciseName={exercise.alias}
                sets={exercise.sets}
            />
        ));
    }

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2>Run workout</h2>

                <div className={styles.listContainer}>
                    <GenericList children={exerciseCompleters} />
                </div>

                <button type="button" onClick={handleFinishWorkout}>Finish workout</button>
            </div>
        } />
    );
};
