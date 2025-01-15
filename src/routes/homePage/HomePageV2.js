import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedLineGraph from "../../components/lineGraph/TranslatedLineGraph";
import TranslatedChartWorkoutVolume from "../../components/chartWorkoutVolume/TranslatedChartWorkoutVolume";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, loginUser } from "../../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

import {
    createWorkout,
    setLastWorkout,
    setLastNWorkouts,
} from "../../features/workouts/workoutSlice";
import {
    selectRecentWorkouts,
    selectUserTemplates,
    selectCommonTemplates,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";
import {
    selectCurrentWeight,
    selectWeightHistory,
    addCurrentDayWeight,
    updateCurrentDayWeight,
} from "../../features/weights/weightSlice";

import { handleStartWorkout } from "../utils";

import { calculateTicks } from "../../utils/charts";

export default function HomePageV2() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const recentWorkouts = useSelector(selectRecentWorkouts);
    const currentWeight = useSelector(selectCurrentWeight);
    const weightHistory = useSelector(selectWeightHistory);

    const userTemplates = useSelector(selectUserTemplates);
    const commonTemplates = useSelector(selectCommonTemplates);

    const [todaysWeight, setTodaysWeight] = useState('');
    const [weightDataChart, setWeightDataChart] = useState([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const token = searchParams.get("token");

        let userId = null;
        if (token) {
            const data = jwtDecode(token);
            userId = data.userId;
        }

        if (!user && !userId) {
            navigate("/login");
        }

        if (userId) {
            dispatch(loginUser({
                userIdOAuth: userId,
            })).then(() => {
                navigate("/app");
            });
        }
    }, [user]);

    useEffect(() => {
        if (weightHistory.length > 0) {
            const data = weightHistory.map((weight) => {
                return {
                    x: new Date(weight.date),
                    y: weight.value,
                };
            });

            const weightLine = {
                // TODO: Add translation. Use: tooltip-weight
                id: "Weight",
                data,
            };

            setWeightDataChart([weightLine]);
        }
    }, [weightHistory]);

    const [ticksCountYAxis, setTicksCountYAxis] = useState(5); // Initial number of ticks
    const [ticksCountXAxis, setTicksCountXAxis] = useState(5); // Initial number of ticks
    const weightGraphContainerRef = useRef(null); // Reference to the container

    const { t } = useTranslation();

    useEffect(
        calculateTicks(
            weightGraphContainerRef,
            setTicksCountYAxis,
            setTicksCountXAxis,
            weightHistory.length
        ),
        [weightHistory]);

    const handleTodaysWeightSubmit = (e) => {
        e.preventDefault();

        if (!currentWeight) {
            return dispatch(addCurrentDayWeight({
                userId: user.id,
                weight: todaysWeight,
            })).then(() => {
                setTodaysWeight('');
            });
        } else {
            return dispatch(updateCurrentDayWeight({
                userId: user.id,
                weight: todaysWeight,
            })).then(() => {
                setTodaysWeight('');
            });
        }
    };


    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="home-page">
                    <div className="home-page__recent-workouts-box home-page__dashboard-box">
                        <h3 className="home-page__dashboard-box-title">
                            {t('home-page-recent-workouts')}
                        </h3>
                        {
                            recentWorkouts.length > 0 &&
                            recentWorkouts.map((previousWorkouts) => {
                                const workoutName = previousWorkouts.length > 0 ? previousWorkouts[0].name : "";

                                if (!workoutName) {
                                    return null;
                                }


                                const workoutId = previousWorkouts[0].id ? previousWorkouts[0].id : workoutName;
                                const templateId = previousWorkouts[0].template_id;

                                // workout is an array of objects
                                const setsData = previousWorkouts.map((workout) => {
                                    const datetime = new Date(workout.startDate);

                                    const sets = workout.exercises.map((exercise) => {
                                        return {
                                            set: exercise.set,
                                            reps: exercise.reps,
                                            weight: exercise.weight,
                                        };
                                    });

                                    return {
                                        datetime,
                                        sets,
                                    };
                                });

                                return (
                                    <React.Fragment
                                        key={workoutId}
                                    >
                                        <span
                                            className="home-page__workout-name"
                                            onClick={
                                                handleStartWorkout(user)(templateId)
                                                    ([...userTemplates, ...commonTemplates])
                                                    (dispatch)
                                                    (createWorkout)
                                                    (setLastWorkout)
                                                    (setLastNWorkouts)
                                                    (navigate)
                                            }
                                        >
                                            {workoutName}
                                        </span>
                                        <TranslatedChartWorkoutVolume
                                            data={setsData}
                                        // valuesInYAxis={ticksCountYAxis}
                                        />
                                    </React.Fragment>
                                )
                            })
                        }

                    </div>
                    <div
                        ref={weightGraphContainerRef}
                        className="home-page__weight-progress-box home-page__dashboard-box"
                    >
                        <h3 className="home-page__dashboard-box-title">
                            {t('home-page-weight-progress')}
                        </h3>
                        {
                            weightDataChart.length > 0 &&
                            <TranslatedLineGraph
                                data={weightDataChart}
                                valuesInYAxis={ticksCountYAxis}
                                valuesInXAxis={ticksCountXAxis}
                            />
                        }
                        {/* TODO add loading state and no data text */}
                    </div>
                    <div className="home-page__weight-input-box home-page__dashboard-box">
                        <h3 className="home-page__dashboard-box-title">
                            {t('home-page-todays-weight')}
                        </h3>

                        <form className="home-page__weight-input-form">
                            <input
                                className="base-input-text integer-input home-page__weight-input"
                                // TODO add validation?
                                onChange={(e) => setTodaysWeight(e.target.value)}
                                value={todaysWeight}
                                type="number"
                                id="weight"
                                name="weight"
                                // TODO substitute with real last value
                                placeholder={t('home-page-last-weight-placeholder') + ` ${weightHistory.length > 0 ? weightHistory[weightHistory.length - 1].value : ''}`}
                                min="0"
                                step="0.1"
                                required
                            />

                            <div className="home-page__weight-text-box">
                                {
                                    currentWeight &&
                                    <p className="home-page__weight-text">
                                        {t('home-page-last-weight')}
                                        <span className="home-page__current-weight">
                                            {currentWeight}
                                        </span>
                                    </p>
                                }
                                {
                                    !currentWeight &&
                                    <p className="home-page__weight-text">
                                        {t('home-page-no-weight')}
                                    </p>
                                }
                            </div>
                            <button
                                className="plain-btn home-page__weight-button"
                                type="submit"
                                onClick={handleTodaysWeightSubmit}
                            >
                                {t('home-page-submit-weight')}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
};
