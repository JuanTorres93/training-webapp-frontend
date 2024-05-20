import { Form } from "react-router-dom";
import { serverBaseURL } from "../../serverAPI/serverAPIConfig";

// DOCS
import { 
    CardElement,    // Component to retrieve card number, expiry date, CVC and CP
    useStripe,      // Hook for connecting with stripe
    useElements,    // Hook for accessing stripe Elements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const url = serverBaseURL + '/checkout'

    const handleSubmit = async (e) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
        
        if (!error) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...paymentMethod,
                    amount: 10000,  // TODO modify for the real quantity. It must represent the amount in the minimum coin of the currency
                }),
            });
            
            console.log(await response.json());
        }
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit">Buy</button>
        </Form>
    );
};