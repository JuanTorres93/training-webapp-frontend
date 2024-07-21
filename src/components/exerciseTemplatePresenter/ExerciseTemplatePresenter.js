import PropTypes from 'prop-types';
import styles from './ExerciseTemplatePresenter.module.css';

function ExerciseTemplatePresenter({ order, name, sets }) {
    return (
        <div className={styles.exerciseTemplatePresenter}>
            <div className={styles.order}>{order}</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.set}>{`${sets} sets`}</div>
        </div>
    );
}

ExerciseTemplatePresenter.propTypes = {
    order: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sets: PropTypes.string.isRequired,
};

export default ExerciseTemplatePresenter;