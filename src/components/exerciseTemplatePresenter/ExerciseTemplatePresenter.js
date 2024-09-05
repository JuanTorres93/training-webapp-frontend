import styles from './ExerciseTemplatePresenter.module.css';

function ExerciseTemplatePresenter({
    id, order, name, sets, isLoading = false,
    onClickRemove = () => { } }) {

    return (
        <div className={styles.container}>
            <div className={styles.exerciseTemplatePresenter}>
                <div className={styles.order}>{order}</div>
                <div className={styles.name}>{name}</div>
                <div className={styles.set}>{`${sets} sets`}</div>
            </div>

            <div
                className={`
                    ${styles.deleteContainer}
                    ${!isLoading ? styles.deleteContainerEnabled : styles.deleteContainerDisabled}
                    `}
                onClick={() => onClickRemove({
                    exerciseId: id,
                    exerciseOrder: order,
                })}
            >
                {isLoading ? <div className='spinner-body-size'></div> : '_'}
            </div>
        </div>
    );
}

export default ExerciseTemplatePresenter;