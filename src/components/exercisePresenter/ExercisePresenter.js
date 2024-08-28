import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styles from './ExercisePresenter.module.css'

import { selectWorkoutsLoading } from '../../features/workouts/workoutSlice';
import { selectTemplatesLoading } from '../../features/workoutsTemplates/workoutTemplatesSlice';

function ExercisePresenter({
    id,
    name,
    description,
    handleClick = () => { },
    handleDoubleClick = () => { },
    handleDeleteClick = () => { }
}) {
    // The ExercisePresenter component renders the name and description of an exercise.
    const exerciseInfo = { id, name, description };

    const workoutsLoading = useSelector(selectWorkoutsLoading);
    const templatesLoading = useSelector(selectTemplatesLoading);
    const isLoading = workoutsLoading || templatesLoading;

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

            <div className={styles.deleteContainer}
                onClick={() => { handleDeleteClick(exerciseInfo) }}>
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
