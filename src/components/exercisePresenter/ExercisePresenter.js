import PropTypes from 'prop-types';

function ExercisePresenter({ id, name, description }) {
    return (
        <>
            <div className="exercise-name">{name}</div>
            <div className="exercise-description">{description}</div>
        </>
    );
};

ExercisePresenter.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default ExercisePresenter;
