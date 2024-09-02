import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/user/userSlice';

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./CreateExercisePage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";
import ListNameDescription from "../../components/listNameDescription/ListNameDescription";

import { getExercisesFromUser, selectExercisesLoading } from "../../features/exercises/exercisesSlice";
import { createExercise, deleteExercise } from "../../features/exercises/exercisesSlice";
import { selectUserExercises } from "../../features/exercises/exercisesSlice";

export default function CreateExercisePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const exercisesLoading = useSelector(selectExercisesLoading);

    const availableExercises = useSelector(selectUserExercises);

    const [alias, setAlias] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return <PagePresenter children={
            <LoginForm />
        } />;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(createExercise({ alias, description })).then((response) => {
                // Update user's exercises list
                dispatch(getExercisesFromUser({
                    userId: user.id,
                }));

                // clear form
                setAlias('');
                setDescription('');
            });

        } catch (error) {
            // TODO notify user about errors and how to fix them
            console.error('Exercise creation failed', error);
        }
    }

    const handleSelectExercise = (exerciseInfo) => {
        console.log('handleSelectExercise', exerciseInfo);
    };

    const handleDeleteExerciseFromDb = ({ id }) => {
        dispatch(deleteExercise({ exerciseId: id }));
    };



    return (
        <PagePresenter children={
            <form onSubmit={handleSubmit}>
                <section className={styles.createTemplatePageContainer}>
                    <h2>Create new exercise</h2>

                    <section className={styles.newExerciseContainer}>

                        <div className={styles.nameContainer}>
                            <label
                                htmlFor="input-exercise-name"
                                className={styles.fontSize}
                            >
                                Exercise name
                            </label>
                            <input
                                className={styles.fontSize}
                                id="input-exercise-name"
                                type="text"
                                placeholder="Exercise name"
                                value={alias}
                                onChange={(e) => setAlias(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.descriptionContainer}>
                            <label
                                className={`${styles.topMargin}`}
                                htmlFor="input-exercise-description"
                            >
                                Exercise description
                            </label>
                            <textarea
                                id="input-exercise-description"
                                className={styles.fontSize}
                                placeholder="Exercise description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            >
                            </textarea>
                        </div>

                        <div className={styles.buttonContainer}>
                            <button
                                type="submit"
                                className={`${styles.createExerciseButton}`}
                                disabled={exercisesLoading}
                            >
                                {
                                    exercisesLoading
                                        ? 'Creating exercise...'
                                        : 'Create exercise'
                                }
                            </button>
                        </div>

                    </section>

                    <section className={styles.exerciseListsContainer}>
                        <div className={styles.exerciseList}>
                            <h3>Exercises</h3>
                            <ListNameDescription
                                exercises={availableExercises}
                                handleExerciseClick={handleSelectExercise}
                                handleDeleteClick={handleDeleteExerciseFromDb}
                            />
                        </div>
                        <div className={styles.exerciseList}>
                            {/* TODO show currently selected exercise */}
                            {/* 
                            
                            <h3>Template's exercises</h3>
                            <ListNameDescription
                                exercises={selectedExercises}
                                isSetPresenter={true}
                                handleSetExerciseClick={handleRemoveExercise}
                            />
                            */}
                        </div>
                    </section>

                </section>
            </form>
        } />
    );
};