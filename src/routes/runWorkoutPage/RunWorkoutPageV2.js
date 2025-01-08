import { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import ExerciseCompleterV2 from "../../components/exerciseCompleter/ExerciseCompleterV2";

import { useSelector, useDispatch } from "react-redux";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { calculateTicks } from "../../utils/charts";
import { selectUser } from "../../features/user/userSlice";
import {
    // previous RunWorkoutPage.js
    selectLastWorkout,
    finishWorkout,
    // previous StartWorkoutPage.js
    createWorkout,
    setLastWorkout,
    setLastNWorkouts,
    selectLastNWorkouts,
    selectWorkoutsLoading,
    updateActiveWorkoutExercise,
    clearActiveWorkoutExercises,
} from "../../features/workouts/workoutSlice";
import {
    selectActiveTemplate,
    setActiveTemplate,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

export default function RunWorkoutPageV2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { templateId, workoutId } = useParams();

    const user = useSelector(selectUser);
    const lastWorkout = useSelector(selectLastWorkout);
    const lastNWorkouts = useSelector(selectLastNWorkouts);
    const activeTemplate = useSelector(selectActiveTemplate);

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

    let exerciseCompleters = [];

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

    // If last workout does not exist
    if (Object.keys(lastWorkout).length === 0 || !lastWorkout.exercises) {
        // If there is an active template with exercises
        if (!(Object.keys(activeTemplate).length === 0) && activeTemplate.exercises.length > 0) {
            exerciseCompleters = activeTemplate.exercises.map((exercise, index) => {
                const rows = Array.from({ length: exercise.sets }, (_, i) => ({
                    setNumber: i + 1,
                    previousWeight: 0,
                    previousReps: 0,
                }));

                return (
                    <ExerciseCompleterV2
                        key={exercise.id}
                        previousData={[]}
                        ticksCountYAxis={ticksCountYAxis}
                        exerciseName={exercise.name}
                        rowsInfo={rows}
                        dispatchGenerator={generateDispatchForUpdatingWorkout(exercise.id, index + 1)}
                        clearExercisesDispatchGenerator={generateClearActiveWorkoutExercisesDispatch}
                        isFirstRender={index === 0}
                    />
                );
            });
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


        exerciseCompleters = Object.keys(groupedExercises).map((exerciseOrder) => {
            const setExerciseInfo = groupedExercises[exerciseOrder];

            // Inputs
            const rows = setExerciseInfo.map((set) => ({
                setNumber: set.set,
                previousWeight: set.weight,
                previousReps: set.reps,
            }));

            // Chart
            // TODO use data FROM N LAST WORKOUTS
            const previousData = [];


            return (
                <ExerciseCompleterV2
                    key={setExerciseInfo[0].id}
                    previousData={[]}
                    ticksCountYAxis={ticksCountYAxis}
                    exerciseName={setExerciseInfo[0].name}
                    rowsInfo={rows}
                    dispatchGenerator={generateDispatchForUpdatingWorkout(setExerciseInfo[0].id, setExerciseInfo[0].order)}
                    clearExercisesDispatchGenerator={generateClearActiveWorkoutExercisesDispatch}
                    isFirstRender={setExerciseInfo[0].order === 1}
                />
            );
        });
    }

    const handleFinishWorkout = () => {
        dispatch(finishWorkout());
        navigate("/app");
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
                    {/* Render exercise completers */}
                    {exerciseCompleters}

                    {/* FINISH BUTTON */}
                    <button
                        className="plain-btn run-workout-page__finish-button"
                        onClick={handleFinishWorkout}
                    >
                        {/* TODO translate */}
                        Finish
                    </button>
                </section>
            </main>
        </div>
    );
};
