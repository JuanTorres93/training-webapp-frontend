import PropTypes from 'prop-types';
import styles from './ExercisePresenter.module.css'

function ExercisePresenter({
    id,
    name,
    description,
    isLoading = false,
    handleClick = () => { },
    handleDoubleClick = () => { },
    handleDeleteClick = () => { }
}) {
    // The ExercisePresenter component renders the name and description of an exercise.
    const exerciseInfo = { id, name, description };

    return (
        <div data-testid="exercisePresenter" className={styles.container}
        >
            <div className={styles.exercisePresenter}
                onClick={() => { handleClick(exerciseInfo) }}
                onDoubleClick={() => { handleDoubleClick(exerciseInfo) }}
            >
                <div className={styles.exerciseName}>{name}</div>
                <div className={styles.exerciseDescription}>{description}</div>
            </div>

            <div className={`${styles.deleteContainer} ${isLoading ? styles.deleteContainerDisabled : styles.deleteContainerEnabled}`}
                onClick={() => { !isLoading && handleDeleteClick(exerciseInfo) }}>
                {/* spinner is defined in index.css for global usage */}
                {isLoading ? <div className='spinner-body-size'></div> : 'x'} {/* Conditional rendering */}
            </div>
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
