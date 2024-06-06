import { render, screen } from "@testing-library/react";

import RecentWorkoutPresenter from "./RecentWorkoutPresenter";

// TODO check tests

// Write unit tests for the RecentWorkoutPresenter component
describe('RecentWorkoutPresenter', () => {
    describe('Happy path', () => {
        const id = 1;
        const date = "2021-09-01";
        const name = "Pull day";

        beforeEach(() => {
            render(<RecentWorkoutPresenter id={id} date={date} name={name} />)
        });

        it('renders workout date', () => {
            const workoutDate = screen.getByText(new RegExp(date));

            expect(workoutDate).toBeInTheDocument();
            expect(workoutDate.innerHTML).toContain(date);
        });

        it('renders workout name', () => {
            const workoutName = screen.getByText(name);

            expect(workoutName).toBeInTheDocument();
            expect(workoutName.innerHTML).toStrictEqual(name);
        });

        it('does not render workout id', () => {
            const workoutId = screen.queryByText(id);

            expect(workoutId).not.toBeInTheDocument();
        });
    })
    
    // TODO
    // Write unhappy path tests for the RecentWorkoutPresenter component
    
})