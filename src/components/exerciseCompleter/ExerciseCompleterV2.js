// import react needed for testing
import React, { useState, useEffect } from "react";

import TranslatedChartSetsAndWeight from "../chartSetsAndWeight/TranslatedChartSetsAndWeight.js";

const ExerciseCompleterV2 = ({
    previousData,
    ticksCountYAxis,
    exerciseName,
    rowsInfo = [],
    dispatchGenerator = (setNumber, weight, reps) => { },
    // Empty the exercises of the active workout
    clearExercisesDispatchGenerator = () => { },
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

    const [exerciseData, setExerciseData] = useState({});

    const handleInputChange = type => setNumber => (event) => {
        // type is either 'weight' or 'reps'
        const targetValue = event.target.value;

        let value;
        try {
            value = parseInt(targetValue) ? parseInt(targetValue) : 0;
        } catch (error) {
            value = 0;
        }

        // Set data in this component
        setExerciseData({
            ...exerciseData,
            [setNumber]: {
                ...exerciseData[setNumber],
                [type]: value,
            },
        });

        // Set data in redux state for reaching the server
        // Get function for updating redux state
        let dispatch;

        if (type === 'weight') {
            dispatch = dispatchGenerator(setNumber, value, exerciseData[setNumber].reps);
        } else if (type === 'reps') {
            dispatch = dispatchGenerator(setNumber, exerciseData[setNumber].weight, value);
        }

        if (dispatch) {
            // Dispatch the action
            dispatch();
        }
    };

    // Init all data with zeros to prevent "undefined" errors
    useEffect(() => {
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
        rowsInfo.forEach(row => {
            const dispatch = dispatchGenerator(row.setNumber, 0, 0);
            if (dispatch) {
                dispatch();
            }
        });
    }, [rowsInfo]);

    return (
        // TODO TRANSLATE
        <div className="exercise-completer">
            <div className="exercise-completer__exercise-title-box">
                <h3 className="exercise-completer__exercise-title">
                    {exerciseName}
                </h3>
            </div>
            <div className="exercise-completer__info-box">
                {/* Column titles */}
                <div className="exercise-completer__title">
                    Set
                </div>
                <div className="exercise-completer__title">
                    Weight
                </div>
                <div className="exercise-completer__title">
                    reps
                </div>

                {/* Rows */}
                {
                    rowsInfo && rowsInfo.map((rowInfo, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className="exercise-completer__set-number">
                                    {rowInfo.setNumber}
                                </div>
                                <div className="exercise-completer__weight">
                                    <input
                                        className="base-input-text integer-input exercise-completer__input"
                                        type="number"
                                        name="weight"
                                        onChange={handleInputChange('weight')(rowInfo.setNumber)}
                                        placeholder={rowInfo.previousWeight ? new String(rowInfo.previousWeight) : 'Weight'}
                                    />
                                </div>
                                <div className="exercise-completer__reps">
                                    <input
                                        className="base-input-text integer-input exercise-completer__input"
                                        type="number"
                                        name="reps"
                                        onChange={handleInputChange('reps')(rowInfo.setNumber)}
                                        placeholder={rowInfo.previousReps ? new String(rowInfo.previousReps) : 'Reps'}
                                    />
                                </div>
                            </React.Fragment>
                        );
                    })
                }
            </div>

            <div className="exercise-completer__chart-box">
                <TranslatedChartSetsAndWeight
                    data={previousData}
                    isSmall={true}
                    valuesInYAxis={ticksCountYAxis}
                />
            </div>
        </div>
    );
}

export default ExerciseCompleterV2;