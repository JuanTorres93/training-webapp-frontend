import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import ExerciseProgressPlot from "../../components/exerciseProgressPlot/ExerciseProgressPlot";
import styles from "./StartWorkoutPage.module.css";

import { selectUser } from "../../features/user/userSlice";
import { setActiveTemplate, selectActiveTemplate } from "../../features/workoutsTemplates/workoutTemplatesSlice";
import {
    createWorkout,
    setLastWorkout,
    setLastNWorkouts,
    selectLastNWorkouts,
    selectWorkoutsLoading,
} from "../../features/workouts/workoutSlice";

export default function StartWorkoutPage() {
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { templateId } = useParams();

    const template = useSelector(selectActiveTemplate);
    const user = useSelector(selectUser);
    const lastNWorkouts = useSelector(selectLastNWorkouts);
    const workoutsLoading = useSelector(selectWorkoutsLoading);

    useEffect(() => {
        dispatch(setActiveTemplate(parseInt(templateId)));

        dispatch(setLastNWorkouts({
            templateId: templateId,
            userId: user.id,
            // TODO let user change this number in some way
            // TODO or maybe do it in another page and here last 7-10 workouts
            numberOfWorkouts: 7,
        }));
    }, [user, dispatch, templateId]);

    useEffect(() => {
        // Later is converted to an object
        let newData = [];

        if (lastNWorkouts) {
            // TODO plot also time of exercise if necessary
            lastNWorkouts.forEach(workout => {
                const { startDate, exercises } = workout;
                const exercisesData = {}

                exercises.forEach(exercise => {
                    if (!Object.keys(exercisesData).includes(String(exercise.id))) {
                        exercisesData[exercise.id] = {
                            exerciseName: exercise.alias,
                            dataPack: {
                                date: startDate,
                            }
                        };
                    }

                    exercisesData[exercise.id].dataPack = {
                        ...exercisesData[exercise.id].dataPack,
                        [`weight_set_${exercise.set}`]: exercise.weight,
                        [`reps_set_${exercise.set}`]: exercise.reps,
                    };
                });

                newData.push(exercisesData);
            });

            // Group newData by exerciseName and date
            newData = newData.reduce((acc, curr) => {
                const keys = Object.keys(curr);
                keys.forEach(key => {
                    if (!Object.keys(acc).includes(curr[key].exerciseName)) {
                        acc[curr[key].exerciseName] = [];
                    }
                    acc[curr[key].exerciseName].push(curr[key]);
                });

                return acc;
            }, {});

            setData(newData);
        } else {
            setData({});
        }
    }, [lastNWorkouts]);

    const handleStartWorkout = () => {
        dispatch(createWorkout({
            alias: template.alias,
            description: template.description ? template.description : '',
        })).then((response) => {
            const workout = response.payload;
            dispatch(setLastWorkout({
                templateId: template.id,
                userId: user.id,
            }));
            navigate(`/runWorkout/${workout.id}`);
        });
    };

    const styleNoGraph = {
        marginTop: "1.5rem",
        marginBottom: "3rem",
    };

    return (
        <PagePresenter children={
            template &&
            <div className={styles.container}>
                <h2 className="heading">Start {template.alias}</h2>

                {workoutsLoading && <div className="spinner-heading-size" style={styleNoGraph}></div>}

                {!workoutsLoading && Object.values(data).map((exerciseInfoArray) => {
                    const exerciseName = exerciseInfoArray[0].exerciseName;

                    const values = exerciseInfoArray.map((exerciseInfo) => {
                        return exerciseInfo.dataPack;
                    });

                    return <ExerciseProgressPlot
                        key={exerciseName}
                        exerciseName={exerciseName}
                        data={values}
                    />
                })}

                {(!workoutsLoading && Object.keys(data).length === 0) && <p style={styleNoGraph}>No data to show. There are no previous workouts for this template yet.</p>}


                <button type="button"
                    className={styles.button}
                    onClick={handleStartWorkout}
                >
                    Start workout
                </button>
            </div>
        } />
    );
};
