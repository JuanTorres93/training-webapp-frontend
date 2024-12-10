

const ExerciseCompleterV2 = ({ }) => {
    return (
        <div className="exercise-completer">
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
                    2
                </div>
                <div className="exercise-completer__weight">
                    {/* TODO and set number to name */}
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
                charte
            </div>
        </div>
    );
}

export default ExerciseCompleterV2;