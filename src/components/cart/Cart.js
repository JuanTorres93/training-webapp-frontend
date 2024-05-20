import { useSelector } from "react-redux";
import { selectCart } from "../../features/cart/cartSlice";
import { selectProductById } from "../../features/products/productsSlice";

export default function Cart() {
    const cartProducts = useSelector(selectCart);
    const productsIds = Object.keys(cartProducts);
    const products = useSelector(selectProductById(productsIds));
    
    if (productsIds.length === 0) return <p>No products in cart</p>;
    let totalPrice = 0;
    
    return (
        <>
            {Object.entries(cartProducts).map(([key, quantity]) => {
                // key is the id of the product
                const productId = key;
                const product = products[productId];
                const name = product.name;
                const price = parseFloat(product.price);
                const totalPriceArticle = price * parseInt(quantity);

                totalPrice += totalPriceArticle;

                return <p key={productId}>{quantity} x {name} | Unit price {price} | Total {totalPriceArticle}</p>;
            })}

            <p>TOTAL: {totalPrice}</p>

            <button>Checkout</button>
        </>
    );
};