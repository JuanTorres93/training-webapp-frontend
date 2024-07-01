import PagePresenter from "../../components/pagePresenter/PagePresenter";
import ExerciseProgressPlot from "../../components/exerciseProgressPlot/ExerciseProgressPlot";
import styles from "./StartWorkoutPage.module.css";

export default function StartWorkoutPage() {

    return (
        <PagePresenter children={
            <div>
                <ExerciseProgressPlot />
            </div>
        } />
    );
};