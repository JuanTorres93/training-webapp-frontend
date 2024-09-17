import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser, selectUserIsLoading } from '../../features/user/userSlice';

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./CreateExercisePage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";
import ListNameDescription from "../../components/listNameDescription/ListNameDescription";

import { getExercisesFromUser, selectExercisesLoading } from "../../features/exercises/exercisesSlice";
import { createExercise, deleteExercise } from "../../features/exercises/exercisesSlice";
import { selectUserExercises } from "../../features/exercises/exercisesSlice";
import { getAllUserCreatedTemplates, getUserRecentWorkouts } from "../../features/workoutsTemplates/workoutTemplatesSlice";

export default function CreateExercisePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);
    const exercisesLoading = useSelector(selectExercisesLoading);
    const availableExercises = useSelector(selectUserExercises);

    const [newExerciseAlias, setNewExerciseAlias] = useState('');
    const [newExerciseDescription, setNewExerciseDescription] = useState('');
    const [selectedExercise, setSelectedExercise] = useState({});

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) {
        return <PagePresenter children={
            <LoginForm
                user={user}
                userIsLoading={userIsLoading}
            />
        } />;
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(createExercise({ alias: newExerciseAlias, description: newExerciseDescription })).then((response) => {
                // Update user's exercises list
                dispatch(getExercisesFromUser({
                    userId: user.id,
                }));

                // clear form
                setNewExerciseAlias('');
                setNewExerciseDescription('');
            });

        } catch (error) {
            // TODO notify user about errors and how to fix them
            console.error('Exercise creation failed', error);
        }
    }

    const handleSelectExercise = (exerciseInfo) => {
        console.log('handleSelectExercise', exerciseInfo);
        setSelectedExercise(exerciseInfo);
    };

    const handleDeleteExerciseFromDb = ({ id }) => {
        dispatch(deleteExercise({ exerciseId: id })).then((response) => {
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
        }
        );
    };



    return (
        <PagePresenter children={
            <form onSubmit={handleSubmit}>
                <section className={styles.createTemplatePageContainer}>
                    <h2 className="heading">Create new exercise</h2>

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
                                value={newExerciseAlias}
                                disabled={exercisesLoading || userIsLoading}
                                onChange={(e) => setNewExerciseAlias(e.target.value)}
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
                                value={newExerciseDescription}
                                disabled={exercisesLoading || userIsLoading}
                                onChange={(e) => setNewExerciseDescription(e.target.value)}
                            >
                            </textarea>
                        </div>

                        <div className={styles.buttonContainer}>
                            {/* TODO add spinner when loading */}
                            <button
                                type="submit"
                                className={`${styles.createExerciseButton}`}
                                disabled={exercisesLoading || userIsLoading}
                            >
                                {
                                    exercisesLoading
                                        ? <div className="spinner-heading-size"></div>
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
                                isLoading={exercisesLoading}
                            />
                        </div>
                        {/* TODO show currently selected exercise */}
                        {/* TODO uncomment and finish if want to edit name and description of exercise */}
                        {/* 
                        <div className={styles.exerciseList}>
                            {selectedExercise && (
                                <div>
                                    <h3>Exercise name</h3>
                                    <p>{selectedExercise.name}</p>
                                    <h3>Exercise description</h3>
                                    <p>{selectedExercise.description}</p>
                                </div>
                            )}
                        </div>
                        */}
                    </section>

                </section>
            </form>
        } />
    );
};