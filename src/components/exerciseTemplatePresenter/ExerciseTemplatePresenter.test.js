import { render, screen } from '@testing-library/react';
import ExerciseTemplatePresenter from './ExerciseTemplatePresenter';

describe('ExerciseTemplatePresenter', () => {
    test('renders ExerciseTemplatePresenter component', () => {
        render(<ExerciseTemplatePresenter order={1} name="Push Up" sets="3" />);
        expect(screen.getByText('Push Up')).toBeInTheDocument();
        expect(screen.getByText('3 sets')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
    });
});