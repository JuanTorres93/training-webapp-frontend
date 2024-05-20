import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../../features/products/productsSlice";
import { addToCart } from "../../features/cart/cartSlice";

export default function FullProduct({ id }) {
    const dispatch = useDispatch();

    const product = useSelector(selectProductById(id));

    const handleCartButton = (event) => {
        dispatch(addToCart({
            id: id,
            quantity: 1,
        }));
    }

    if (product) {
        return (
            <>
                <img src={product.image_url} alt={`${product.name} image`} /> <br />
                id = {product.id} <br />
                name = {product.name} <br />
                description = {product.description} <br />
                <button onClick={handleCartButton}>Add to cart</button>
            </>
        );
    } else {
        return (
            <>
                No product with id specified.
            </>
        );
    }
};