import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styles from './ExerciseTemplatePresenter.module.css';

import { selectTemplatesLoading } from '../../features/workoutsTemplates/workoutTemplatesSlice';
import { selectWorkoutsLoading } from '../../features/workouts/workoutSlice';

function ExerciseTemplatePresenter({
    id, order, name, sets,
    onClickRemove = () => { } }) {

    const templatesLoading = useSelector(selectTemplatesLoading);
    const workoutsLoading = useSelector(selectWorkoutsLoading);
    const isLoading = templatesLoading || workoutsLoading;

    return (
        <div className={styles.container}>
            <div className={styles.exerciseTemplatePresenter}>
                <div className={styles.order}>{order}</div>
                <div className={styles.name}>{name}</div>
                <div className={styles.set}>{`${sets} sets`}</div>
            </div>

            <div
                className={styles.deleteContainer}
                onClick={() => onClickRemove({
                    exerciseId: id,
                    exerciseOrder: order,
                })}
            >
                {isLoading ? <div className='spinner-body-size'></div> : '_'} {/* Conditional rendering */}
            </div>
        </div>
    );
}

ExerciseTemplatePresenter.propTypes = {
    order: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
};

export default ExerciseTemplatePresenter;