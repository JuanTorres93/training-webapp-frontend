import { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedLineGraph from "../../components/lineGraph/TranslatedLineGraph";
import TranslatedChartSetsAndWeight from "../../components/chartSetsAndWeight/TranslatedChartSetsAndWeight";

import { useTranslation } from "react-i18next";

import { calculateTicks } from "../../utils/charts";

export default function HomePageV2() {
    // TODO only appear if user is logged in
    const [ticksCountYAxis, setTicksCountYAxis] = useState(5); // Initial number of ticks
    const [ticksCountXAxis, setTicksCountXAxis] = useState(5); // Initial number of ticks
    const weightGraphContainerRef = useRef(null); // Reference to the container

    const { t } = useTranslation();

    useEffect(calculateTicks(weightGraphContainerRef, setTicksCountYAxis, setTicksCountXAxis), []);

    const data = [
        {
            "id": "Weight",
            "data": [
                {
                    "x": new Date("2024-11-01"),
                    "y": 70.1
                },
                {
                    "x": new Date("2024-11-02"),
                    "y": 70.4
                },
                {
                    "x": new Date("2024-11-03"),
                    "y": 70.3
                },
                {
                    "x": new Date("2024-11-04"),
                    "y": 70.2
                },
                {
                    "x": new Date("2024-11-05"),
                    "y": 70.6
                },
                {
                    "x": new Date("2024-11-06"),
                    "y": 70.5
                },
                {
                    "x": new Date("2024-11-07"),
                    "y": 70.7
                },
                {
                    "x": new Date("2024-11-08"),
                    "y": 70.8
                },
                {
                    "x": new Date("2024-11-09"),
                    "y": 70.6
                },
                {
                    "x": new Date("2024-11-10"),
                    "y": 70.5
                },
                {
                    "x": new Date("2024-11-11"),
                    "y": 70.7
                },
                {
                    "x": new Date("2024-11-12"),
                    "y": 70.9
                },
                // Create 10 more data points that follow a similar uptrend
                {
                    "x": new Date("2024-11-13"),
                    "y": 71.1
                },
                {
                    "x": new Date("2024-11-14"),
                    "y": 71.3
                },
                {
                    "x": new Date("2024-11-15"),
                    "y": 71.5
                },
                {
                    "x": new Date("2024-11-16"),
                    "y": 71.7
                },
                {
                    "x": new Date("2024-11-17"),
                    "y": 71.9
                },
                {
                    "x": new Date("2024-11-18"),
                    "y": 72.1
                },
                {
                    "x": new Date("2024-11-19"),
                    "y": 72.3
                },
                {
                    "x": new Date("2024-11-20"),
                    "y": 72.5
                },
                {
                    "x": new Date("2024-11-21"),
                    "y": 72.7
                },
                {
                    "x": new Date("2024-11-22"),
                    "y": 72.9
                },

            ]
        },
    ];


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
    ];

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="home-page">
                    <div className="home-page__recent-workouts-box home-page__dashboard-box">
                        <h3 className="home-page__dashboard-box-title">
                            {t('home-page-recent-workouts')}
                        </h3>
                        <span className="home-page__workout-name">
                            PUSH
                        </span>
                        {/* TODO hacer una nueva gráfica para reflejar el progreso de sesiones de entrenamiento enteras. Investigar sobre volumen de entrenamiento? */}
                        <TranslatedChartSetsAndWeight
                            data={setsData}
                            isSmall={true}
                            valuesInYAxis={ticksCountYAxis}
                        />

                        <span className="home-page__workout-name">
                            PULL
                        </span>
                        <TranslatedChartSetsAndWeight
                            data={setsData}
                            isSmall={true}
                            valuesInYAxis={ticksCountYAxis}
                        />
                        <span className="home-page__workout-name">
                            LEG
                        </span>
                        <TranslatedChartSetsAndWeight
                            data={setsData}
                            isSmall={true}
                            valuesInYAxis={ticksCountYAxis}
                        />
                        <span className="home-page__workout-name">
                            Empujes traseros
                        </span>
                        <TranslatedChartSetsAndWeight
                            data={setsData}
                            isSmall={true}
                            valuesInYAxis={ticksCountYAxis}
                        />
                        <span className="home-page__workout-name">
                            Empujes frontales y medios
                        </span>
                        <TranslatedChartSetsAndWeight
                            data={setsData}
                            isSmall={true}
                            valuesInYAxis={ticksCountYAxis}
                        />
                    </div>
                    <div
                        ref={weightGraphContainerRef}
                        className="home-page__weight-progress-box home-page__dashboard-box"
                    >
                        <h3 className="home-page__dashboard-box-title">
                            {t('home-page-weight-progress')}
                        </h3>
                        <TranslatedLineGraph
                            data={data}
                            valuesInYAxis={ticksCountYAxis}
                            valuesInXAxis={ticksCountXAxis}
                        />
                    </div>
                    <div className="home-page__weight-input-box home-page__dashboard-box">
                        <h3 className="home-page__dashboard-box-title">
                            {t('home-page-todays-weight')}
                        </h3>

                        <form className="home-page__weight-input-form">
                            <input
                                className="base-input-text integer-input home-page__weight-input"
                                type="number"
                                id="weight"
                                name="weight"
                                // TODO substitute with real last value
                                placeholder={t('home-page-last-weight-placeholder') + " 70.9"}
                                min="0"
                                step="0.1"
                                required
                            />
                            <button
                                className="plain-btn home-page__weight-button"
                                type="submit">
                                {t('home-page-submit-weight')}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};
