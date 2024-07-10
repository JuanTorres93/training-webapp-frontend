import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUser } from '../../features/user/userSlice';

import PagePresenter from "../../components/pagePresenter/PagePresenter";
import styles from "./CreateExercisePage.module.css";
import { createExercise } from "../../serverAPI/exercises";

export default function CreateExercisePage() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const [alias, setAlias] = useState('');
    const [description, setDescription] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createExercise(alias, description);

            if (response.id) {
                console.log('Exercise creation successful', response);

                // clear form
                setAlias('');
                setDescription('');
            }
        } catch (error) {
            // TODO notify user about errors and how to fix them
            console.error('Exercise creation failed', error);
        }
    }



    return (
        <PagePresenter children={
            <form onSubmit={handleSubmit}>
                <h2>Create new exercise</h2>

                <label htmlFor="input-exercise-name">Exercise name</label>
                <input id="input-exercise-name" type="text" placeholder="Exercise name"
                       onChange={(e) => setAlias(e.target.value)} required />

                <label className={styles.topMargin} htmlFor="input-exercise-description">Exercise description</label>
                <textarea id="input-exercise-description" placeholder="Exercise description"
                          onChange={(e) => setDescription(e.target.value)} ></textarea>

                <button type="submit" className={styles.createExerciseButton}>Create exercise</button>
            </form>
        } />
    );
};