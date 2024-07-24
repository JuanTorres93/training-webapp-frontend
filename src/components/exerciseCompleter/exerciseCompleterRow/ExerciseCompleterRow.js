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
        let weight = document.getElementById(`weight-${id}-${order}-${set}`).value;
        let reps = document.getElementById(`reps-${id}-${order}-${set}`).value;

        dispatch(updateActiveWorkoutExercise({
            exerciseId: id,
            exerciseOrder: order,
            setNumber: set,
            weight: weight === '' ? 0 : weight,
            reps: reps === '' ? 0 : reps,
        }));
    };

    return (
        <div className={styles.row}>
            <div className={styles.fieldContainer}>
                <span className={styles.label}>Set</span>
                <span className={styles.bold}>{setNumber}</span>
            </div>

            <div className={styles.fieldContainer}>
                <label htmlFor={weightId} className={styles.label}>Weight</label>
                <input id={weightId} 
                       type="number" 
                       placeholder={placeholderWeight} 
                       onChange={handleChange}
                        inputMode='decimal'
                       />
            </div>

            <div className={styles.fieldContainer}>
                <label htmlFor={repsId} className={styles.label}>Reps</label>
                <input id={repsId} 
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
