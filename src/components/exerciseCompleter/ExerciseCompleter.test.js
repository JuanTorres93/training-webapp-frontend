import { render, screen } from "@testing-library/react";

import ExerciseCompleter from "./ExerciseCompleter";

const EXERCISE_NAME = "Pull up";
const EXERCISE_ORDER = 2;
const EXERCISE_SETS = [
    {
        setNumber: 1,
        weight: 10,
        reps: 7,
    },
    {
        setNumber: 2,
        weight: 10,
        reps: 7,
    },
    {
        setNumber: 3,
        weight: 10,
        reps: 7,
    },
];

describe('ExerciseCompleter', () => {
    describe('Happy path', () => {
        const id = 1;

        beforeEach(() => {
            render(<ExerciseCompleter id={id}
                exerciseName={EXERCISE_NAME}
                exerciseOrder={EXERCISE_ORDER} />)
        });

        it('renders exercise name', () => {
            const name = screen.getByText(EXERCISE_NAME);

            expect(name).toBeInTheDocument();

            expect(name.innerHTML).toStrictEqual(EXERCISE_NAME);
        });

        // it('renders exercise order', () => {
        //     // TODO Para que funcione el test hay que refactorizar el componente ExerciseCompleterRow para no utilizar redux
        //     const order = screen.getByText(EXERCISE_ORDER);

        //     expect(order).toBeInTheDocument();
        //     expect(order.innerHTML).toStrictEqual(EXERCISE_ORDER);
        // });

        it('does not render exercise id', () => {
            const exerciseId = screen.queryByText(id);

            expect(exerciseId).not.toBeInTheDocument();
        });
    })
})