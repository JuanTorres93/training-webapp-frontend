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
} from "../../features/workouts/workoutSlice";
import {
    selectActiveTemplate,
    setActiveTemplate,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

export default function RunWorkoutPageV2() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { templateId } = useParams();

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

    // If last workout does not exist
    if (!lastWorkout || lastWorkout.exercises.length === 0) {
        exerciseCompleters = activeTemplate.exercises.map((exercise) => {
            const rows = Array.from({ length: exercise.sets }, (_, i) => ({
                setNumber: i + 1,
                previousWeight: 0,
                previousReps: 0,
            }));

            return (
                <ExerciseCompleterV2
                    previousData={[]}
                    ticksCountYAxis={ticksCountYAxis}
                    exerciseName={exercise.name}
                    rowsInfo={rows}
                />
            );
        });
    }

    // TODO Datos reales
    const setsData = [
        {
            datetime: new Date("2024-11-11"),
            sets: [
                { set: 1, reps: 7, weight: 30 },
                { set: 2, reps: 7, weight: 30 },
                { set: 3, reps: 6, weight: 30 },
                { set: 4, reps: 6, weight: 30 },
                { set: 5, reps: 6, weight: 30 },
            ],
        },
        {
            datetime: new Date("2024-11-12"),
            sets: [
                { set: 1, reps: 8, weight: 35 },
                { set: 2, reps: 8, weight: 35 },
                { set: 3, reps: 7, weight: 35 },
                { set: 4, reps: 9, weight: 35 },
                { set: 5, reps: 6, weight: 35 },
            ],
        },
        {
            datetime: new Date("2024-11-14"),
            sets: [
                { set: 1, reps: 8, weight: 40 },
                { set: 2, reps: 8, weight: 40 },
                { set: 3, reps: 8, weight: 40 },
                { set: 4, reps: 7, weight: 40 },
                { set: 5, reps: 7, weight: 40 },
            ],
        },
        {
            datetime: new Date("2024-11-15"),
            sets: [
                { set: 1, reps: 8, weight: 40 },
                { set: 2, reps: 8, weight: 40 },
                { set: 3, reps: 8, weight: 40 },
                { set: 4, reps: 7, weight: 40 },
                { set: 5, reps: 7, weight: 40 },
            ],
        },
        {
            datetime: new Date("2024-11-16"),
            sets: [
                { set: 1, reps: 8, weight: 40 },
                { set: 2, reps: 8, weight: 40 },
                { set: 3, reps: 8, weight: 40 },
                { set: 4, reps: 7, weight: 40 },
                { set: 5, reps: 7, weight: 40 },
            ],
        },
    ];

    const setsData2 = [
        {
            datetime: new Date("2024-11-11"),
            sets: [
                { set: 1, reps: 10, weight: 50 },
                { set: 2, reps: 10, weight: 50 },
                { set: 3, reps: 9, weight: 50 },
                { set: 4, reps: 9, weight: 50 },
                { set: 5, reps: 8, weight: 50 },
            ],
        },
        {
            datetime: new Date("2024-11-12"),
            sets: [
                { set: 1, reps: 10, weight: 55 },
                { set: 2, reps: 10, weight: 55 },
                { set: 3, reps: 9, weight: 55 },
                { set: 4, reps: 9, weight: 55 },
                { set: 5, reps: 8, weight: 55 },
            ],
        },
        {
            datetime: new Date("2024-11-14"),
            sets: [
                { set: 1, reps: 10, weight: 60 },
                { set: 2, reps: 10, weight: 60 },
                { set: 3, reps: 9, weight: 60 },
                { set: 4, reps: 9, weight: 60 },
                { set: 5, reps: 8, weight: 60 },
            ],
        },
        {
            datetime: new Date("2024-11-15"),
            sets: [
                { set: 1, reps: 10, weight: 60 },
                { set: 2, reps: 10, weight: 60 },
                { set: 3, reps: 9, weight: 60 },
                { set: 4, reps: 9, weight: 60 },
                { set: 5, reps: 8, weight: 60 },
            ],
        },
        {
            datetime: new Date("2024-11-16"),
            sets: [
                { set: 1, reps: 10, weight: 60 },
                { set: 2, reps: 10, weight: 60 },
                { set: 3, reps: 9, weight: 60 },
                { set: 4, reps: 9, weight: 60 },
                { set: 5, reps: 8, weight: 60 },
            ],
        },
        {
            datetime: new Date("2024-11-17"),
            sets: [
                { set: 1, reps: 10, weight: 60 },
                { set: 2, reps: 10, weight: 60 },
                { set: 3, reps: 9, weight: 60 },
                { set: 4, reps: 9, weight: 60 },
                { set: 5, reps: 8, weight: 60 },
            ],
        },
    ];

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
                    <button className="plain-btn run-workout-page__finish-button">
                        Finish
                    </button>
                </section>
            </main>
        </div>
    );
};
