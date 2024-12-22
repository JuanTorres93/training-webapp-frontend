// import react needed for testing
import React from "react";

import { render, screen } from "@testing-library/react";

import ButtonIconAndText from "./ButtonIconAndText";

describe('ButtonIconAndText', () => {
    // TODO show an actual ionIcon
    const ionIcon = "icon";
    const text = "Click me!";
    const onClick = jest.fn();

    describe('Happy path', () => {

        beforeEach(() => {
            render(
                <ButtonIconAndText
                    ionIcon={ionIcon}
                    text={text}
                    onClick={onClick}
                />
            )
        });

        it('renders button text', () => {
            const screenText = screen.getByText(text);

            expect(screenText).toBeInTheDocument();

            expect(screenText.innerHTML).toStrictEqual(text);
        });

        it('renders icon', () => {
            const description = screen.getByText(ionIcon);

            expect(description).toBeInTheDocument();
            expect(description.innerHTML).toStrictEqual(ionIcon);
        });
    })
})