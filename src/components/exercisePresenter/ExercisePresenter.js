import PropTypes from 'prop-types';
import styles from './ExercisePresenter.module.css'

function ExercisePresenter({ id, name, description }) {
    return (
        <div className={styles.exercisePresenter}>
            <div className={styles.exerciseName}>{name}</div>
            <div className={styles.exerciseDescription}>{description}</div>
        </div>
    );
};

ExercisePresenter.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ExercisePresenter;
