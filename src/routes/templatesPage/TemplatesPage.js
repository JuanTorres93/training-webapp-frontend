import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import ButtonNew from "../../components/ButtonNew/ButtonNew";
import TemplatePresenter from "../../components/templatePresenter/TemplatePresenter";
import PopupRows from "../../components/popupRows/PopupRows";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";
import TranslatedTemplateCreator from "../../components/templateCreator/TranslatedTemplateCreator";
import DeletePopupOptionOrCancel from "../../components/popupOptionOrCancel/DeletePopupOptionOrCancel";

import { selectUser } from "../../features/user/userSlice";
import {
  selectUserExercises,
  selectCommonExercises,
} from "../../features/exercises/exercisesSlice";
import {
  selectWorkoutsLoading,
  createWorkout,
  setLastWorkout,
  setLastNWorkouts,
} from "../../features/workouts/workoutSlice";
import {
  createWorkoutTemplate,
  updateWorkoutTemplate,
  getAllUserCreatedTemplates,
  selectUserTemplates,
  selectCommonTemplates,
  selectActiveTemplate,
  selectTemplatesLoading,
  deleteTemplateFromUser,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { selectCurrentLanguage } from "../../features/language/languageSlice";

import { selectLastPayment } from "../../features/payments/paymentsSlice";

// TODO refactor and include in slice for exercises?
import { addExerciseToTemplate as addExerciseToTemplateInDb } from "../../serverAPI/workoutsTemplates";

import {
  positionPopup,
  closePopupOnClickOutside,
  hidePopup,
  showPopup,
} from "../../utils/popups";
import { handleStartWorkout } from "../utils";

import {
  processCommonResourcesFromDb,
  processCommonStringFromDb,
} from "../../i18n";

import checkLastPayment from "../../utils/checkLastPayment";

export default function TemplatesPage({ mockCreateWorkoutTemplate = null }) {
  const user = useSelector(selectUser);
  const userTemplates = useSelector(selectUserTemplates);
  const rawCommonTemplates = useSelector(selectCommonTemplates);
  const [commonTemplates, setCommonTemplates] = useState(
    processCommonResourcesFromDb(rawCommonTemplates)
  );
  const workoutsLoading = useSelector(selectWorkoutsLoading);
  const templatesLoading = useSelector(selectTemplatesLoading);
  const activeTemplate = useSelector(selectActiveTemplate);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const lastPayment = useSelector(selectLastPayment);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  useEffect(() => {
    checkLastPayment(lastPayment, navigate);
  }, [lastPayment, user]);

  // templates stops loading when finish creating new one and then starts loading
  // again to include its exercises. During that time the interface blinks.
  // This state is to avoid that blinking
  const [waitForTemplatesToLoadAgain, setWaitForTemplatesToLoadAgain] =
    useState(false);

  // State for preview popup
  const [popupRowPosition, setPopupRowPosition] = useState({ x: 0, y: 0 });
  const [showPopupRow, setShowPopupRow] = useState(false);
  const [arrowClassModifierPopupRows, setArrowClassModifierPopupRows] =
    useState("top-center");

  // State for edit popup
  const [popupEditPosition, setPopupEditPosition] = useState({ x: 0, y: 0 });
  const [showPopupEdit, setShowPopupEdit] = useState(false);
  const [arrowClassModifierPopupEdit, setArrowClassModifierPopupEdit] =
    useState("top-left");
  const [templateIdToEdit, setTemplateIdToEdit] = useState("");

  // State for new template popup
  const [showPopupNewTemplate, setShowPopupNewTemplate] = useState(false);
  const [popupRows, setPopupRows] = useState([]);

  // State for delete popup
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [templateIdToDelete, setTemplateIdToDelete] = useState("");

  // state for available templates
  const [availableTemplates, setAvailableTemplates] = useState([]);

  // state for template presenters
  const [templatesPresenters, setTemplatesPresenters] = useState([]);

  // state for available exercises
  const userExercises = useSelector(selectUserExercises);
  const rawCommonExercises = useSelector(selectCommonExercises);
  const [commonExercises, setCommonExercises] = useState(
    processCommonResourcesFromDb(rawCommonExercises)
  );

  const [availableExercises, setAvailableExercises] = useState([]);

  // State for templates search bar
  const [searchTemplateTerm, setSearchTemplateTerm] = useState("");
  const [fuse, setFuse] = useState(null);

  // Translation access
  const { t } = useTranslation();

  useEffect(() => {
    setCommonExercises(processCommonResourcesFromDb(rawCommonExercises));
  }, [rawCommonExercises, currentLanguage]);

  useEffect(() => {
    setCommonTemplates(processCommonResourcesFromDb(rawCommonTemplates));
  }, [rawCommonTemplates, currentLanguage]);

  useEffect(() => {
    // Fuse config
    const avTemplates = [...userTemplates, ...commonTemplates];

    const fuseInstance = new Fuse(avTemplates, {
      keys: ["name"],
      threshold: 0.1,
    });

    setFuse(fuseInstance);
  }, [userTemplates, commonTemplates]);

  useEffect(() => {
    // Compute available templates
    const avTemplates = [...userTemplates, ...commonTemplates];

    if (searchTemplateTerm.trim() === "") {
      setAvailableTemplates(avTemplates);
      return;
    }

    // Filter templates according search term
    if (fuse) {
      const filteredTemplates = fuse
        .search(searchTemplateTerm)
        .map((result) => result.item);
      setAvailableTemplates(filteredTemplates);
    }
  }, [userTemplates, commonTemplates, searchTemplateTerm]);

  useEffect(() => {
    setTemplatesPresenters(
      availableTemplates.map((template) => {
        // Individual TemplatePresenter is loading if state is loading
        // AND is the active template
        let templateIsActiveTemplate;
        if (!activeTemplate.id) {
          templateIsActiveTemplate = false;
        }

        templateIsActiveTemplate = template.id === activeTemplate.id;

        const templatePresenterIsLoading =
          (workoutsLoading || templatesLoading) && templateIsActiveTemplate;
        const disableTemplateActions = workoutsLoading || templatesLoading;

        return (
          <TemplatePresenter
            key={template.id}
            id={template.id}
            name={template.name}
            description={template.description}
            isCommonTemplate={template.isCommon}
            isLoading={templatePresenterIsLoading}
            disableActions={disableTemplateActions}
            onMouseEnter={handleMouseEntersTemplate(template.id)}
            onMouseLeave={handleMouseLeavesTemplate}
            onClickEdit={handleClickShowPopupEdit(template.id)}
            onClickDelete={handleClickShowDeletePopup(template.id)}
            // I'm not using availableTemplates because it may be filtered
            onClickStart={handleStartWorkout(user)(template.id)([
              ...userTemplates,
              ...commonTemplates,
            ])(dispatch)(createWorkout)(setLastWorkout)(setLastNWorkouts)(
              navigate
            )}
          />
        );
      })
    );
  }, [availableTemplates, activeTemplate, workoutsLoading, templatesLoading]);

  // Compute available exercises
  useEffect(() => {
    const avExercises = [...userExercises, ...commonExercises];

    setAvailableExercises(avExercises);
  }, [userExercises, commonExercises]);

  // Handlers for preview popup
  const handleMouseLeavesTemplate = (event) => {
    setShowPopupRow(false);
  };

  const handleMouseEntersTemplate = (templateId) => (event) => {
    // Get template exercises
    const template = availableTemplates.find((t) => t.id === templateId);

    const templateExercises = template.exercises.map((exercise, index) => ({
      exerciseOrder: exercise.order,
      exerciseName: processCommonStringFromDb(exercise.name),
      numberOfSets: exercise.sets,
    }));

    setPopupRows(templateExercises);

    // Position popup
    const upperLeft = { x: -10, y: 10, arrowClassModifier: "top-left" };
    const upperRight = upperLeft;

    // compensate for the popup height when different number of exercises in the lower part
    const numberOfExercises = template.exercises.length;
    const heighStep = 40;

    const referenceNumberOfExercises = 4;
    const exercisesDifference = Math.abs(
      referenceNumberOfExercises - numberOfExercises
    );

    let extraLowerOffset = 0;
    if (numberOfExercises > referenceNumberOfExercises) {
      // Rise the popup
      extraLowerOffset = -heighStep * exercisesDifference;
    } else if (numberOfExercises < referenceNumberOfExercises) {
      // Lower the popup
      extraLowerOffset = heighStep * exercisesDifference;
    }

    const lowerLeft = {
      x: -10,
      y: -440 + extraLowerOffset,
      arrowClassModifier: "bottom-left",
    };
    const lowerRight = lowerLeft;

    positionPopup(
      event,
      setPopupRowPosition,
      setArrowClassModifierPopupRows,
      upperLeft,
      upperRight,
      lowerLeft,
      lowerRight
    );

    // Show popup
    setShowPopupRow(true);
  };

  // Handlers for edit popup
  const handleClickShowPopupEdit = (templateId) => (event) => {
    const upperLeft = { x: -20, y: 10, arrowClassModifier: "top-left" };
    const upperRight = { x: -348, y: 10, arrowClassModifier: "top-right" };
    const lowerLeft = { x: -20, y: -265, arrowClassModifier: "bottom-left" };
    const lowerRight = { x: -348, y: -265, arrowClassModifier: "bottom-right" };

    positionPopup(
      event,
      setPopupEditPosition,
      setArrowClassModifierPopupEdit,
      upperLeft,
      upperRight,
      lowerLeft,
      lowerRight
    );

    setTemplateIdToEdit(templateId);
    setShowPopupEdit(true);
  };

  // delete template functionallity

  const handleClickShowDeletePopup = (templateId) => (event) => {
    setTemplateIdToDelete(templateId);
    setShowDeletePopup(true);
  };

  const generateDeleteTemplateDispatch = (e) => {
    return async () => {
      dispatch(deleteTemplateFromUser({ templateId: templateIdToDelete })).then(
        () => {
          setTemplateIdToDelete("");
          hidePopup(setShowDeletePopup);
        }
      );
    };
  };

  // Handlers for edit popup
  const handleClickShowPopupNewTemplate = (event) => {
    showPopup(setShowPopupNewTemplate);
  };

  const handleEditTemplate = (event) => {
    // Give componente a function to use with its stored values
    return async (name, description) => {
      dispatch(
        updateWorkoutTemplate({
          templateId: templateIdToEdit,
          name,
          description,
        })
      ).then((response) => {
        hidePopup(setShowPopupEdit);
      });
    };
  };

  const createDispatchNewTemplate = () => {
    return (templateName, templateDescription, exercisesInTemplate) => {
      // Create the template object
      const createTemplateBodyRequest = {
        userId: user.id,
        name: templateName,
        description: templateDescription ? templateDescription : "",
      };

      const createNewTemplateAction = mockCreateWorkoutTemplate
        ? mockCreateWorkoutTemplate
        : createWorkoutTemplate;

      // Create the template in the backend
      // Dispatch the action to create the template. Handle any errors and clean form if success
      // Return as promise to be able to wait for it and do a clean up
      return new Promise((resolve, reject) => {
        setWaitForTemplatesToLoadAgain(true);
        dispatch(createNewTemplateAction(createTemplateBodyRequest))
          .then((action) => {
            const newTemplate = action.payload;
            const promises = [];

            let exerciseOrder = 1;

            exercisesInTemplate.forEach((exercise) => {
              const addExercisesToTemplateInfo = {
                templateId: newTemplate.id,
                exerciseId: exercise.id,
                exerciseOrder: exerciseOrder,
                exerciseSets: exercise.sets,
              };

              exerciseOrder++;

              promises.push(
                addExerciseToTemplateInDb(addExercisesToTemplateInfo)
              );
            });

            // Wait for promises to resolve and handle them
            Promise.all(promises)
              .then(() => {
                // Update workout list
                dispatch(getAllUserCreatedTemplates({ userId: user.id })).then(
                  () => {
                    resolve({
                      msg: "Template created successfully",
                    });
                  }
                );
                setWaitForTemplatesToLoadAgain(false);
                setShowPopupNewTemplate(false);
              })
              .catch((error) => {
                reject({
                  msg: "Error adding exercises to template",
                  error,
                });
                setWaitForTemplatesToLoadAgain(false);
              });
          })
          .catch((error) => {
            reject({
              msg: "Error creating template",
              error,
            });
            setWaitForTemplatesToLoadAgain(false);
          });
      });
    };
  };

  return (
    // TODO include new template popup both its set function and class
    <div
      className="behind-app"
      onClick={(event) => {
        closePopupOnClickOutside(event, setShowPopupEdit, ["hydrated"]);
      }}
    >
      <main className="app-layout">
        <TranslatedNavVertical />
        <section className="templates-page">
          {/* Popup for creating new template */}
          <div
            className={`
                            templates-page__new-template-popup 
                            templates-page__new-template-popup--${
                              showPopupNewTemplate ? "real-size" : "shrunk"
                            }
                            ${
                              !showPopupNewTemplate
                                ? "templates-page__new-template-popup--hidden"
                                : null
                            }
                            `}
          >
            {/* Close popup button */}
            <figure
              className="templates-page__close-new-template-icon-box"
              onClick={() => hidePopup(setShowPopupNewTemplate)}
            >
              <ion-icon
                name="close-outline"
                className="templates-page__close-new-template-icon"
              ></ion-icon>
            </figure>
            <TranslatedTemplateCreator
              exercisesData={availableExercises}
              newTemplateDispatchGenerator={createDispatchNewTemplate}
              isLoading={templatesLoading || waitForTemplatesToLoadAgain}
            />
          </div>

          <PopupRows
            visibility={showPopupRow ? "visible" : "hidden"}
            arrowClassModifier={arrowClassModifierPopupRows}
            leftPx={popupRowPosition.x}
            topPx={popupRowPosition.y}
            rows={popupRows}
          />

          {/* POPUP for deleting templates */}
          <DeletePopupOptionOrCancel
            visibility={showDeletePopup ? "visible" : "hidden"}
            handleCancel={() => hidePopup(setShowDeletePopup)}
            handleOption={generateDeleteTemplateDispatch}
            subtitle={
              templateIdToDelete
                ? availableTemplates.find(
                    (template) => template.id === templateIdToDelete
                  ).name
                : ""
            }
            isLoading={templatesLoading || workoutsLoading}
          />

          <TranslatedPopupNameAndDescription
            arrowClassModifier={arrowClassModifierPopupEdit}
            visibility={showPopupEdit ? "visible" : "hidden"}
            leftPx={popupEditPosition.x}
            topPx={popupEditPosition.y}
            onClose={() => hidePopup(setShowPopupEdit)}
            acceptDispatchGenerator={handleEditTemplate}
            isLoading={
              templatesLoading || workoutsLoading || waitForTemplatesToLoadAgain
            }
          />

          <TranslatedSearchBar
            dataTestId="search-bar-templates"
            extraClasses="templates-page__search-bar"
            parentSearchSetterFunction={setSearchTemplateTerm}
          />

          <ButtonNew
            dataTestId="button-new-template"
            buttonText={t("button-new-template")}
            extraClasses="templates-page__button-new"
            onClick={handleClickShowPopupNewTemplate}
          />

          <div className="presenter-grid presenter-grid--templates">
            {templatesPresenters}
          </div>
        </section>
      </main>
    </div>
  );
}
