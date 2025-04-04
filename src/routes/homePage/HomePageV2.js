import React, { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedLineGraph from "../../components/lineGraph/TranslatedLineGraph";
import TranslatedChartWorkoutVolume from "../../components/chartWorkoutVolume/TranslatedChartWorkoutVolume";

import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, loginUser } from "../../features/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";

import {
  selectWorkoutsLoading,
  createWorkout,
  setLastWorkout,
  setLastNWorkouts,
} from "../../features/workouts/workoutSlice";
import {
  selectRecentWorkouts,
  selectUserTemplates,
  selectCommonTemplates,
  selectTemplatesLoading,
  selectActiveTemplate,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";
import {
  selectCurrentWeight,
  selectWeightHistory,
  selectWeightIsLoading,
  addCurrentDayWeight,
  updateCurrentDayWeight,
} from "../../features/weights/weightSlice";
import { getLastPayment } from "../../features/payments/paymentsSlice";
import { getCurrentSubscription } from "../../features/subscriptions/subscriptionsSlice";

import { handleStartWorkout } from "../utils";

import { processCommonStringFromDb } from "../../i18n";

import { calculateTicks } from "../../utils/charts";

export default function HomePageV2() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const recentWorkouts = useSelector(selectRecentWorkouts);
  const workoutsLoading = useSelector(selectWorkoutsLoading);

  const currentWeight = useSelector(selectCurrentWeight);
  const weightHistory = useSelector(selectWeightHistory);
  const weightIsLoading = useSelector(selectWeightIsLoading);

  const userTemplates = useSelector(selectUserTemplates);
  const commonTemplates = useSelector(selectCommonTemplates);
  const templatesLoading = useSelector(selectTemplatesLoading);
  const activeTemplate = useSelector(selectActiveTemplate);

  const [todaysWeight, setTodaysWeight] = useState("");
  const [weightDataChart, setWeightDataChart] = useState([]);
  const [templatesAndWorkoutsLoading, setTemplatesAndWorkoutsLoading] =
    useState(true);

  useEffect(() => {
    setTemplatesAndWorkoutsLoading(templatesLoading || workoutsLoading);
  }, [templatesLoading, workoutsLoading]);

  useEffect(() => {
    // TODO IMPORTANT FIX: ESTO ES UNA VULNERABILIDAD!!!!
    // SE PUEDE LOGGEAR ALGUIEN SIMPLEMENTE CON LA ID DE OTRO USUARIO
    // Mirar una mejor forma de hacerlo.
    const searchParams = new URLSearchParams(location.search);

    const token = searchParams.get("token");

    let userId = null;
    if (token) {
      try {
        const data = jwtDecode(token);
        userId = data.userId;

        // TODO DELETE THESE DEBUG LOGS
        console.log("token");
        console.log(token);

        // TODO DELETE THESE DEBUG LOGS
        console.log("userId");
        console.log(userId);
      } catch (error) {
        console.log("Error decoding token");
      }
    }

    if (!user && !userId) {
      navigate("/login");
    }

    if (userId) {
      dispatch(
        loginUser({
          userIdOAuth: userId,
        })
      ).then(() => {
        navigate("/app/home");
      });
    }
  }, [user]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const createdSubscription = searchParams.get("createdSubscription");

    if (createdSubscription && user) {
      try {
        setTimeout(() => {
          dispatch(getCurrentSubscription({ userId: user.id }));
          dispatch(getLastPayment());
        }, 5000);

        navigate("/app/home");
      } catch (error) {
        console.log("Error decoding token");
      }
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
    [weightHistory]
  );

  const handleTodaysWeightSubmit = (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (!currentWeight || currentWeight.date !== today) {
      return dispatch(
        addCurrentDayWeight({
          userId: user.id,
          weight: todaysWeight,
        })
      ).then(() => {
        setTodaysWeight("");
      });
    } else {
      return dispatch(
        updateCurrentDayWeight({
          userId: user.id,
          weight: todaysWeight,
        })
      ).then(() => {
        setTodaysWeight("");
      });
    }
  };

  const _createRecentWorkouts = (isLoading) => {
    return recentWorkouts.map((previousWorkouts) => {
      const workoutName =
        previousWorkouts.length > 0 ? previousWorkouts[0].name : "";

      if (!workoutName) {
        return null;
      }

      const workoutId = previousWorkouts[0].id
        ? previousWorkouts[0].id
        : workoutName;
      const templateId = previousWorkouts[0].template_id;

      const isCommonTemplate = commonTemplates.find(
        (template) => template.id === templateId
      );

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

      // Button and chart should have different logic
      const buttonIsEnabled = !templatesAndWorkoutsLoading;
      const templateIsActiveTemplate =
        activeTemplate && activeTemplate.id === templateId;
      const templateIsLoading =
        templateIsActiveTemplate && templatesAndWorkoutsLoading;

      return (
        <React.Fragment key={workoutId}>
          <span
            className={`home-page__workout-name ${
              buttonIsEnabled
                ? "home-page__workout-name--enabled"
                : "home-page__workout-name--disabled"
            }`}
            onClick={
              !buttonIsEnabled
                ? () => {}
                : handleStartWorkout(user)(templateId)([
                    ...userTemplates,
                    ...commonTemplates,
                  ])(dispatch)(createWorkout)(setLastWorkout)(setLastNWorkouts)(
                    navigate
                  )
            }
            disabled={!buttonIsEnabled}
          >
            {isCommonTemplate
              ? processCommonStringFromDb(workoutName)
              : workoutName}
          </span>
          <TranslatedChartWorkoutVolume
            data={setsData}
            isLoading={templateIsLoading}
            // valuesInYAxis={ticksCountYAxis}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className="behind-app">
      <main className="app-layout">
        <TranslatedNavVertical />
        <section className="home-page">
          <div
            data-testid="recent-workouts-box"
            className="home-page__recent-workouts-box home-page__dashboard-box"
          >
            <h3 className="home-page__dashboard-box-title">
              {t("home-page-recent-workouts")}
            </h3>
            {/* HERE ARE SHOWN RECENT WORKOUTS CHARTS */}
            {
              // If there are no recent workouts and they are not loading, show a message
              !templatesAndWorkoutsLoading && recentWorkouts.length === 0 && (
                // TODO style this p tag
                <p data-testid="no-recent-workouts">
                  {t("home-page-no-recent-workouts")}
                </p>
              )
            }
            {
              // If workouts are loading and redux has no recentWorkouts, show an spinner in the entire box
              templatesAndWorkoutsLoading && recentWorkouts.length === 0 && (
                <div className="home-page__recent-spinner spinner-20-rem"></div>
              )
            }
            {
              // If there are recent workouts and is not loading, map them
              !templatesAndWorkoutsLoading &&
                recentWorkouts.length > 0 &&
                _createRecentWorkouts(false)
            }
            {
              // If there are recent workouts and just one is loading, map them
              templatesAndWorkoutsLoading &&
                recentWorkouts.length > 0 &&
                _createRecentWorkouts(true)
            }

            {/* END OF RECENT WORKOUTS CHARTS */}
          </div>
          <div
            ref={weightGraphContainerRef}
            data-testid="weight-progress-box"
            className="home-page__weight-progress-box home-page__dashboard-box"
          >
            <h3 className="home-page__dashboard-box-title">
              {t("home-page-weight-progress")}
            </h3>
            {weightIsLoading && (
              <div className="home-page__weight-spinner spinner-20-rem"></div>
            )}
            {!weightIsLoading && weightDataChart.length > 0 && (
              <TranslatedLineGraph
                data={weightDataChart}
                valuesInYAxis={ticksCountYAxis}
                valuesInXAxis={ticksCountXAxis}
              />
            )}
            {!weightIsLoading && weightDataChart.length === 0 && (
              // TODO style this p tag
              <p>{t("home-page-no-weight-history")}</p>
            )}
          </div>
          <div className="home-page__weight-input-box home-page__dashboard-box">
            <h3 className="home-page__dashboard-box-title">
              {t("home-page-todays-weight")}
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
                placeholder={
                  t("home-page-last-weight-placeholder") +
                  ` ${
                    weightHistory.length > 0
                      ? weightHistory[weightHistory.length - 1].value
                      : ""
                  }`
                }
                min="0"
                step="0.1"
                required
              />

              <div className="home-page__weight-text-box">
                {
                  // If there is a weight for today, show it
                  currentWeight &&
                    currentWeight.date ===
                      new Date().toISOString().split("T")[0] && (
                      <p className="home-page__weight-text">
                        {t("home-page-last-weight")}
                        <span className="home-page__current-weight">
                          {currentWeight.value}
                        </span>
                      </p>
                    )
                }
                {!currentWeight && (
                  <p className="home-page__weight-text">
                    {t("home-page-no-weight")}
                  </p>
                )}
              </div>
              <button
                className={`plain-btn home-page__weight-button ${
                  weightIsLoading || todaysWeight.trim() === ""
                    ? "home-page__weight-button--disabled"
                    : ""
                }`}
                type="submit"
                onClick={handleTodaysWeightSubmit}
                disabled={weightIsLoading || todaysWeight.trim() === ""}
              >
                {!weightIsLoading && t("home-page-submit-weight")}
                {weightIsLoading && <div className="spinner-3-rem"></div>}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
