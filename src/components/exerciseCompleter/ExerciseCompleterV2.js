// import react needed for testing
import React from "react";

import TranslatedChartSetsAndWeight from "../chartSetsAndWeight/TranslatedChartSetsAndWeight.js";

const ExerciseCompleterV2 = ({
    previousData,
    ticksCountYAxis,
    exerciseName,
    rowsInfo = [],
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
                                        placeholder={rowInfo.previousWeight ? new String(rowInfo.previousWeight) : 'Weight'}
                                    />
                                </div>
                                <div className="exercise-completer__reps">
                                    <input
                                        className="base-input-text integer-input exercise-completer__input"
                                        type="number"
                                        name="reps"
                                        placeholder="Reps"
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