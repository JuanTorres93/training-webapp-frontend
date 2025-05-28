// import react needed for testing
import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { selectActiveWorkout } from "../../features/workouts/workoutSlice.js";
import TranslatedChartSetsAndWeight from "../chartSetsAndWeight/TranslatedChartSetsAndWeight.js";

import {
  allowOnlyFloats,
  pasteOnlyFloats,
  allowOnlyIntegers,
  pasteOnlyIntegers,
} from "../../utils/inputUtils.js";

const ExerciseCompleterV2 = ({
  id, // Exercise id, used for redux state
  workoutId, // Workout id, used for redux state
  previousData,
  ticksCountYAxis,
  exerciseName,
  workoutStartDate,
  setText = "Set",
  weightText = "Weight",
  repsText = "Reps",
  rowsInfo = [],
  isLoading = false,
  dispatchGenerator = (setNumber, weight, reps) => {},
  // Empty the exercises of the active workout
  clearExercisesDispatchGenerator = () => {},
  // Used with clearExercisesDispatchGenerator to clear the exercises of the active workout
  isFirstRender = false,
}) => {
  // previousData is an array of objects with the following structure:
  // [
  //    {
  //        datetime: new Date("2024-11-14"),
  //        sets: [
  //            { set: 1, reps: 10, weight: 60 },
  //            { set: 2, reps: 10, weight: 60 },
  //            { set: 3, reps: 9, weight: 60 },
  //            { set: 4, reps: 9, weight: 60 },
  //            { set: 5, reps: 8, weight: 60 },
  //        ],
  //    },
  // ]

  // rowsInfo is an array of objects with the following structure:
  // [
  //    {
  //        setNumber: N,
  //        previousWeight: W,
  //        previousReps: R,
  //    },
  // ]

  // Stores sets info as: (setNumber is just a placeholder for an integer)
  // {
  //   setNumber1: {
  //      weight: W,
  //      reps: R,
  //   },
  //   setNumber2: {
  //      weight: W,
  //      reps: R,
  //   },
  //   ...
  // }
  const activeWorkout = useSelector(selectActiveWorkout);
  const [exerciseData, setExerciseData] = useState({});
  const [weightValues, setWeightValues] = useState({});
  const [repsValues, setRepsValues] = useState({});
  // State for updating the chart in real time. Is an array for ease of use. Since I
  // have a function that already works with arrays
  const [realTimeData, setRealTimeData] = useState([]);

  const getDispatchAndSetWeight = (setNumber, value, exerDataReps) => {
    const dispatch = dispatchGenerator(setNumber, value, exerDataReps);
    setWeightValues({
      ...weightValues,
      [setNumber]: value,
    });

    return dispatch;
  };

  useEffect(() => {
    const currentDataPoint = {
      datetime: workoutStartDate.toISOString(),
    };

    let exerciseCurrentDataSets = [];

    if (
      Object.keys(activeWorkout).length > 0 &&
      activeWorkout.exercises.length > 0
    ) {
      const exerciseCurrentData = activeWorkout.exercises.find(
        (exercise) => exercise.id === id
      );

      if (exerciseCurrentData) {
        exerciseCurrentDataSets = exerciseCurrentData.sets.map((set) => {
          return {
            set: set.setNumber,
            weight: set.weight,
            reps: set.reps,
          };
        });
      }
    } else {
      exerciseCurrentDataSets = Object.keys(exerciseData).map((setNumber) => {
        return {
          set: parseInt(setNumber),
          weight: exerciseData[setNumber].weight,
          reps: exerciseData[setNumber].reps,
        };
      });
    }

    currentDataPoint.sets = exerciseCurrentDataSets;
    setRealTimeData([currentDataPoint]);
  }, [exerciseData, activeWorkout]);

  const handleInputChange = (type) => (setNumber) => (event) => {
    // type is either 'weight' or 'reps'
    const targetValue = event.target.value;

    // Parse value to valid number
    let value;
    try {
      value = parseFloat(targetValue) ? parseFloat(targetValue) : 0;
    } catch (error) {
      value = 0;
    }

    let exerData = {};

    if (Object.keys(exerciseData).length > 0) {
      exerData = exerciseData;
    } else {
      // get exerciseData from redux state
      const exerciseInArray = activeWorkout.exercises.find(
        (exercise) => exercise.id === id
      );
      if (exerciseInArray) {
        exerciseInArray.sets.forEach((row) => {
          exerData[row.setNumber] = {
            weight: row.weight,
            reps: row.reps,
          };
        });
      }
    }

    // Set data in this component
    setExerciseData({
      ...exerData,
      [setNumber]: {
        ...exerData[setNumber],
        [type]: value,
      },
    });

    // Set data in redux state for reaching the server
    // Get function for updating redux state
    let dispatch;

    if (type === "weight") {
      dispatch = getDispatchAndSetWeight(
        setNumber,
        value, // Weight
        exerData[setNumber].reps // Reps
      );
    } else if (type === "reps") {
      dispatch = dispatchGenerator(
        setNumber,
        exerData[setNumber].weight, // Weight
        value // Reps
      );
      setRepsValues({
        ...repsValues,
        [setNumber]: value,
      });

      // If no weight is set, set it to previous weight
      if (
        exerData[setNumber] &&
        exerData[setNumber].weight === 0 &&
        value > 0
      ) {
        // Get previous weight from previousData
        const previousWeight =
          previousData[previousData.length - 1]?.sets[setNumber - 1].weight ||
          0;

        // Dispatch the action to set the weight
        const dispatchWeight = getDispatchAndSetWeight(
          setNumber,
          previousWeight, // Weight
          value // Reps
        );
        if (dispatchWeight) {
          dispatchWeight();
        }
      }
    }

    if (dispatch) {
      // Dispatch the action
      dispatch();
    }
  };

  useEffect(() => {
    // Init all data with zeros to prevent "undefined" errors
    if (
      Object.keys(activeWorkout).length > 0 &&
      activeWorkout.exercises.length === 0
    ) {
      const exerciseInArray = activeWorkout.exercises.find(
        (exercise) => exercise.id === id
      );

      if (!exerciseInArray) {
        // Fill exerciseData with zeros. If user does not input any data, it will be zero
        const initializedExerciseData = rowsInfo.reduce((acc, rowInfo) => {
          acc[rowInfo.setNumber] = {
            weight: 0,
            reps: 0,
          };

          return acc;
        }, {});

        // set this component's state
        setExerciseData(initializedExerciseData);

        // set redux state
        // Delete all exercises of the active workout to delete data from previous workouts
        const clearExercisesDispatch = clearExercisesDispatchGenerator();
        if (clearExercisesDispatch && isFirstRender) {
          clearExercisesDispatch();
        }

        // Fill all rows with zeros to prevent "undefined" errors in redux state
        rowsInfo.forEach((row) => {
          const dispatch = dispatchGenerator(row.setNumber, 0, 0);
          if (dispatch) {
            dispatch();
          }
        });
      }
    } else if (Object.keys(activeWorkout).length > 0) {
      // If there is an active workout, set the values for the inputs
      const exerciseInArray = activeWorkout.exercises.find(
        (exercise) => exercise.id === id
      );
      if (exerciseInArray) {
        exerciseInArray.sets.forEach((row) => {
          setWeightValues((prevState) => ({
            ...prevState,
            [row.setNumber]: row.weight,
          }));
          setRepsValues((prevState) => ({
            ...prevState,
            [row.setNumber]: row.reps,
          }));
        });
      }
    }
  }, [rowsInfo, activeWorkout, id, isFirstRender]);

  return (
    <div className="exercise-completer">
      <div className="exercise-completer__exercise-title-box">
        {/* Exercise title */}
        <h3
          className={`
                        exercise-completer__exercise-title
                        ${
                          isLoading
                            ? "exercise-completer__exercise-title--disabled"
                            : ""
                        }
                        `}
        >
          {exerciseName}
        </h3>
      </div>
      <div className="exercise-completer__info-box">
        {/* Column titles */}
        <div
          className={`
                    exercise-completer__title
                    ${isLoading ? "exercise-completer__title--disabled" : ""}
                    `}
        >
          {setText}
        </div>
        <div
          className={`
                    exercise-completer__title
                    ${isLoading ? "exercise-completer__title--disabled" : ""}
                    `}
        >
          {weightText}
        </div>
        <div
          className={`
                    exercise-completer__title
                    ${isLoading ? "exercise-completer__title--disabled" : ""}
                    `}
        >
          {repsText}
        </div>

        {/* Rows */}
        {rowsInfo &&
          rowsInfo.map((rowInfo, index) => {
            return (
              <React.Fragment key={index}>
                <div className="exercise-completer__set-number">
                  {rowInfo.setNumber}
                </div>
                <div className="exercise-completer__weight">
                  <input
                    data-testid={`weight-input`}
                    className={`
                      base-input-text integer-input exercise-completer__input
                      ${isLoading ? "exercise-completer__input--disabled" : ""}
                    `}
                    type="number"
                    name="weight"
                    value={weightValues[rowInfo.setNumber] || ""}
                    disabled={isLoading}
                    onChange={handleInputChange("weight")(rowInfo.setNumber)}
                    onKeyDown={allowOnlyFloats}
                    onPaste={pasteOnlyFloats}
                    placeholder={
                      rowInfo.previousWeight
                        ? new String(rowInfo.previousWeight)
                        : weightText
                    }
                    step="any"
                  />
                </div>
                <div className="exercise-completer__reps">
                  <input
                    data-testid={`reps-input`}
                    className={`
                      base-input-text integer-input exercise-completer__input
                      ${isLoading ? "exercise-completer__input--disabled" : ""}
                    `}
                    type="number"
                    name="reps"
                    value={repsValues[rowInfo.setNumber] || ""}
                    disabled={isLoading}
                    onChange={handleInputChange("reps")(rowInfo.setNumber)}
                    onKeyDown={allowOnlyIntegers}
                    onPaste={pasteOnlyIntegers}
                    placeholder={
                      rowInfo.previousReps
                        ? new String(rowInfo.previousReps)
                        : repsText
                    }
                  />
                </div>
              </React.Fragment>
            );
          })}
      </div>

      <div className="exercise-completer__chart-box">
        {(() => {
          return (
            <TranslatedChartSetsAndWeight
              data={previousData}
              realTimeData={realTimeData}
              isSmall={true}
              valuesInYAxis={ticksCountYAxis}
              isLoading={isLoading}
            />
          );
        })()}
      </div>
    </div>
  );
};

export default ExerciseCompleterV2;
