import React, { useState, useEffect } from 'react';

const ExercisePresenterV2 = ({
    id,
    name,
    description,
    isCommon = false,
    placeholderSets = "Sets",
    isDisabled = false,
    orderInTemplate = null, // IMPORTANT: Use only with the extra class .exercise-presenter--creating-template
    exercisesInTemplate = [], // IMPORTANT: Use only with the extra class .exercise-presenter--creating-template
    exercisesInTemplateSetter = () => { }, // IMPORTANT: Use only with the extra class .exercise-presenter--creating-template
    extraClasses = "",
    onClickEdit = () => { },
    onClickDelete = () => { },
    onClickRemoveFromTemplate = () => { },
}) => {
    const [numberOfSets, setNumberOfSets] = useState(1);
    const [actionsEnabled, setActionsEnabled] = useState(true);

    useEffect(() => {
        const disabled = isCommon || isDisabled;
        setActionsEnabled(!disabled);
    }, [isDisabled, isCommon]);

    const updateSetsInTemplate = (newSets) => {
        if (orderInTemplate !== null) {
            const exerciseInTemplate = exercisesInTemplate.find(exercise => exercise.id === id);
            if (exerciseInTemplate && /^-?\d+$/.test(newSets)) {
                const sets = parseInt(newSets);

                const updatedExercise = { ...exerciseInTemplate };
                updatedExercise.sets = sets;

                // make a copy of exercisesInTemplate, update the exercise and set it
                const updatedExercises = [...exercisesInTemplate];
                const index = updatedExercises.findIndex(exercise => exercise.id === id);
                updatedExercises[index] = updatedExercise;
                exercisesInTemplateSetter(updatedExercises);
            }
        }
    };

    const handleSetsChange = (event) => {
        const value = event.target.value;
        setNumberOfSets(value);
        updateSetsInTemplate(value);
    };

    useEffect(() => {
        updateSetsInTemplate(numberOfSets);
    }, [orderInTemplate]);

    return (
        <div className={`
            exercise-presenter 
            ${isCommon ? 'exercise-presenter--no-actions' : ''} 
            ${isDisabled ? 'exercise-presenter--disabled' : ''}
            ${extraClasses}`}>
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
            </div>

            {orderInTemplate !== null && (
                <div className="exercise-presenter__sets-box">
                    {/* TODO validate only integers */}
                    <input
                        className={`
                            base-input-text integer-input
                            ${!actionsEnabled ? 'exercise-presenter__sets-input--disabled' : ''}
                            `}
                        onChange={handleSetsChange}
                        value={numberOfSets}
                        type="number"
                        placeholder={placeholderSets}
                        disabled={!actionsEnabled}
                        max={99}
                        min={1}
                    />
                </div>
            )}

            <div className="exercise-presenter__actions-box">
                <figure
                    className={`
                        exercise-presenter__icon-box 
                        exercise-presenter__icon-box--delete
                        ${!actionsEnabled ? 'exercise-presenter__icon-box--disabled' : ''}
                        `}
                    // enabled={isCommon ? 'false' : 'true'}
                    disabled={!actionsEnabled}
                    onClick={actionsEnabled ? onClickDelete : () => { }}
                >
                    <ion-icon name="trash-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure
                    className={`
                        exercise-presenter__icon-box 
                        exercise-presenter__icon-box--remove-from-template
                        ${!actionsEnabled ? 'exercise-presenter__icon-box--disabled' : ''}
                        `}
                    onClick={actionsEnabled ? onClickRemoveFromTemplate : () => { }}
                    // enabled={isCommon ? 'false' : 'true'}
                    disabled={!actionsEnabled}
                >
                    <ion-icon name="remove-circle-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>

                <figure
                    className={`
                        exercise-presenter__icon-box 
                        exercise-presenter__icon-box--edit
                        ${!actionsEnabled ? 'exercise-presenter__icon-box--disabled' : ''}
                        `}
                    // enabled={isCommon ? 'false' : 'true'}
                    disabled={!actionsEnabled}
                    onClick={actionsEnabled ? onClickEdit : () => { }}
                >
                    <ion-icon name="create-outline" className="exercise-presenter__icon"></ion-icon>
                </figure>
            </div>
        </div>
    );
}

export default ExercisePresenterV2;