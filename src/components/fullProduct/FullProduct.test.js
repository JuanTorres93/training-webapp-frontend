import { render, screen } from "@testing-library/react";

import FullProduct from "./FullProduct";
import { setupStore } from "../../app/store"
import { renderWithProviders } from "../../utils/testUtils"

describe('FullProduct', () => {
    let store;

    beforeEach(() => {
        const initialState = {
            products: {
                products: {
                    1: {
                        id: 1,
                        name: "Test",
                        description: "Product for testing app",
                        image_url: "imgURL",
                    },
                },
            },
        };
        store = setupStore(initialState);
    })

    describe('Happy path', () => {
        const id = 1;
        beforeEach(() => {
            renderWithProviders(<FullProduct id={id} />, { store });
        });

        it('renders product', () => {
            const name = screen.queryByText(/Test/i);
            const description = screen.queryByText(/Product for testing app/i);

            expect(name).toBeInTheDocument();
            expect(description).toBeInTheDocument();
        })
    })

    describe('Unhappy path', () => {
        const id = -1;

        beforeEach(() => {
            renderWithProviders(<FullProduct id={id} />);
        });

        it('shows error when product id does not exist', () => {
            const msg = screen.queryByText(/No product with id/i);
            expect(msg).toBeInTheDocument();
        })
    })
})