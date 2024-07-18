import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import ExerciseProgressPlot from "../../components/exerciseProgressPlot/ExerciseProgressPlot";
import styles from "./StartWorkoutPage.module.css";

import { setActiveTemplate, selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";

export default function StartWorkoutPage() {
    const dispatch = useDispatch();
    const { templateId } = useParams();

    dispatch(setActiveTemplate(parseInt(templateId)));
    const template = useSelector(selectActiveTemplate);

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2>Start {template.alias}</h2>
                <ExerciseProgressPlot />
                <button type="button" className={styles.button}>Start workout</button>
            </div>
        } />
    );
};
