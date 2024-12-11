import TranslatedChartSetsAndWeight from "../chartSetsAndWeight/TranslatedChartSetsAndWeight.js";

const ExerciseCompleterV2 = ({
    previousData,
    ticksCountYAxis,
    exerciseName,
}) => {
    return (
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

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>

                <div className="exercise-completer__set-number">
                    1
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="weight"
                        placeholder="Weight"
                    />
                </div>
                <div className="exercise-completer__reps">
                    {/* TODO and set number to name */}
                    {/* TODO last session value as placeholder */}
                    <input
                        className="base-input-text integer-input exercise-completer__input"
                        type="number"
                        name="reps"
                        placeholder="Reps"
                    />
                </div>
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