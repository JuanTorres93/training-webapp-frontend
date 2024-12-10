import { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import ExerciseCompleterV2 from "../../components/exerciseCompleter/ExerciseCompleterV2";

import { calculateTicks } from "../../utils/charts";

export default function RunWorkoutPageV2() {
    // TODO only appear if user is logged in
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
    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />

                {/* TODO IMPORTANT QUITAR EL REF de aquí */}
                <section
                    className="run-workout-page"

                    ref={weightGraphContainerRef}
                >
                    <ExerciseCompleterV2
                        previousData={setsData}
                        ticksCountYAxis={ticksCountYAxis}
                    />
                </section>
            </main>
        </div>
    );
};
