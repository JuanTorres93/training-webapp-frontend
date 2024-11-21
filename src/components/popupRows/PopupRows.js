const PopupRows = ({
    visibility = 'hidden',
    rows = [], // Array of objects with keys: exerciseOrder, exerciseName, numberOfSets
    topPx = 0,
    leftPx = 0,
}) => {
    return (
        <div
            className="popup-rows"
            style={{
                top: `${topPx}px`,
                left: `${leftPx}px`,
                visibility: visibility,
            }}
        >
            {rows.map((row, index) => (
                <div key={index} className="popup-rows__row">
                    <span className="popup-rows__exercise-order">
                        {row.exerciseOrder}
                    </span>

                    <span className="popup-rows__exercise-name">
                        {row.exerciseName}
                    </span>

                    <span className="popup-rows__exercise-sets">
                        {row.numberOfSets} sets
                    </span>
                </div>
            ))}
        </div>
    );
};

export default PopupRows;