import styles from './ExerciseCompleterRow.module.css';

function ExerciseCompleterRow({ setNumber, placeholderWeight, placeholderReps }) {
    const generateRandomNumber = () => Math.floor(Math.random() * 100);

    const weightRandom = generateRandomNumber();
    const repsRandom = generateRandomNumber();

    return (
        <div className={styles.row}>
            <div className={styles.fieldContainer}>
                <span className={styles.label}>Set</span><span className={styles.bold}>{setNumber}</span>
            </div>

            <div className={styles.fieldContainer}>
                <label htmlFor={`weight-${setNumber}-${weightRandom}`} className={styles.label}>Weight</label>
                <input id={`weight-${setNumber}-${weightRandom}`} type="number" placeholder={placeholderWeight} />
            </div>

            <div className={styles.fieldContainer}>
                <label htmlFor={`reps-${setNumber}-${repsRandom}`} className={styles.label}>Reps</label>
                <input id={`reps-${setNumber}-${repsRandom}`} type="number" placeholder={placeholderReps} />
            </div>
        </div>
    );
}

export default ExerciseCompleterRow;
