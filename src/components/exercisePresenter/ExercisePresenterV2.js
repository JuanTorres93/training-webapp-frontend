const ExercisePresenterV2 = ({
    id,
    name,
    description,
    onClickEdit = () => { },
    // TODO add onClickDelete
}) => {
    return (
        <div className="exercise-presenter">
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

            <div className="exercise-presenter__actions-box">
                <figure className="exercise-presenter__icon-box exercise-presenter__icon-box--delete">
                    <ion-icon name="trash-outline" className="exercise-presenter__icon"></ion-icon>
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