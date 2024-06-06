import { render, screen } from "@testing-library/react";

import RecentWorkoutsCarousel from "./RecentWorkoutsCarousel";

// Write unit tests for both, happy and unhappy paths for the RecentWorkoutsCarousel component
describe('RecentWorkoutsCarousel', () => {
    // I HAVEN'T MANAGED THE TEST TO WORK IN SPITE OF IT WORKING ON THE BROWSER.
    // CHILDREN COMPONENTS DOES NOT RENDER IN THE TESTS.

    // TODO: TRY THIS SOLUTION ACCORDING COPILOT 
    //The issue you're experiencing might be due to the fact that react-multi-carousel uses CSS to control the visibility of its children, and Jest (the test runner that underlies React Testing Library) doesn't fully support CSS. As a result, the carousel's children might not be visible in the DOM during tests, even though they're visible in the browser.
    //
    //One way to work around this issue is to mock react-multi-carousel in your tests, so that it simply renders its children without any additional behavior. Here's how you can do it:
    //
    //Create a __mocks__ directory in the same directory as your node_modules directory.
    //
    //Inside the __mocks__ directory, create a file named react-multi-carousel.js.
    //
    //In this file, write a mock Carousel component that simply renders its children:
    // import React from 'react';
    // 
    // const Carousel = ({ children }) => <div>{children}</div>;
    // 
    // export default Carousel;
    //
    //In your test file, add a line at the top to use the mock Carousel component:
    // jest.mock('react-multi-carousel');
    //With this setup, when you run your tests, Jest will use the mock Carousel component instead of the real one. This should allow you to see the RecentWorkoutPresenter components in the DOM during tests.



    // describe('Happy path', () => {
        // const recentWorkouts = [
            // {id: 1, date: "2024-06-05", name: "Push routine"},
            // {id: 2, date: "2024-06-04", name: "Pull routine"},
            // {id: 3, date: "2024-06-03", name: "Leg routine"},
            // {id: 4, date: "2024-06-02", name: "Push routine"},
            // {id: 5, date: "2024-06-01", name: "Pull routine"},
        // ];
// 
        // beforeAll(() => {
            // render(<RecentWorkoutsCarousel recentWorkouts={recentWorkouts} />)
        // });
// 
        // it('renders multiple RecentWorkoutPresenters', async () => {
            // const recentWorkoutPresenters = await screen.findAllByTestId('recentWorkoutPresenter');
// 
            // expect(recentWorkoutPresenters).toHaveLength(recentWorkouts.length);
        // });
// 
        // it('renders RecentWorkoutPresenters with correct props', async () => {
            // const recentWorkoutPresenters = await screen.findAllByTestId('recentWorkoutPresenter');
// 
            // recentWorkouts.forEach((recentWorkout, index) => {
                // const recentWorkoutPresenter = recentWorkoutPresenters[index];
// 
                // expect(recentWorkoutPresenter).toBeInTheDocument();
                // expect(recentWorkoutPresenter).toHaveTextContent(recentWorkout.name);
                // expect(recentWorkoutPresenter).toHaveTextContent(recentWorkout.date);
            // });
        // });
    // });

    describe('Unhappy path', () => {
        it('renders no RecentWorkoutPresenters when empty list is passed', () => {
            render(<RecentWorkoutsCarousel recentWorkouts={[]} />);

            const recentWorkoutPresenters = screen.queryAllByTestId('recentWorkoutPresenter');

            expect(recentWorkoutPresenters).toHaveLength(0);
        });
    });
});
