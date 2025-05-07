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
  isLoading = false,
  newTemplateDispatchGenerator = () => {
    return (templateName, templateDescription, exercisesInTemplate) => {
      return new Promise((resolve, reject) => {});
    };
  },
}) => {
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [newTemplateExercises, setNewTemplateExercises] = useState([]);
  const [confirmButtonEnabled, setConfirmButtonEnabled] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [availableExercises, setAvailableExercises] = useState([]);
  const [shownExercises, setShownExercises] = useState([]);
  const [fuse, setFuse] = useState(null);

  useEffect(() => {
    setAvailableExercises(exercisesData);
  }, [exercisesData]);

  useEffect(() => {
    // Fuse config
    const fuseInstance = new Fuse(availableExercises, {
      keys: ["name"],
      threshold: 0.1,
    });

    setFuse(fuseInstance);
  }, [availableExercises]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setShownExercises(availableExercises);
      return;
    }

    // Filter exercises according search term
    if (fuse) {
      const filteredExercises = fuse
        .search(searchTerm)
        .map((result) => result.item);
      setShownExercises(filteredExercises);
    }
  }, [availableExercises, searchTerm]);

  useEffect(() => {
    // TODO  add condition to check valid sets for every exercise (I think it's already covered in ExerciseCompleterV2: Check)
    if (
      newTemplateName.trim() === "" ||
      newTemplateExercises.length === 0 ||
      isLoading
    ) {
      setConfirmButtonEnabled(false);
      return;
    }

    setConfirmButtonEnabled(true);
  }, [
    newTemplateName,
    newTemplateDescription,
    newTemplateExercises,
    isLoading,
  ]);

  const selectExerciseForNewTemplate = (exerciseId) => {
    // NOTE: Here can be problems if exercises are selected and meanwhile
    // the translation is changed.
    const exercise = availableExercises.find(
      (exercise) => exercise.id === exerciseId
    );

    if (!exercise) {
      return;
    }

    setNewTemplateExercises([...newTemplateExercises, exercise]);
    setAvailableExercises(
      availableExercises.filter((exercise) => exercise.id !== exerciseId)
    );
  };

  const removeExerciseFromNewTemplate = (exercisesIds) => {
    const idsToRemove = Array.isArray(exercisesIds)
      ? exercisesIds
      : [exercisesIds];

    const exercisesToRemove = newTemplateExercises.filter((exercise) =>
      idsToRemove.includes(exercise.id)
    );

    if (exercisesToRemove.length === 0) {
      return;
    }

    setAvailableExercises([...exercisesToRemove, ...availableExercises]);
    setNewTemplateExercises(
      newTemplateExercises.filter(
        (exercise) => !idsToRemove.includes(exercise.id)
      )
    );
  };

  const createNewTemplate = async () => {
    const dispatchAction = newTemplateDispatchGenerator();
    try {
      await dispatchAction(
        newTemplateName,
        newTemplateDescription,
        newTemplateExercises
      );
      // clean up
      setNewTemplateName("");
      setNewTemplateDescription("");
      const exercisesIdToReturn = newTemplateExercises.map((exercise) => {
        return exercise.id;
      });
      removeExerciseFromNewTemplate(exercisesIdToReturn);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="template-creator">
      {/* TODO later? Better indication and positioning of exercises search bar */}
      <TranslatedSearchBar
        extraClasses="template-creator__exercise-search-bar"
        parentSearchSetterFunction={setSearchTerm}
      />
      {/* <TranslatedButtonNew
                extraClasses="template-creator__exercise-button-new"
            /> */}

      <div className="template-creator__separator template-creator__separator--available-exercises separator-text-between-lines">
        {availableExercisesText}
      </div>

      <div className="template-creator__available-exercises-box">
        {shownExercises.map((exercise) => (
          <div
            className={`
                template-creator__available-exercise-wrapper
                    ${
                      isLoading
                        ? "template-creator__available-exercise-wrapper--disabled"
                        : ""
                    }
                `}
            onClick={
              isLoading
                ? () => {}
                : () => selectExerciseForNewTemplate(exercise.id)
            }
            key={exercise.id}
          >
            <ExercisePresenterV2
              extraClasses="exercise-presenter--no-actions u-mouse-pointer-hover"
              id={exercise.id}
              name={exercise.name}
              description={exercise.description}
              isDisabled={isLoading}
            />
          </div>
        ))}
      </div>
      <div className="template-creator__input-box template-creator__input-box--name">
        <label htmlFor="name" className="template-creator__label">
          {nameLabel}
        </label>
        <input
          data-testid="new-template-name"
          id="name"
          className={`
            base-input-text template-creator__input
            ${isLoading ? "template-creator__input--disabled" : ""}
            `}
          onChange={(event) => setNewTemplateName(event.target.value)}
          value={newTemplateName}
          type="text"
          placeholder={nameLabel}
          disabled={isLoading}
          maxLength={40}
        />
      </div>

      <div className="template-creator__input-box template-creator__input-box--description">
        <label htmlFor="description" className="template-creator__label">
          {descriptionLabel}
        </label>
        <textarea
          data-testid="new-template-description"
          id="description"
          className={`
            base-input-text template-creator__input
            ${isLoading ? "template-creator__input--disabled" : ""}
            `}
          onChange={(event) => setNewTemplateDescription(event.target.value)}
          value={newTemplateDescription}
          placeholder={descriptionLabel}
          disabled={isLoading}
          maxLength={500}
        ></textarea>
      </div>

      <ButtonIconAndText
        dataTestId="create-template-button"
        ionIcon={<ion-icon name="checkmark-outline"></ion-icon>}
        text={createTemplateText}
        extraClasses="template-creator__confirm-button"
        onClick={confirmButtonEnabled ? createNewTemplate : () => {}}
        disabled={!confirmButtonEnabled}
        isLoading={isLoading}
      />

      <div className="template-creator__separator template-creator__separator--used-exercises separator-text-between-lines">
        {usedExercisesText}
      </div>

      <div className="template-creator__used-exercises-box">
        {newTemplateExercises.map((exercise, index) => (
          <ExercisePresenterV2
            key={exercise.id}
            id={exercise.id}
            orderInTemplate={index + 1}
            exercisesInTemplate={newTemplateExercises}
            exercisesInTemplateSetter={setNewTemplateExercises}
            extraClasses="exercise-presenter--creating-template"
            name={exercise.name}
            description={exercise.description}
            placeholderSets={placeholderSets}
            onClickRemoveFromTemplate={() => {
              removeExerciseFromNewTemplate(exercise.id);
            }}
            isDisabled={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateCreator;
