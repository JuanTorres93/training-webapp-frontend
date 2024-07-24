import ExerciseCompleterRow from './exerciseCompleterRow/ExerciseCompleterRow';
import styles from './ExerciseCompleter.module.css'

function ExerciseCompleter({ exerciseName, exerciseId, exerciseOrder, sets = [] }) {
    // sets is a list containing objects with setNumber, weight and reps properties

    // order the sets by setNumber in ascending order
    sets.sort((a, b) => a.setNumber - b.setNumber);

    return (
        <div className={styles.container}>
            <span className={`${styles.exerciseTitle} ${styles.marginLeft}`}>
                {exerciseName.trim()}
            </span>

            {/* For each set in sets, render an ExerciseCompleterRow component */}

            {sets.map((set, index) => (
                <div key={`div-${exerciseName}-${set.setNumber}-${index}`} 
                     className={styles.marginLeft}>
                    <ExerciseCompleterRow
                        setNumber={set.setNumber}
                        placeholderWeight={set.weight}
                        placeholderReps={set.reps}
                        exerciseId={exerciseId}
                        exerciseOrder={exerciseOrder}
                    />
                </div>
            ))}

        </div>
    );
};

export default ExerciseCompleter;
