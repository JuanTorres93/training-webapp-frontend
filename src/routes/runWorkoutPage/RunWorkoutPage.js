import { useSelector } from "react-redux";

import { selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { selectLastWorkout } from "../../features/workouts/workoutSlice";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./RunWorkoutPage.module.css";
import GenericList from "../../components/genericList/GenericList";
import ExerciseCompleter from "../../components/exerciseCompleter/ExerciseCompleter";

export default function RunWorkoutPage() {
    // TODO retrieve info from DB
    // const lastWorkout = {
    //     id: 1,
    //     name: "Legs day",
    //     date: "2021-09-01",
    //     exercises: [
    //         {
    //             id: 1,
    //             name: "Squats",
    //             sets: [
    //                 { setNumber: 1, weight: 100, reps: 10 },
    //                 { setNumber: 2, weight: 100, reps: 10 },
    //                 { setNumber: 3, weight: 100, reps: 9 },
    //             ],
    //         },
    //         {
    //             id: 2,
    //             name: "Deadlift",
    //             sets: [
    //                 { setNumber: 1, weight: 120, reps: 10 },
    //                 { setNumber: 2, weight: 120, reps: 9 },
    //                 { setNumber: 3, weight: 120, reps: 9 },
    //             ],
    //         },
    //     ],
    // };

    const lastWorkout = useSelector(selectLastWorkout);
    const activeTemplate = useSelector(selectActiveTemplate);

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
                />
            )
        });
    } else {
        exerciseCompleters = lastWorkout.exercises.map((exercise) => (
            <ExerciseCompleter
                key={exercise.id}
                exerciseName={exercise.name}
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

                <button type="button">Finish workout</button>
            </div>
        } />
    );
};
