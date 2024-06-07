import { render, screen } from "@testing-library/react";

import ExerciseSetPresenter from "./ExerciseSetPresenter";

// Write all needed tests for the ExerciseSetPresenter component.
describe('ExerciseSetPresenter', () => {
    describe('Happy path', () => {
        beforeEach(() => {
            render(<ExerciseSetPresenter id={1} name="Pull up" description="Upper body compound movement." />)
        });

        // Test for checking if the ExerciseSetPresenter component renders the name prop.
        it('renders name', () => {
            const name = screen.getByText('Pull up');

            expect(name).toBeInTheDocument();
        });

        // Test for checking if the ExerciseSetPresenter component renders the description prop.
        it('renders description', () => {
            const description = screen.getByText('Upper body compound movement.');

            expect(description).toBeInTheDocument();
        });

        // Test for checking if the ExerciseSetPresenter component renders the sets input.
        it('renders sets input', () => {
            const setsInput = screen.getByTestId('inputSets');

            expect(setsInput).toBeInTheDocument();
        });
    });
});