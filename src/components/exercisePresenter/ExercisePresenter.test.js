import { render, screen } from "@testing-library/react";

import ExercisePresenter from "./ExercisePresenter";

const EXERCISE_NAME = "Pull up" ;
const EXERCISE_DESCRIPTION = "Upper body compound movement." ;

describe('ExercisePresenter', () => {
    describe('Happy path', () => {
        const id = 1;

        beforeEach(() => {
            render(<ExercisePresenter id={id} name={EXERCISE_NAME} description={EXERCISE_DESCRIPTION}/>)
        });

        it('renders exercise name', () => {
            const name = screen.getByText(EXERCISE_NAME);

            expect(name).toBeInTheDocument();

            expect(name.innerHTML).toStrictEqual(EXERCISE_NAME);
        });

        it('renders exercise description', () => {
            const description = screen.getByText(EXERCISE_DESCRIPTION);

            expect(description).toBeInTheDocument();
            expect(description.innerHTML).toStrictEqual(EXERCISE_DESCRIPTION);
        });

        it('does not render exercise id', () => {
            const exerciseId = screen.queryByText(id);

            expect(exerciseId).not.toBeInTheDocument();
        });
    })
})