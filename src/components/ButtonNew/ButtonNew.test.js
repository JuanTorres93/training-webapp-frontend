// import react needed for testing
import React from "react";

import { render, screen } from "@testing-library/react";

import ButtonNew from "./ButtonNew";

describe('ButtonNew', () => {
    const text = "Click me!";
    const onClick = jest.fn();

    describe('Happy path', () => {
        beforeEach(() => {
            render(
                <ButtonNew
                    buttonText={text}
                    onClick={onClick}
                />
            )
        });

        it('should render the button with the correct text', () => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });

        it('should call the onClick function when clicked', () => {
            screen.getByText(text).click();
            expect(onClick).toHaveBeenCalled();
        });
    })
})