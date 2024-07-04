import PagePresenter from "../../components/pagePresenter/PagePresenter";
import ExerciseProgressPlot from "../../components/exerciseProgressPlot/ExerciseProgressPlot";
import styles from "./StartWorkoutPage.module.css";

export default function StartWorkoutPage() {

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2>Start workout</h2>
                <ExerciseProgressPlot />
                <button type="button" className={styles.button}>Start workout</button>
            </div>
        } />
    );
};