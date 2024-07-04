import styles from './ExerciseCompleterRow.module.css';

function ExerciseCompleterRow({ setNumber, placeholderWeight, placeholderReps }) {
    return (
        <div className={styles.row}>
            <div className={styles.fieldContainer}>
                <span className={styles.label}>Set</span><span className={styles.bold}>{setNumber}</span>
            </div>

            <div className={styles.fieldContainer}>
                <label htmlFor={`weight-${setNumber}`} className={styles.label}>Weight</label>
                <input id={`weight-${setNumber}`} type="number" placeholder={placeholderWeight} />
            </div>

            <div className={styles.fieldContainer}>
                <label htmlFor={`reps-${setNumber}`} className={styles.label}>Reps</label>
                <input id={`reps-${setNumber}`} type="number" placeholder={placeholderReps} />
            </div>
        </div>
    );
}

export default ExerciseCompleterRow;
