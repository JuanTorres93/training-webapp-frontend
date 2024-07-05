import ExercisePresenter from "../components/exercisePresenter/ExercisePresenter";
import ExerciseList from "../components/listNameDescription/ListNameDescription";
import RecentWorkoutPresenter from "../components/recentWorkoutPresenter/RecentWorkoutPresenter";
import RecentWorkoutsCarousel from "../components/recentWorkoutCarousel/RecentWorkoutsCarousel";
import ExerciseSetPresenter from "../components/exerciseSetPresenter/ExerciseSetPresenter";
import ExerciseCompleterRow from "../components/exerciseCompleter/exerciseCompleterRow/ExerciseCompleterRow";
import ExerciseCompleter from "../components/exerciseCompleter/ExerciseCompleter";

const exercises = [
    { id: 1, name: "Pull up", description: "A compound movement that targets the back, biceps, and forearms." },
    { id: 2, name: "Push up", description: "A bodyweight movement that primarily targets the chest, shoulders, and triceps." },
    { id: 3, name: "Squat", description: "A lower body movement that targets the quadriceps, hamstrings, and glutes." },
    { id: 4, name: "Deadlift", description: "A compound movement that targets the hamstrings, glutes, and lower back." },
    { id: 5, name: "Bench press", description: "An upper body movement that primarily targets the chest, shoulders, and triceps." },
    { id: 6, name: "Overhead press", description: "An upper body movement that targets the shoulders, triceps, and upper chest." },
];

const setsForExercisePresenter = [
    { setNumber: 1, weight: 50, reps: 10 },
    { setNumber: 2, weight: 50, reps: 10 },
    { setNumber: 3, weight: 50, reps: 10 },
    { setNumber: 4, weight: 50, reps: 10 },
    { setNumber: 5, weight: 50, reps: 10 },
];

export default function ComponentDesign() {
    return (
        <>
            ExercisePresenter <br /> <br />
            <ExercisePresenter id={1} name="Pull up" description="Upper body exercise with emphasis on the delts." />
            <br />
            <ExercisePresenter id={2} name="Squat" description="Lower body exercise with emphasis on quads and glutes." />
            <br /> <br />
            ExerciseList with exercises <br /> <br />
            <ExerciseList exercises={exercises} />
            <br /> <br />
            ExerciseList with no exercises <br /> <br />
            <ExerciseList exercises={[]} />
            <br /> <br />
            ExerciseList exercises null <br /> <br />
            <ExerciseList exercises={null} />
            <br /> <br />
            ExerciseList with exercises undefined <br /> <br />
            <ExerciseList />
            <br /> <br />
            RecentWorkoutPresenter <br /> <br />
            <RecentWorkoutPresenter id={1} date="2024-06-05" name="Push routine" />
            <br /> <br />
            RecentWorkoutCarousel <br /> <br />
            <RecentWorkoutsCarousel recentWorkouts={[
                {id: 1, date: "2024-06-05", name: "Push routine"},
                {id: 2, date: "2024-06-04", name: "Pull routine"},
                {id: 3, date: "2024-06-03", name: "Leg routine"},
                {id: 4, date: "2024-06-02", name: "Push routine"},
                {id: 5, date: "2024-06-01", name: "Pull routine"},
            ]} />
            ExerciseSetPresenter <br /> <br />
            <ExerciseSetPresenter id={1} name="Pull up" description="Upper body exercise with emphasis on the delts." />
            <br /> <br />
            ExerciseList with ExerciseSetPresenter <br /> <br />
            <ExerciseList exercises={exercises} isSetPresenter={true} />

            <br /> <br />
            ExerciseCompleterRow <br /> <br />
            <ExerciseCompleterRow setNumber={1} placeholderWeight={50} placeholderReps={10} />
            ExerciseCompleter <br /> <br />
            <ExerciseCompleter exerciseName={'Pull up'} sets={setsForExercisePresenter} />
        </>
    );
};