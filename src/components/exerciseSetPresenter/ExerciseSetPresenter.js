import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import stylesExercisePresenter from './../exercisePresenter/ExercisePresenter.module.css'

import styles from './ExerciseSetPresenter.module.css'

// import { updateExerciseSets } from '../../features/exercises/exercisesSlice';

function ExerciseSetPresenter({ id, name, description, handleClick = () => { } }) {
    const dispatch = useDispatch();

    const handleUpdateSets = (sets) => {
        // dispatch(updateExerciseSets({ id, sets }));
    };

    return (
        <div data-testid="exerciseSetPresenter"
            className={stylesExercisePresenter.container}
            onClick={() => { handleClick(id) }}
        >
            <div className={stylesExercisePresenter.exercisePresenter}>
                <div className={stylesExercisePresenter.exerciseName}>{name}</div>
                <div className={stylesExercisePresenter.exerciseDescription}>{description}</div>
                <div className={styles.setsContainer}>
                    <label htmlFor="sets-input">Sets:</label>
                    <input data-testid={"inputSets"}
                        className={styles.setsInput}
                        defaultValue={1}
                        type="number"
                        name="sets"
                        id="sets-input"
                        min={1}
                        onChange={(event) => handleUpdateSets(parseInt(event.target.value))}
                        // Prevent onClick of parent div to affect input, so the user can select it and modify its value    
                        onClick={(event) => event.stopPropagation()}
                    />
                </div>
            </div>
        </div>
    );
};

ExerciseSetPresenter.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export default ExerciseSetPresenter;
