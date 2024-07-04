import styles from './ExerciseCompleter.module.css'

function ExerciseCompleter({ id }) {
    // TODO Fetch from DB
    const lastWorktout = {
        "id": 0,
        "alias": "string",
        "description": "string",
        "exercises": [
          {
            "id": 0,
            "alias": "string",
            "set": 0,
            "reps": 0,
            "weight": 0,
            "time_in_seconds": 0
          }
        ]
    };

    const exercises = lastWorktout.exercises.reduce((acc, exercise) => {
        if (!acc[exercise.id]) {
            acc[exercise.id] = [];
        }
        acc[exercise.id].push(exercise);
        return acc;
    }, {});

    // The ExercisePresenter component renders the name and description of an exercise.
    return (
        <div>
            {/* Rectangular component with one row for the exercise name. After that dynamically generated rows with fields for set number, weight used and reps carried out */}

            <div className={styles.container}>
                <h2>{name}</h2>
                {exercises.map((exercise, index) => (
                    <div key={index} className={styles.row}>
                        <p>{index + 1}</p>
                        <p>{exercise.weight}</p>
                        <p>{exercise.reps}</p>
                    </div>
                ))}
                </div>

        </div>
    );
};

export default ExerciseCompleter;
