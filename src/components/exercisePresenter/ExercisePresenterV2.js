const ExercisePresenterV2 = ({
    id,
    name,
    description,
    orderInTemplate = null, // IMPORTANT: Use only with the extra class .exercise-presenter--creating-template
    extraClasses = "",
    onClickEdit = () => { },
    // TODO add onClickDelete
}) => {
    return (
        <div className={`exercise-presenter ${extraClasses}`}>
            {orderInTemplate !== null && (
                <div className="exercise-presenter__order-box">
                    <span className="exercise-presenter__order">
                        {orderInTemplate}
                    </span>
                </div>
            )}

            <div className="exercise-presenter__info-box">
                <span className="exercise-presenter__name">
                    {name}
                </span>
                <p className="exercise-presenter__description">
                    {description}
                </p>

                {/* TODO add stats or something? */}
                {/* <div className="exercise-presenter__extra-info-box">
                    STATS?
                </div> */}
            </div>

            {orderInTemplate !== null && (
                <div className="exercise-presenter__sets-box">
                    {/* TODO validate only integers */}
                    <input
                        className="base-input-text exercise-presenter__input-sets"
                        type="number"
                        // TODO TRADUCIR
                        placeholder="Sets"
                        max={99}
                        min={1}
                    />
                </div>
            )}

            <div className="exercise-presenter__actions-box">
                <figure className="exercise-presenter__icon-box exercise-presenter__icon-box--delete">
                    <ion-icon name="trash-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure className="exercise-presenter__icon-box exercise-presenter__icon-box--remove-from-template">
                    <ion-icon name="remove-circle-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure
                    className="exercise-presenter__icon-box exercise-presenter__icon-box--edit"
                    onClick={onClickEdit}
                >
                    <ion-icon name="create-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>
            </div>
        </div>
    );
}

export default ExercisePresenterV2;