export default function ExercisePresenter({ id, name, description }) {
    return (
        <>
            <div className="exercise-name">{name}</div>
            <div className="exercise-description">{description}</div>
        </>
    );
};