import PropTypes from 'prop-types';
import styles from './ExercisePresenter.module.css'

function ExercisePresenter({ id, name, description, handleClick = () => { }, handleDoubleClick = () => { } }) {
    // The ExercisePresenter component renders the name and description of an exercise.
    const exerciseInfo = { id, name, description };

    return (
        <div data-testid="exercisePresenter" className={styles.exercisePresenter}
            onClick={() => { handleClick(exerciseInfo) }}
            onDoubleClick={() => { handleDoubleClick(exerciseInfo) }}
        >
            <div className={styles.exerciseName}>{name}</div>
            <div className={styles.exerciseDescription}>{description}</div>
        </div>
    );
};

ExercisePresenter.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    handleClick: PropTypes.func,
};

export default ExercisePresenter;
