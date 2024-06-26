import GoBackButton from "../../components/goBackButton/GoBackButton";
import styles from "./CreateExercisePage.module.css";

export default function CreateExercisePage() {
    return (
        <div className={styles.createTemplatePageContainer}>
            <GoBackButton />
            <h2>Create new exercise</h2>
            
            <label htmlFor="input-exercise-name">Exercise name</label>
            <input  id="input-exercise-name" type="text" placeholder="Exercise name" />

            <label className={styles.topMargin} htmlFor="input-exercise-description">Exercise description</label>
            <textarea id="input-exercise-description" placeholder="Exercise description" />

            <button className={styles.createExerciseButton}>Create exercise</button>

        </div>
    );
};