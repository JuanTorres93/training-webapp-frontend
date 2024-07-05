import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./RunWorkoutPage.module.css";
import GenericList from "../../components/genericList/GenericList";
import ExerciseCompleter from "../../components/exerciseCompleter/ExerciseCompleter";

export default function RunWorkoutPage() {
    // TODO retrieve info from DB
    const lastWorktout = {
        id: 1,
        name: "Legs day",
        date: "2021-09-01",
        exercises: [
            {
                id: 1,
                name: "Squats",
                sets: [
                    { setNumber: 1, weight: 100, reps: 10 },
                    { setNumber: 2, weight: 100, reps: 10 },
                    { setNumber: 3, weight: 100, reps: 9 },
                ],
            },
            {
                id: 2,
                name: "Deadlift",
                sets: [
                    { setNumber: 1, weight: 120, reps: 10 },
                    { setNumber: 2, weight: 120, reps: 9 },
                    { setNumber: 3, weight: 120, reps: 9 },
                ],
            },
        ],
    };

    const exerciseCompleters = lastWorktout.exercises.map((exercise) => (
        <ExerciseCompleter
            key={exercise.id}
            exerciseName={exercise.name}
            sets={exercise.sets}
        />
    ));

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2>Run workout</h2>
                <GenericList children={exerciseCompleters} />
                <button type="button" className={styles.button}>Finish workout</button>
            </div>
        } />
    );
};
