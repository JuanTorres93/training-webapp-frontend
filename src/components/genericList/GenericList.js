import styles from './GenericList.module.css'

function GenericList({ children = [] }) {
    // The ExerciseList component renders a list of exercises.
    return (
        <div className={styles.list}>
            {children.map((child, index) => (
                <div key={index}>
                    {child}
                </div>
            ))}
        </div>
    );
}

export default GenericList;
