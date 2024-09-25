import { useDispatch } from 'react-redux';
import { updateActiveWorkoutExercise } from '../../../features/workouts/workoutSlice';

import styles from './ExerciseCompleterRow.module.css';

function ExerciseCompleterRow({ exerciseId, exerciseOrder, setNumber, placeholderWeight, placeholderReps }) {
    const dispatch = useDispatch();

    const weightId = `weight-${exerciseId}-${exerciseOrder}-${setNumber}`;
    const repsId = `reps-${exerciseId}-${exerciseOrder}-${setNumber}`;

    const handleChange = (event) => {
        const target = event.target;

        // split target.id by '-' and get the last three elements as exerciseId, exerciseOrder and setNumber
        const [_, id, order, set] = target.id.split('-');

        // find weight and reps by target.id
        const weightComponent = document.getElementById(`weight-${id}-${order}-${set}`)
        const repsComponent = document.getElementById(`reps-${id}-${order}-${set}`)

        let weight = weightComponent.value;
        let reps = repsComponent.value;

        weight = weight === '' ? 0 : parseFloat(weight);
        reps = reps === '' ? 0 : parseInt(reps);

        if (weight === 0) {
            weightComponent.style.color = '';
        }
        else if (weight > placeholderWeight) {
            weightComponent.style.color = 'green';
        } else if (weight === placeholderWeight) {
            weightComponent.style.color = '';
        } else {
            weightComponent.style.color = 'red';
        }

        if (reps === 0) {
            repsComponent.style.color = '';
        }
        else if (reps > placeholderReps) {
            repsComponent.style.color = 'green';
        } else if (reps === placeholderReps) {
            repsComponent.style.color = '';
        } else {
            repsComponent.style.color = 'red';
        }

        dispatch(updateActiveWorkoutExercise({
            exerciseId: id,
            exerciseOrder: order,
            setNumber: set,
            weight,
            reps,
        }));
    };

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
                    placeholder={placeholderWeight}
                    onChange={handleChange}
                    inputMode='decimal'
                />
            </div>

            <div className={`${styles.fieldContainer} ${styles.userInput}`}>
                <label htmlFor={repsId} className={styles.label}>Reps</label>
                <input
                    className={styles.inputField}
                    id={repsId}
                    type="number"
                    placeholder={placeholderReps}
                    onChange={handleChange}
                    inputMode='numeric'
                />
            </div>
        </div>
    );
}

export default ExerciseCompleterRow;
