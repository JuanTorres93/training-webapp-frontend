// render is used to mount a react component
import { render } from "@testing-library/react";
// screen is used to access the mounted component
import { screen } from "@testing-library/react";
// Component to test
import ProductThumbnail from "./ProductThumbnail";

// Mock useNavigate() to avoid Error: Uncaught [Error: useNavigate() may be 
// used only in the context of a <Router> component.]
const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUsedNavigate,
}));

describe('Happy path', () => {
    const productName = "Keyboard";
    const productPrice = "89.99";
    const imgUrl = "data:someRandomString";

    // Re-mount the component before each test
    beforeEach(() => {
        render(<ProductThumbnail name={productName}
            price={productPrice}
            imgUrl={imgUrl} />);
    });

    it('Shows product name', () => {
        expect(screen.queryByText(`${productName}`)).toBeInTheDocument();
    });

    it('Shows product price', () => {
        expect(screen.queryByText(productPrice)).toBeInTheDocument();
    });

    it('Shows img', () => {
        const img = screen.queryByAltText(`${productName} product image`);
        expect(img.src).toContain(imgUrl);
    });

    it('Shows alternative text on img', () => {
        expect(screen.queryByAltText(`${productName} product image`)).toBeInTheDocument();
    });
});