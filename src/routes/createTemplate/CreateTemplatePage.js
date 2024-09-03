import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser, selectUserIsLoading } from '../../features/user/userSlice';

import ListNameDescription from "../../components/listNameDescription/ListNameDescription";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import LoginForm from "../../components/loginForm/LoginForm";
import styles from "./CreateTemplatePage.module.css";

import {
    selectUserExercises,
    selectExercisesInNewTemplate,
    selectExercisesLoading,
    addExerciseToTemplate,
    removeExerciseFromTemplate,
    deleteExercise,
} from "../../features/exercises/exercisesSlice";

import {
    createWorkoutTemplate,
    selectTemplatesLoading,
    getAllUserCreatedTemplates,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { addExerciseToTemplate as addExerciseToTemplateInDb } from "../../serverAPI/workoutsTemplates";

export default function CreateTemplatePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

    const templatesLoading = useSelector(selectTemplatesLoading);
    const exercisesLoading = useSelector(selectExercisesLoading);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleSelectExercise = (exerciseInfo) => {
        dispatch(addExerciseToTemplate(exerciseInfo));
    };

    const handleRemoveExercise = (exerciseId) => {
        dispatch(removeExerciseFromTemplate(exerciseId));
    };

    const handleDeleteExerciseFromDb = ({ id }) => {
        dispatch(deleteExercise({ exerciseId: id }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Colect the data from the form based on input ids
        const templateName = e.target["template-name"].value;
        const templateDescription = e.target["template-description"].value;

        // Create the template object
        const createTemplateBodyRequest = {
            userId: user.id,
            alias: templateName,
            description: templateDescription ? templateDescription : '',
        };

        // Create the template in the backend
        // Dispatch the action to create the template. Handle any errors and clean form if success
        dispatch(createWorkoutTemplate(createTemplateBodyRequest))
            .then((action) => {
                e.target["template-name"].value = '';
                e.target["template-description"].value = '';
                selectedExercises.forEach(exercise => {
                    dispatch(removeExerciseFromTemplate(exercise.id));
                });

                const newTemplate = action.payload;
                const promises = [];

                let exerciseOrder = 1;

                selectedExercises.forEach(exercise => {
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
                        dispatch(getAllUserCreatedTemplates({ userId: user.id })).then(() => {
                            // TODO only if the second button is clicked
                            navigate(`/startWorkout/template/${newTemplate.id}`);
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            })
            .catch((error) => {
                console.error(error);
            });
    };

    const availableExercises = useSelector(selectUserExercises);
    const selectedExercises = useSelector(selectExercisesInNewTemplate);

    const submitDisabled = selectedExercises.length === 0 || templatesLoading;


    return (
        <PagePresenter children={
            <>
                {user ? (
                    <div className={styles.createTemplatePageContainer}>
                        <h2>Create new template</h2>
                        <form onSubmit={handleFormSubmit}>
                            {availableExercises.length > 0 &&
                                <div className={styles.createTemplatePageContainer}>
                                    <div className={styles.templateInfoContainer}>
                                        <div className={styles.inputContainer}>
                                            <label htmlFor="template-name">Template name</label>
                                            <input id="template-name"
                                                type="text"
                                                placeholder="Template name"
                                                required
                                            />
                                        </div>

                                        <div className={styles.inputContainer}>
                                            <label htmlFor="template-description">Template description</label>
                                            <textarea id="template-description" placeholder="Template description"></textarea>
                                        </div>
                                    </div>

                                    <div className={styles.exerciseListsContainer}>
                                        <div className={styles.exerciseList}>
                                            <h3>Exercises</h3>
                                            <ListNameDescription
                                                exercises={availableExercises}
                                                handleExerciseClick={handleSelectExercise}
                                                handleDeleteClick={handleDeleteExerciseFromDb}
                                                isLoading={exercisesLoading}
                                            />
                                        </div>
                                        <div className={styles.exerciseList}>
                                            {/* TODO Change this to user template's name input */}
                                            <h3>Template's exercises</h3>
                                            <ListNameDescription
                                                exercises={selectedExercises}
                                                isSetPresenter={true}
                                                handleSetExerciseClick={handleRemoveExercise}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.createTemplateOptions}>
                                        <button id="create-template" type="submit"
                                            className={styles.createTemplateOption}
                                            disabled={submitDisabled}
                                        >
                                            {
                                                templatesLoading ? <div className="spinner-body-size"></div> : 'Create template'
                                            }
                                        </button>

                                        <button id="create-template-and-start" type="submit"
                                            className={styles.createTemplateOption}
                                            disabled={submitDisabled}
                                        >
                                            {
                                                templatesLoading ? <div className="spinner-body-size"></div> : 'Create template and start workout'
                                            }
                                        </button>
                                    </div>
                                </div>
                            }

                            {/* Redirect to /createExercise if there are no availableExercises */}
                            {availableExercises.length === 0 && (
                                <div>
                                    <p style={{ fontSize: 'var(--subheading-font-size)' }}>You don't have any exercises yet.</p>
                                    <button onClick={() => navigate('/createExercise')}>Create an exercise</button>
                                </div>
                            )}

                        </form>
                    </div>
                ) : (
                    <LoginForm
                        user={user}
                        userIsLoading={userIsLoading}
                    />
                )}
            </>
        } />
    );
};