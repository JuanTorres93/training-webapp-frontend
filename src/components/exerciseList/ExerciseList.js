import PropTypes from 'prop-types';

import styles from './ExerciseList.module.css'
import ExercisePresenter from '../exercisePresenter/ExercisePresenter';
import ExerciseSetPresenter from '../exerciseSetPresenter/ExerciseSetPresenter';

function ExerciseList({ exercises, isSetPresenter = false }) {
    // The ExerciseList component renders a list of exercises.
    return (
        <div className={styles.exerciseList}>
            {exercises && exercises.length > 0 ? exercises.map((exercise) => (
                (!isSetPresenter) ? 
                    <ExercisePresenter 
                        key={exercise.id} 
                        id={exercise.id} 
                        name={exercise.name} 
                        description={exercise.description} 
                    /> 
                    :
                    <ExerciseSetPresenter 
                        key={exercise.id} 
                        id={exercise.id} 
                        name={exercise.name} 
                        description={exercise.description} 
                    />
            )) : null}
        </div>
    );
}

// Write prop types for the ExerciseList component.
ExerciseList.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        })
    ).isRequired,
    isSetPresenter: PropTypes.bool,
};

export default ExerciseList;
