import { useEffect, useState } from "react";

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
    getExercisesFromUser,
    selectCommonExercises,
    selectUserExercises,
    deleteExercise,
} from "../../features/exercises/exercisesSlice";

import {
    getAllUserCreatedTemplates,
    getUserRecentWorkouts,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import {
    positionPopup,
    closePopupOnClickOutside,
    hidePopup,
} from "../../utils/popups";

export default function ExercisesPage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userExercises = useSelector(selectUserExercises);
    const commonExercises = useSelector(selectCommonExercises);

    const [availableExercises, setAvailableExercises] = useState([]);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [showNameDescPopup, setShowNameDescPopup] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [exerciseIdToDelete, setExerciseIdToDelete] = useState('');
    const [arrowClassModifier, setArrowClassModifier] = useState('top-left');
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
        setAvailableExercises([...userExercises, ...commonExercises]);
    }, [userExercises, commonExercises]);

    const handleClickShowNameDescPopup = caller => (event) => {
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
            console.log('Editing exercise');
            // TODO EDIT EXERCISE
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
                    />

                    <TranslatedSearchBar
                        extraClasses="exercises-page__search-bar"
                    />
                    <TranslatedButtonNew
                        extraClasses="exercises-page__button-new"
                        onClick={handleClickShowNameDescPopup(buttonNewCaller)}
                    />

                    <div className="presenter-grid presenter-grid--exercises">
                        {
                            availableExercises.map((exercise) => {
                                return (
                                    <ExercisePresenterV2
                                        key={exercise.id}
                                        id={exercise.id}
                                        name={exercise.name}
                                        description={exercise.description}
                                        onClickEdit={handleClickShowNameDescPopup(exercisePresenterCaller)}
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
