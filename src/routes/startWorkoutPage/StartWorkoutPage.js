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
} from "../../features/workouts/workoutSlice";

export default function StartWorkoutPage() {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { templateId } = useParams();

    dispatch(setActiveTemplate(parseInt(templateId)));
    const template = useSelector(selectActiveTemplate);
    const user = useSelector(selectUser);
    const lastNWorkouts = useSelector(selectLastNWorkouts);

    useEffect(() => {
        dispatch(setLastNWorkouts({
            templateId: template.id,
            userId: user.id,
            // TODO let user change this number in some way
            // TODO of maybe do it in another page and here last 7-10 workouts
            numberOfWorkouts: 2,
        }));
    }, [template, user]);

    useEffect(() => {
        setData([]);
        // TODO plot also time if necessary
        lastNWorkouts.forEach(workout => {
            const { startDate, exercises } = workout;
            const exercisesData = {}

            exercises.map(exercise => {
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

            // TODO DELETE THESE DEBUG LOGS
            console.log('exercisesData');
            console.log(exercisesData);

            // TODO NEXT set data for each exercise and adjust component rendering as needed

            setData([
                {
                    date: "20/05/24",
                    weight_set_1: 65,
                    reps_set_1: 2,
                    weight_set_2: 55,
                    reps_set_2: 5,
                    weight_set_3: 55,
                    reps_set_3: 5,
                },
                {
                    date: "05/06/24",
                    weight_set_1: 55,
                    reps_set_1: 4,
                    weight_set_2: 55,
                    reps_set_2: 3,
                    weight_set_3: 55,
                    reps_set_3: 3,
                },
                {
                    date: "12/06/24",
                    weight_set_1: 55,
                    reps_set_1: 4,
                    weight_set_2: 55,
                    reps_set_2: 4,
                    weight_set_3: 55,
                    reps_set_3: 3,
                },
                {
                    date: "19/06/24",
                    weight_set_1: 55,
                    reps_set_1: 4,
                    weight_set_2: 55,
                    reps_set_2: 4,
                    weight_set_3: 55,
                    reps_set_3: 4,
                },
            ]);

            // TODO DELETE THESE DEBUG LOGS
            console.log('data');
            console.log(data);
        });
    }, [lastNWorkouts]);

    const handleStartWorkout = () => {
        // TODO Create workout in database only after user confirms the finish?
        // TODO this would involve modifyying the logic in the RunWorkoutPage component
        // TODO for adding exercises to the workout
        // TODO Another alternative is to automatize the db to delete empty workouts.
        dispatch(createWorkout({
            alias: template.alias,
            description: template.description,
        })).then((response) => {
            const workout = response.payload;
            dispatch(setLastWorkout({
                templateId: template.id,
                userId: user.id,
            }));
            navigate(`/runWorkout/${workout.id}`);
        });
    };

    return (
        <PagePresenter children={
            <div className={styles.container}>
                <h2>Start {template.alias}</h2>

                <ExerciseProgressPlot
                    exerciseName='Bench press'
                    data={data} />

                {/* BORRAR */}
                <div>
                    {JSON.stringify(lastNWorkouts)}
                </div>

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
