// import styles from './GenericList.module.css'
import styles from './GenericList.module.css';

function GenericList({ children = [] }) {
    // The ExerciseList component renders a list of exercises.
    return (
        // <div className={styles.list}>
        <div className={styles.list}>
            {children.map((child, index) => (
                <div className={styles.childContainer} key={index} >
                    {child}
                </div>
            ))}
        </div>
    );
}

export default GenericList;
