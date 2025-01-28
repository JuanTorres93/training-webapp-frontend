import { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import ExerciseCompleterV2 from "../../components/exerciseCompleter/ExerciseCompleterV2";

import { useSelector, useDispatch } from "react-redux";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import ExtendSessionOptionOrCancel from "../../components/popupOptionOrCancel/ExtendSessionPopupOptionOrCancel copy";

import { calculateTicks } from "../../utils/charts";
import { selectUser } from "../../features/user/userSlice";
import { selectCommonExercises } from "../../features/exercises/exercisesSlice";
import {
    selectLastWorkout,
    finishWorkout,
    selectLastNWorkouts,
    selectWorkoutsLoading,
    updateActiveWorkoutExercise,
    clearActiveWorkoutExercises,
} from "../../features/workouts/workoutSlice";
import {
    selectActiveTemplate,
    setActiveTemplate,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";
import { selectCurrentLanguage } from "../../features/language/languageSlice";
import { processCommonStringFromDb } from "../../i18n";

export default function RunWorkoutPageV2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { templateId, workoutId } = useParams();

    const user = useSelector(selectUser);
    const lastWorkout = useSelector(selectLastWorkout);
    const lastNWorkouts = useSelector(selectLastNWorkouts);
    const activeTemplate = useSelector(selectActiveTemplate);
    const workoutsLoading = useSelector(selectWorkoutsLoading);
    const commonExercises = useSelector(selectCommonExercises);
    const currentLanguage = useSelector(selectCurrentLanguage);

    // I'm using this instead of the selector of activeWorkout beacause
    // it throws an error of max depth for preventing infinite loops
    const [startDate, setStartDate] = useState(new Date());

    const [exerciseCompleters, setExerciseCompleters] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    // set active template
    useEffect(() => {
        // check templateId is UUID
        const uuidRegex = new RegExp(
            "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
        );
        if (!uuidRegex.test(templateId)) {
            // TODO warn user about invalid template
            navigate("/app/templates");
        }

        dispatch(setActiveTemplate(templateId));
    }, [templateId]);

    const [ticksCountYAxis, setTicksCountYAxis] = useState(5); // Initial number of ticks
    const [ticksCountXAxis, setTicksCountXAxis] = useState(5); // Initial number of ticks
    const weightGraphContainerRef = useRef(null); // Reference to the container

    useEffect(calculateTicks(weightGraphContainerRef, setTicksCountYAxis, setTicksCountXAxis), []);

    const generateClearActiveWorkoutExercisesDispatch = () => {
        return () => {
            dispatch(clearActiveWorkoutExercises());
        }
    }

    const generateDispatchForUpdatingWorkout = (exerciseId, exerciseOrder) => {
        return (setNumber, weight, reps) => {
            dispatch(updateActiveWorkoutExercise({
                exerciseId,
                exerciseOrder,
                setNumber,
                weight,
                reps,
            }));
        };
    }

    useEffect(() => {
        // If last workout does not exist
        if (Object.keys(lastWorkout).length === 0 || !lastWorkout.exercises) {
            // If there is an active template with exercises
            if (!(Object.keys(activeTemplate).length === 0) && activeTemplate.exercises.length > 0) {
                setExerciseCompleters(
                    activeTemplate.exercises.map((exercise, index) => {
                        const exerciseIsCommon = commonExercises.some((commonExercise) => {
                            return commonExercise.id === exercise.id;
                        });

                        const exerciseName = exerciseIsCommon ? processCommonStringFromDb(exercise.name) : exercise.name;

                        const rows = Array.from({ length: exercise.sets }, (_, i) => ({
                            setNumber: i + 1,
                            previousWeight: 0,
                            previousReps: 0,
                        }));

                        return (
                            <ExerciseCompleterV2
                                key={exercise.id}
                                previousData={[]}
                                workoutStartDate={startDate}
                                ticksCountYAxis={ticksCountYAxis}
                                exerciseName={exerciseName}
                                rowsInfo={rows}
                                dispatchGenerator={generateDispatchForUpdatingWorkout(exercise.id, index + 1)}
                                clearExercisesDispatchGenerator={generateClearActiveWorkoutExercisesDispatch}
                                isFirstRender={index === 0}
                                isLoading={workoutsLoading}
                            />
                        );
                    })
                );
            }
        }
        // If last workout DOES exist
        else {
            const groupedExercises = lastWorkout.exercises.reduce((acc, exercise) => {
                if (!acc[exercise.order]) {
                    acc[exercise.order] = [];
                }

                acc[exercise.order].push(exercise);

                return acc;
            }, {});

            setExerciseCompleters(
                Object.keys(groupedExercises).map((exerciseOrder) => {
                    const setExerciseInfo = groupedExercises[exerciseOrder];

                    const exerciseId = setExerciseInfo[0].id;
                    const exerciseIsCommon = commonExercises.some((commonExercise) => {
                        return commonExercise.id === exerciseId;
                    });

                    const exerciseName = exerciseIsCommon ? processCommonStringFromDb(setExerciseInfo[0].name) : setExerciseInfo[0].name;

                    // Inputs
                    const rows = setExerciseInfo.map((set) => ({
                        setNumber: set.set,
                        previousWeight: set.weight,
                        previousReps: set.reps,
                    }));

                    // Chart
                    const previousData = lastNWorkouts.map(workout => {
                        const data = {};

                        data.datetime = new Date(workout.startDate);

                        const previousExercises = workout.exercises.filter((exercise) => {
                            return exercise.id === setExerciseInfo[0].id;
                        });

                        const sets = previousExercises.map((exercise) => {
                            return {
                                set: exercise.set,
                                weight: exercise.weight,
                                reps: exercise.reps,
                            }
                        });

                        data.sets = sets;

                        return data;
                    });


                    // Order previousData by datetime
                    previousData.sort((a, b) => {
                        return a.datetime - b.datetime;
                    });

                    return (
                        <ExerciseCompleterV2
                            key={setExerciseInfo[0].id}
                            previousData={previousData}
                            ticksCountYAxis={ticksCountYAxis}
                            workoutStartDate={startDate}
                            exerciseName={exerciseName}
                            rowsInfo={rows}
                            dispatchGenerator={generateDispatchForUpdatingWorkout(setExerciseInfo[0].id, setExerciseInfo[0].order)}
                            clearExercisesDispatchGenerator={generateClearActiveWorkoutExercisesDispatch}
                            isFirstRender={setExerciseInfo[0].order === 1}
                            isLoading={workoutsLoading}
                        />
                    );
                })
            );

        }
    }, [lastWorkout, activeTemplate, startDate, ticksCountYAxis, lastNWorkouts, workoutsLoading, currentLanguage]);

    const handleFinishWorkout = () => {
        // If last workout does not exist
        if (Object.keys(lastWorkout).length === 0 || !lastWorkout.exercises) {
            // Wait a bit in runWorkoutPage to minimize the time
            // of getting the last workout in the dashboard
            dispatch(finishWorkout()).then(() => {
                navigate("/app/home");
            });
        } else {
            // OTherwise go inmmediately, since there will be a loading animation
            dispatch(finishWorkout());
            navigate("/app/home");
        }
    };

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />

                {/* TODO IMPORTANT QUITAR EL REF de aquí??? No tiene pinta de que haga falta a priori */}
                <section
                    className="run-workout-page"
                    ref={weightGraphContainerRef}
                >
                    <ExtendSessionOptionOrCancel />
                    {/* Render exercise completers */}
                    {exerciseCompleters}

                    {/* FINISH BUTTON */}
                    <button
                        className={`
                            plain-btn run-workout-page__finish-button
                            ${workoutsLoading ? "run-workout-page__finish-button--disabled" : ""}
                            `}
                        onClick={workoutsLoading ? null : handleFinishWorkout}
                        disabled={workoutsLoading}
                    >
                        {/* TODO translate */}
                        {workoutsLoading ? <div className="spinner-3-rem"></div> : "Finish"}
                    </button>
                </section>
            </main>
        </div>
    );
};
