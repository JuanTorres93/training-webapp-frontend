import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { selectLastWorkout, finishWorkout } from "../../features/workouts/workoutSlice";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./RunWorkoutPage.module.css";
import GenericList from "../../components/genericList/GenericList";
import ExerciseCompleter from "../../components/exerciseCompleter/ExerciseCompleter";

export default function RunWorkoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lastWorkout = useSelector(selectLastWorkout);
    const activeTemplate = useSelector(selectActiveTemplate);

    const handleFinishWorkout = () => {
        dispatch(finishWorkout());
        navigate('/');
    };

    let exerciseCompleters;

    // If last workout does not exist
    if (!lastWorkout || lastWorkout.exercises.length === 0) {
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
        // group exercises bu order
        const groupedExercises = lastWorkout.exercises.reduce((acc, exercise) => {
            if (!acc[exercise.order]) {
                acc[exercise.order] = [];
            }

            acc[exercise.order].push(exercise);

            return acc;
        }, {});

        // iterate over objects in groupedExercises
        exerciseCompleters = Object.keys(groupedExercises).map((exerciseOrder) => {
            // exercise is a list of sets
            const setExerciseInfo = groupedExercises[exerciseOrder];

            const sets = setExerciseInfo.map((set) => ({
                setNumber: set.set,
                weight: set.weight,
                reps: set.reps,
            }));

            return (
                <ExerciseCompleter
                    key={setExerciseInfo[0].id}
                    exerciseName={setExerciseInfo[0].alias}
                    sets={sets}
                    exerciseId={setExerciseInfo[0].id}
                    exerciseOrder={setExerciseInfo[0].order}
                />
            );
        });
    }

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2 className="heading">Run workout</h2>

                <h3 className="subheading">{activeTemplate.alias}</h3>

                <div className={styles.listContainer}>
                    <GenericList children={exerciseCompleters} />
                </div>

                <button type="button" onClick={handleFinishWorkout}>Finish workout</button>
            </div>
        } />
    );
};
