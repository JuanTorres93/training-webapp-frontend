import PropTypes from 'prop-types';
import stylesExercisePresenter from './../exercisePresenter/ExercisePresenter.module.css'

import styles from './ExerciseSetPresenter.module.css'

function ExerciseSetPresenter({ id, name, description }) {
    return (
        <div data-testid="exerciseSetPresenter" className={stylesExercisePresenter.exercisePresenter}>
            <div className={stylesExercisePresenter.exerciseName}>{name}</div>
            <div className={stylesExercisePresenter.exerciseDescription}>{description}</div>
            <div className={styles.setsContainer}>
                <label htmlFor="sets-input">Sets:</label>
                <input data-testid={"inputSets"} className={styles.setsInput} defaultValue={1} type="number" name="sets" id="sets-input" min={1} />
            </div>
        </div>
    );
};

ExerciseSetPresenter.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ExerciseSetPresenter;
