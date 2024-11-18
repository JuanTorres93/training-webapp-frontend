

const ExercisePresenterV2 = ({
    id,
    name,
    description,
}) => {
    return (
        <div className="exercise-presenter">
            <div className="exercise-presenter__info-box">
                <span className="exercise-presenter__name">
                    NAME
                </span>
                <p className="exercise-presenter__description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corporis eveniet ipsam quisquam neque
                </p>

                <div className="exercise-presenter__extra-info-box">
                    STATS?
                </div>
            </div>

            <div className="exercise-presenter__actions-box">
                <figure className="exercise-presenter__icon-box exercise-presenter__icon-box--delete">
                    <ion-icon name="trash-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure className="exercise-presenter__icon-box exercise-presenter__icon-box--edit">
                    <ion-icon name="create-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>
            </div>
        </div>
    );
}

export default ExercisePresenterV2;