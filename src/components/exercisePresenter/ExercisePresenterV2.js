const ExercisePresenterV2 = ({
    id,
    name,
    description,
    isCommon = false,
    placeholderSets = "Sets",
    orderInTemplate = null, // IMPORTANT: Use only with the extra class .exercise-presenter--creating-template
    extraClasses = "",
    onClickEdit = () => { },
    onClickDelete = () => { },
}) => {
    return (
        <div className={`exercise-presenter ${isCommon ? 'exercise-presenter--no-actions' : ''} ${extraClasses}`}>
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
                        className="base-input-text integer-input"
                        type="number"
                        placeholder={placeholderSets}
                        max={99}
                        min={1}
                    />
                </div>
            )}

            <div className="exercise-presenter__actions-box">
                <figure
                    className="exercise-presenter__icon-box exercise-presenter__icon-box--delete"
                    enabled={isCommon ? 'false' : 'true'}
                    onClick={onClickDelete}
                >
                    <ion-icon name="trash-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure
                    className="exercise-presenter__icon-box exercise-presenter__icon-box--remove-from-template"
                    enabled={isCommon ? 'false' : 'true'}
                >
                    <ion-icon name="remove-circle-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure
                    className="exercise-presenter__icon-box exercise-presenter__icon-box--edit"
                    enabled={isCommon ? 'false' : 'true'}
                    onClick={onClickEdit}
                >
                    <ion-icon name="create-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>
            </div>
        </div>
    );
}

export default ExercisePresenterV2;