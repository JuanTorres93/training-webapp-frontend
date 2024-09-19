import PropTypes from 'prop-types';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import RecentWorkoutPresenter from '../recentWorkoutPresenter/RecentWorkoutPresenter';
import styles from './RecentWorkoutsCarousel.module.css'

// TODO TEST COMPONENT
// Write a RecentWorkoutsCarousel component that renders a carousel of recent workouts, showing at least 3 elements before sliding. Use Carousel component.
// The component should receive an array of RecentWorkoutObjects as a prop:
// - id: number
// - date: string
// - name: string
// The component should render a RecentWorkoutPresenter for each RecentWorkoutObject.
// Make sure to write prop types for the RecentWorkoutsCarousel component.
const RecentWorkoutsCarousel = ({ recentWorkouts, isLoading = false }) => {
    return (
        <Carousel
            additionalTransfrom={0}
            arrows
            // autoPlaySpeed={3000}
            centerMode={false}
            containerClass={styles.carousel}
            itemClass={styles.item}
            customTransition="all 1s linear"
            dotListClass=""
            draggable
            focusOnSelect={false}
            // infinite
            keyBoardControl
            minimumTouchDrag={80}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 4,
                    partialVisibilityGutter: 60
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 2,
                    partialVisibilityGutter: 30
                }
            }}
            // showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >

            {recentWorkouts.map((workout) => (
                <RecentWorkoutPresenter
                    key={workout.id}
                    id={workout.id}
                    date={workout.date}
                    name={workout.name}
                    isLoading={isLoading}
                />
            ))}

        </Carousel>
    );
};

RecentWorkoutsCarousel.propTypes = {
    recentWorkouts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};


export default RecentWorkoutsCarousel;
