import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/user/userSlice';

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./CreateExercisePage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";

import { getExercisesFromUser, selectExercisesLoading } from "../../features/exercises/exercisesSlice";
import { createExercise } from "../../features/exercises/exercisesSlice";

export default function CreateExercisePage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const exercisesLoading = useSelector(selectExercisesLoading);

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



    return (
        <PagePresenter children={
            <form onSubmit={handleSubmit}>
                <h2>Create new exercise</h2>

                <div className={styles.inputWrapper}>
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

                <div className={styles.inputWrapper}>
                    <label
                        className={`${styles.topMargin} ${styles.fontSize}`}
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


                <button
                    type="submit"
                    className={`${styles.createExerciseButton} ${styles.fontSize}`}
                    disabled={exercisesLoading}
                >
                    {
                        exercisesLoading
                            ? 'Creating exercise...'
                            : 'Create exercise'
                    }
                </button>
            </form>
        } />
    );
};