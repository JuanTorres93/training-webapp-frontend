import { useEffect, useState } from "react";
import Fuse from "fuse.js";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../../components/ButtonNew/TranslatedButtonNew";
import ExercisePresenterV2 from "../../components/exercisePresenter/ExercisePresenterV2";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";
import DeletePopupOptionOrCancel from "../../components/popupOptionOrCancel/DeletePopupOptionOrCancel";

import { selectUser } from "../../features/user/userSlice";
import {
    createExercise,
    updateExercise,
    getExercisesFromUser,
    selectCommonExercises,
    selectUserExercises,
    deleteExercise,
    selectExercisesLoading,
} from "../../features/exercises/exercisesSlice";

import {
    getAllUserCreatedTemplates,
    getUserRecentWorkouts,
    selectTemplatesLoading,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { selectCurrentLanguage } from "../../features/language/languageSlice";

import {
    positionPopup,
    closePopupOnClickOutside,
    hidePopup,
} from "../../utils/popups";

import { processCommonResourcesFromDb } from "../../i18n";

export default function ExercisesPage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentLanguage = useSelector(selectCurrentLanguage);
    const userExercises = useSelector(selectUserExercises);
    const rawCommonExercises = useSelector(selectCommonExercises);
    // const commonExercises = useSelector(selectCommonExercises);
    const [commonExercises, setCommonExercises] = useState(processCommonResourcesFromDb(rawCommonExercises));
    const exercisesLoading = useSelector(selectExercisesLoading);

    const templatesLoading = useSelector(selectTemplatesLoading);

    const [availableExercises, setAvailableExercises] = useState([]);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [showNameDescPopup, setShowNameDescPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [exerciseIdToDelete, setExerciseIdToDelete] = useState('');
    const [exerciseIdToEdit, setExerciseIdToEdit] = useState('');
    const [arrowClassModifier, setArrowClassModifier] = useState('top-left');
    const [searchTerm, setSearchTerm] = useState('');
    const [fuse, setFuse] = useState(null);
    // This is a flag for calling different functions when the popup is accepted
    // (Create new exercise, edit exercise, etc.)
    const [callerShowingPopup, setCallerShowingPopup] = useState('');
    const buttonNewCaller = 'button-new';
    const exercisePresenterCaller = 'exercise-presenter';

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);


    useEffect(() => {
        setCommonExercises(processCommonResourcesFromDb(rawCommonExercises));
    }, [rawCommonExercises, currentLanguage]);

    useEffect(() => {
        // Fuse config
        const avExercises = [...userExercises, ...commonExercises];

        const fuseInstance = new Fuse(avExercises, {
            keys: ['name'],
            threshold: 0.1,
        });

        setFuse(fuseInstance);
    }, [userExercises, commonExercises]);

    useEffect(() => {
        const avExercises = [...userExercises, ...commonExercises];


        if (searchTerm.trim() === '') {
            setAvailableExercises(avExercises);
            return;
        }

        // Filter exercises according search term
        if (fuse) {
            const filteredExercises = fuse.search(searchTerm).map(result => result.item);
            setAvailableExercises(filteredExercises);
        }

    }, [userExercises, commonExercises, searchTerm]);

    const handleClickShowNameDescPopup = caller => exerciseId => (event) => {
        const upperLeft = { x: -20, y: 10, arrowClassModifier: 'top-left' };
        const upperRight = { x: -348, y: 10, arrowClassModifier: 'top-right' };
        const lowerLeft = { x: -20, y: -265, arrowClassModifier: 'bottom-left' };
        const lowerRight = { x: -348, y: -265, arrowClassModifier: 'bottom-right' };

        positionPopup(
            event,
            setPopupPosition,
            setArrowClassModifier,
            upperLeft,
            upperRight,
            lowerLeft,
            lowerRight
        );

        if (exerciseId) {
            setExerciseIdToEdit(exerciseId);
        } else {
            setExerciseIdToEdit('');
        }

        setCallerShowingPopup(caller);
        setShowNameDescPopup(true);
    };

    const handleClickShowDeletePopup = exerciseId => (event) => {
        setExerciseIdToDelete(exerciseId);
        setShowDeletePopup(true);
    }

    const generateAcceptPopupDispatch = (e) => {
        if (callerShowingPopup === buttonNewCaller) {
            // Give componente a function to use with its stored values
            return async (name, description) => {
                dispatch(createExercise({ name, description })).then((response) => {
                    // Update user's exercises list
                    dispatch(getExercisesFromUser({
                        userId: user.id,
                    }));
                }).then(() => {
                    hidePopup(setShowNameDescPopup);
                });
            };
        } else if (callerShowingPopup === exercisePresenterCaller) {
            return async (name, description) => {
                dispatch(updateExercise({ exerciseId: exerciseIdToEdit, name, description })).then(() => {
                    setExerciseIdToEdit('');
                    hidePopup(setShowNameDescPopup);
                });
            };
        }
    };

    const generateDeleteExerciseDispatch = (e) => {
        return () => {
            dispatch(deleteExercise({ exerciseId: exerciseIdToDelete })).then((response) => {
                // Update user's exercises list
                dispatch(getExercisesFromUser({
                    userId: user.id,
                }));
                // Get user's templates
                dispatch(getAllUserCreatedTemplates({
                    userId: user.id,
                }));
                // Get user's recent workouts
                dispatch(getUserRecentWorkouts({
                    userId: user.id,
                }));
            }).then(() => {
                setExerciseIdToDelete('');
                hidePopup(setShowDeletePopup);
            });
        }
    };


    return (
        <div className="behind-app" onClick={(event) => { closePopupOnClickOutside(event, setShowNameDescPopup, ["hydrated", "button-new", "button-new__text"]) }}>
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="exercises-page">
                    <TranslatedPopupNameAndDescription
                        arrowClassModifier={arrowClassModifier}
                        visibility={showNameDescPopup ? 'visible' : 'hidden'}
                        leftPx={popupPosition.x}
                        topPx={popupPosition.y}
                        onClose={() => hidePopup(setShowNameDescPopup)}
                        acceptDispatchGenerator={generateAcceptPopupDispatch}
                    />

                    <DeletePopupOptionOrCancel
                        visibility={showDeletePopup ? 'visible' : 'hidden'}
                        handleCancel={() => hidePopup(setShowDeletePopup)}
                        handleOption={generateDeleteExerciseDispatch}
                        subtitle={exerciseIdToDelete ? availableExercises.find(exercise => exercise.id === exerciseIdToDelete).name : ''}
                        isLoading={exercisesLoading || templatesLoading}
                    />

                    <TranslatedSearchBar
                        extraClasses="exercises-page__search-bar"
                        parentSearchSetterFunction={setSearchTerm}
                    />
                    <TranslatedButtonNew
                        extraClasses="exercises-page__button-new"
                        onClick={handleClickShowNameDescPopup(buttonNewCaller)(null)}
                    />

                    <div className="presenter-grid presenter-grid--exercises">
                        {
                            availableExercises.map((exercise) => {
                                return (
                                    <ExercisePresenterV2
                                        key={exercise.id}
                                        id={exercise.id}
                                        name={exercise.name}
                                        isCommon={exercise.isCommon}
                                        description={exercise.description}
                                        onClickEdit={handleClickShowNameDescPopup(exercisePresenterCaller)(exercise.id)}
                                        onClickDelete={handleClickShowDeletePopup(exercise.id)}
                                    />
                                );
                            })
                        }
                    </div>
                </section>
            </main>
        </div>
    );
};
