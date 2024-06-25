import { render, screen } from "@testing-library/react";

import ExerciseList from "./ListNameDescription";

const exercises = [
    { id: 1, name: "Pull up", description: "Upper body compound movement." },
    { id: 2, name: "Push up", description: "Upper body compound movement." },
    { id: 3, name: "Squat", description: "Lower body compound movement." },
];

describe('ExercisePresenter', () => {
    describe('Happy path', () => {
        describe('Has exercises', () => {
            beforeEach(() => {
                render(<ExerciseList exercises={exercises} />)
            });

            // Test for cheking if the ExerciseList component renders the ExercisePresenter component for each exercise in the exercises prop.
            it('renders ExercisePresenter for each exercise', () => {
                const exercisePresenters = screen.getAllByTestId('exercisePresenter');

                expect(exercisePresenters).toHaveLength(exercises.length);
            });
        });

        describe('Has no exercises', () => {
            beforeEach(() => {
                render(<ExerciseList exercises={[]} />)
            });

            // Test for checking if the ExerciseList component does not render any ExercisePresenter component when the exercises prop is an empty array.
            it('does not render ExercisePresenter', () => {
                const exercisePresenters = screen.queryAllByTestId('exercisePresenter');

                expect(exercisePresenters).toHaveLength(0);
            });
        });
    })
})
