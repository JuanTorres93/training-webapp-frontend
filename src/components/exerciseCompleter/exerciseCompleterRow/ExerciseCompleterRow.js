import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateActiveWorkoutExercise } from '../../../features/workouts/workoutSlice';
import styles from './ExerciseCompleterRow.module.css';

function ExerciseCompleterRow({ exerciseId, exerciseOrder, setNumber, placeholderWeight, placeholderReps }) {
    const dispatch = useDispatch();

    const [weight, setWeight] = useState('');
    const [reps, setReps] = useState('');

    const weightId = `weight-${exerciseId}-${exerciseOrder}-${setNumber}`;
    const repsId = `reps-${exerciseId}-${exerciseOrder}-${setNumber}`;

    const handleWeightChange = (event) => {
        const newWeight = event.target.value;
        setWeight(newWeight);
        updateWorkout(newWeight, reps);
    };

    const handleRepsChange = (event) => {
        const newReps = event.target.value;
        setReps(newReps);
        updateWorkout(weight, newReps);
    };

    const updateWorkout = (newWeight, newReps) => {
        const newWeightProcessed = newWeight === '' ? 0 : parseFloat(newWeight);
        const newRepsProcessed = newReps === '' ? 0 : parseInt(newReps);

        dispatch(updateActiveWorkoutExercise({
            exerciseId,
            exerciseOrder,
            setNumber,
            weight: newWeightProcessed,
            reps: newRepsProcessed,
        }));
    };

    const weightColor = weight == placeholderWeight
        ? ''
        : weight > placeholderWeight
            ? styles.progressing
            : styles.notProgressing;

    const repsColor = weightColor === styles.progressing
        ? styles.progressing
        : reps == placeholderReps
            ? ''
            : reps > placeholderReps
                ? styles.progressing
                : styles.notProgressing;

    return (
        <div className={styles.row}>
            <div className={`${styles.fieldContainer} ${styles.setShow}`}>
                <span className={styles.label}>Set</span>
                <span className={styles.bold}>{setNumber}</span>
            </div>

            <div className={`${styles.fieldContainer} ${styles.userInput}`}>
                <label htmlFor={weightId} className={styles.label}>Weight</label>
                <input
                    className={styles.inputField}
                    id={weightId}
                    type="number"
                    inputMode='decimal'
                    placeholder={placeholderWeight}
                    value={weight}
                    onChange={handleWeightChange}
                />
                <span className={`${styles.label} ${weightColor} ${styles.bold}`}>
                    ({placeholderWeight} prev)
                </span>
            </div>

            <div className={`${styles.fieldContainer} ${styles.userInput}`}>
                <label htmlFor={repsId} className={styles.label}>Reps</label>
                <input
                    className={styles.inputField}
                    id={repsId}
                    type="number"
                    inputMode='numeric'
                    placeholder={placeholderReps}
                    value={reps}
                    onChange={handleRepsChange}
                />
                <span
                    className={`${styles.label} ${repsColor} ${styles.bold}`}>
                    ({placeholderReps} prev)
                </span>
            </div>
        </div>
    );
}

export default ExerciseCompleterRow;
