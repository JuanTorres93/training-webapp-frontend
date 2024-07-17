import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/user/userSlice';

import ListNameDescription from "../../components/listNameDescription/ListNameDescription";
import PagePresenter from "../../components/pagePresenter/PagePresenter";
import LoginForm from "../../components/loginForm/LoginForm";
import styles from "./CreateTemplatePage.module.css";

import { 
    selectUserExercises, 
    selectExercisesInNewTemplate, 
    addExerciseToTemplate,
    removeExerciseFromTemplate,
} from "../../features/exercises/exercisesSlice";

import { 
    createWorkoutTemplate,
    selectTemplatesLoading,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import { addExerciseToTemplate as addExerciseToTemplateInDb } from "../../serverAPI/workoutsTemplates";

export default function CreateTemplatePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const templatesLoading = useSelector(selectTemplatesLoading);

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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Colect the data from the form based on input ids
        const templateName = e.target["template-name"].value;
        const templateDescription = e.target["template-description"].value;

        // Create the template object
        const createTemplateBodyRequest = {
            userId: user.id,
            alias: templateName,
            description: templateDescription,
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
                
                // TODO DELETE THESE DEBUG LOGS
                console.log('newTemplate');
                console.log(newTemplate);
                
                const exerciseOrder = 1;
                
                selectedExercises.forEach(exercise => {
                    // TODO DELETE THESE DEBUG LOGS
                    console.log('exercise');
                    console.log(exercise);

                    const addExercisesToTemplateInfo = {
                        templateId: newTemplate.id,
                        exerciseId: exercise.id,
                        exerciseOrder: exerciseOrder,
                        // TODO Coger sets
                        exerciseSets: 'sets',
                    };

                    exerciseOrder++;
                    
                    // promises.push(
                        // addExerciseToTemplate({
                            // templateId: newTemplate.id,
                            // exerciseId: exercise.id,
                            // exerciseOrder: 0,
                            // exerciseSets: 0,
                        // })
                    // );
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

                            {/* Create a div that will act as a button with two possible options. 
                            One of them "Create template" and the other one "Create template and start workout". 
                            The buttons are going to be implemented as divs with use of CSS. A vertical 
                            subtle line must me render between both buttons */}
                            <div className={styles.createTemplateOptions}>
                                <button id="create-template" type="submit"
                                        className={styles.createTemplateOption}
                                        disabled={submitDisabled}
                                >
                                    {
                                        templatesLoading ? 'Creating template...' : 'Create template'
                                    }
                                </button>

                                <button id="create-template-and-start" type="submit"
                                        className={styles.createTemplateOption} 
                                        disabled={submitDisabled}
                                >
                                    {
                                        templatesLoading ? 'Creating template...' : 'Create template and start workout'
                                    }
                                </button>
                            </div>
                                 

                        </form>
                    </div>
                ) : (
                    <LoginForm />
                )}
            </>
        } />
    );
};