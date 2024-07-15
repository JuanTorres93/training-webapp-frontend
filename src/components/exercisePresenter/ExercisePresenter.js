import PropTypes from 'prop-types';
import styles from './ExercisePresenter.module.css'

function ExercisePresenter({ id, name, description }) {
    // The ExercisePresenter component renders the name and description of an exercise.

    return (
        <div data-testid="exercisePresenter" className={styles.exercisePresenter}>
            <div className={styles.exerciseName}>{name}</div>
            <div className={styles.exerciseDescription}>{description}</div>
        </div>
    );
};

ExercisePresenter.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export default ExercisePresenter;
