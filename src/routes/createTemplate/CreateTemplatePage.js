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

export default function CreateTemplatePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

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

    const availableExercises = useSelector(selectUserExercises);
    const selectedExercises = useSelector(selectExercisesInNewTemplate);


    return (
        <PagePresenter children={
            <>
                {user ? (
                    <div className={styles.createTemplatePageContainer}>
                        <h2>Create new template</h2>

                        <div className={styles.templateInfoContainer}>
                            <div className={styles.inputContainer}>
                                <label htmlFor="template-name">Template name</label>
                                <input id="template-name" type="text" placeholder="Template name" />
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
                            <div className={styles.createTemplateOption}>
                                <p>Create template</p>
                            </div>
                            <div className={styles.createTemplateOption}>
                                <p>Create template and start workout</p>
                            </div>
                        </div>

                    </div>
                ) : (
                    <LoginForm />
                )}
            </>
        } />
    );
};