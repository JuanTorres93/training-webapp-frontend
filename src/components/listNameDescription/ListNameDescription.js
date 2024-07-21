import PropTypes from 'prop-types';

import styles from './ListNameDescription.module.css'
import ExercisePresenter from '../exercisePresenter/ExercisePresenter';
import ExerciseSetPresenter from '../exerciseSetPresenter/ExerciseSetPresenter';

function ListNameDescription({ exercises, isSetPresenter = false,
    handleExerciseClick = () => { },
    handleExerciseDoubleClick = () => { },
    handleSetExerciseClick = () => { } }) {
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
                        handleClick={handleExerciseClick}
                        handleDoubleClick={handleExerciseDoubleClick}
                    />
                    :
                    <ExerciseSetPresenter
                        key={exercise.id}
                        id={exercise.id}
                        name={exercise.name}
                        description={exercise.description}
                        handleClick={handleSetExerciseClick}
                    />
            )) : null}
        </div>
    );
}

// Write prop types for the ExerciseList component.
ListNameDescription.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            handleExerciseClick: PropTypes.func,
        })
    ),
    isSetPresenter: PropTypes.bool,
};

export default ListNameDescription;
