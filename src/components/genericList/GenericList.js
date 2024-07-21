// import styles from './GenericList.module.css'
import styles from '../listNameDescription/ListNameDescription.module.css';

function GenericList({ children = [] }) {
    // The ExerciseList component renders a list of exercises.
    return (
        // <div className={styles.list}>
        <div className={styles.exerciseList}>
            {children.map((child, index) => (
                <div key={index}>
                    {child}
                </div>
            ))}
        </div>
    );
}

export default GenericList;
