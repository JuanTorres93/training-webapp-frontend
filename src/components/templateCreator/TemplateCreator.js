import React, { useState, useEffect } from "react";
import Fuse from "fuse.js";

import ButtonIconAndText from "../buttonIconAndText/ButtonIconAndText";
import ExercisePresenterV2 from "../exercisePresenter/ExercisePresenterV2";
import TranslatedSearchBar from "../searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../ButtonNew/TranslatedButtonNew";

const TemplateCreator = ({
    nameLabel,
    descriptionLabel,
    availableExercisesText,
    usedExercisesText,
    createTemplateText,
    placeholderSets,
    exercisesData,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [shownExercises, setShownExercises] = useState([]);
    const [fuse, setFuse] = useState(null);

    useEffect(() => {
        // Fuse config
        const fuseInstance = new Fuse(exercisesData, {
            keys: ['name'],
            threshold: 0.1,
        });

        setFuse(fuseInstance);
    }, [exercisesData]);

    useEffect(() => {
        const avExercises = exercisesData;

        if (searchTerm.trim() === '') {
            setShownExercises(avExercises);
            return;
        }

        // Filter exercises according search term
        if (fuse) {
            const filteredExercises = fuse.search(searchTerm).map(result => result.item);
            setShownExercises(filteredExercises);
        }

    }, [exercisesData, searchTerm]);

    return (
        <div className="template-creator">
            <TranslatedSearchBar
                extraClasses="template-creator__exercise-search-bar"
                parentSearchSetterFunction={setSearchTerm}
            />
            <TranslatedButtonNew
                extraClasses="template-creator__exercise-button-new"
            // onClick={handleClickShowPopup}
            />

            <div className="template-creator__separator template-creator__separator--available-exercises separator-text-between-lines">{availableExercisesText}</div>

            <div className="template-creator__available-exercises-box">
                {
                    shownExercises.map((exercise) => (
                        <ExercisePresenterV2
                            extraClasses="exercise-presenter--no-actions u-mouse-pointer-hover"
                            id={exercise.id}
                            name={exercise.name}
                            description={exercise.description}
                        // onClickEdit={handleClickShowPopup}
                        />
                    ))
                }
            </div>
            <div className="template-creator__input-box template-creator__input-box--name">
                <label htmlFor="name" className="template-creator__label">{nameLabel}</label>
                <input
                    id="name"
                    className="base-input-text template-creator__input"
                    type="text"
                    placeholder={nameLabel}
                    maxLength={40}
                />
            </div>

            <div className="template-creator__input-box template-creator__input-box--description">
                <label htmlFor="description" className="template-creator__label">{descriptionLabel}</label>
                <textarea
                    id="description"
                    className="base-input-text template-creator__input"
                    placeholder={descriptionLabel}
                    maxLength={500}
                >

                </textarea>
            </div>

            <ButtonIconAndText
                ionIcon={<ion-icon name="checkmark-outline"></ion-icon>}
                text={createTemplateText}
                extraClasses="template-creator__confirm-button"
            />

            <div className="template-creator__separator template-creator__separator--used-exercises separator-text-between-lines">{usedExercisesText}</div>

            <div className="template-creator__used-exercises-box">
                <ExercisePresenterV2
                    extraClasses="exercise-presenter--creating-template"
                    orderInTemplate={1}
                    id="2"
                    name="Push up"
                    description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The push up is a basic movement that is very valuable for building strength and muscle mass."
                    placeholderSets={placeholderSets}
                // onClickEdit={handleClickShowPopup}
                />

                <ExercisePresenterV2
                    extraClasses="exercise-presenter--creating-template"
                    orderInTemplate={2}
                    id="3"
                    name="Squat"
                    description="Exercise for the leg muscles. It is a compound exercise that also involves the glutes, hamstrings, quads, and lower back. The squat is a basic movement that is very valuable for building strength and muscle mass."
                    placeholderSets={placeholderSets}
                // onClickEdit={handleClickShowPopup}
                />
            </div>
        </div>
    );
};

export default TemplateCreator;