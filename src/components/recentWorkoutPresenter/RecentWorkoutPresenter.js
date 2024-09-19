import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './RecentWorkoutPresenter.module.css'

function RecentWorkoutPresenter({ id: templateId, date, name, isLoading = false }) {
    /**
     * This function calculates how much time has passed since a given date.
     * It first calculates the number of minutes, hours, days, weeks, months, and years since the given date.
     * Then, it checks which time unit is the most appropriate to describe the elapsed time:
     * - If less than an hour has passed, it returns the number of minutes.
     * - If less than a day but more than an hour has passed, it returns the number of hours.
     * - If less than a week but more than a day has passed, it returns the number of days.
     * - If less than a month but more than a week has passed, it returns the number of weeks.
     * - If less than a year but more than a month has passed, it returns the number of months.
     * - If a year or more has passed, it returns the number of years.
     * The function also makes sure to use the correct singular or plural form of the time unit.
     * 
     * @param {string} date - The date to calculate the elapsed time from, in the format 'YYYY-MM-DD'.
     * @returns {string} A string describing how much time has passed since the given date.
     */
    const navigate = useNavigate();

    const handleRecentWorkoutClick = () => {
        if (!isLoading) navigate(`/startWorkout/template/${templateId}`);
    };

    const calculateTimeSince = (date) => {
        const workoutDate = new Date(date);
        const now = new Date();
        const millisecondsPerMinute = 60 * 1000;
        const millisecondsPerHour = millisecondsPerMinute * 60;
        const millisecondsPerDay = millisecondsPerHour * 24;
        const minutesSince = Math.floor((now - workoutDate) / millisecondsPerMinute);
        const hoursSince = Math.floor((now - workoutDate) / millisecondsPerHour);
        const daysSince = Math.floor((now - workoutDate) / millisecondsPerDay);
        const weeksSince = Math.floor(daysSince / 7);
        const monthsSince = Math.floor(daysSince / 31);
        const yearsSince = Math.floor(daysSince / 365);

        if (minutesSince < 60) {
            return `${minutesSince} minute${minutesSince === 1 ? '' : 's'} ago`;
        } else if (hoursSince < 24) {
            return `${hoursSince} hour${hoursSince === 1 ? '' : 's'} ago`;
        } else if (daysSince < 7) {
            return `${daysSince} day${daysSince === 1 ? '' : 's'} ago`;
        } else if (weeksSince < 4) {
            return `${weeksSince} week${weeksSince === 1 ? '' : 's'} ago`;
        } else if (monthsSince < 12) {
            return `${monthsSince} month${monthsSince === 1 ? '' : 's'} ago`;
        } else {
            return `${yearsSince} year${yearsSince === 1 ? '' : 's'} ago`;
        }
    }

    return (
        <div data-testid="recentWorkoutPresenter"
            className={styles.container}
            onClick={handleRecentWorkoutClick}>

            {isLoading && <div
                className='spinner-heading-size'
                style={{ margin: 'auto' }}
            />}

            {!isLoading &&
                <div className={styles.recentWorkout}>
                    <div className={styles.name}>{name}</div>

                    <div className={styles.fullDateInfo}>
                        <div className={styles.agoSentence}>
                            {calculateTimeSince(date)}
                        </div>
                        <div className={styles.date}>
                            ({new Date(date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })})
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

// Write prop types for the RecentWorkoutPresenter component.
RecentWorkoutPresenter.propTypes = {
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default RecentWorkoutPresenter;
