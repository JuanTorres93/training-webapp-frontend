import ExercisePresenter from "../components/exercisePresenter/ExercisePresenter";

export default function ComponentDesign() {
    return (
        <>
            ExercisePresenter <br /> <br />
            <ExercisePresenter id={1} name="Pull up" description="Upper body exercise with emphasis on the delts." />
            <br />
            <ExercisePresenter id={2} name="Squat" description="Lower body exercise with emphasis on quads and glutes." />
        </>
    );
};