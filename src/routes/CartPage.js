import Cart from "../components/cart/Cart";
import CheckoutForm from "../components/checkoutForm/CheckoutForm";

export default function CartPage() {
    return (
        <>
            <Cart />
            {/* TODO Eliminar esto de aquí */}
            <CheckoutForm />
        </>
    );
};