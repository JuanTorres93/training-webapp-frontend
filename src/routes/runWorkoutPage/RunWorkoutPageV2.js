import { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import ExerciseCompleterV2 from "../../components/exerciseCompleter/ExerciseCompleterV2";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { calculateTicks } from "../../utils/charts";
import { selectUser } from "../../features/user/userSlice";

export default function RunWorkoutPageV2() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    const [ticksCountYAxis, setTicksCountYAxis] = useState(5); // Initial number of ticks
    const [ticksCountXAxis, setTicksCountXAxis] = useState(5); // Initial number of ticks
    const weightGraphContainerRef = useRef(null); // Reference to the container

    useEffect(calculateTicks(weightGraphContainerRef, setTicksCountYAxis, setTicksCountXAxis), []);

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
                    <ExerciseCompleterV2
                        previousData={setsData}
                        ticksCountYAxis={ticksCountYAxis}
                        exerciseName={"Bench Press"}
                    />

                    <ExerciseCompleterV2
                        previousData={setsData2}
                        ticksCountYAxis={ticksCountYAxis}
                        exerciseName={"Squat"}
                    />

                    {/* FINISH BUTTON */}
                    <button className="plain-btn run-workout-page__finish-button">
                        Finish
                    </button>
                </section>
            </main>
        </div>
    );
};
