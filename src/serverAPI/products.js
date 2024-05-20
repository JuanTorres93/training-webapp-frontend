import { serverBaseAPIURL } from "./serverAPIConfig";
import { validateIntegerId } from "../utils/validatorUtils";

const productsEndPoint = serverBaseAPIURL + '/products';

export async function getAllProducts() {
    // Error is handled from redux state if necesary
    const response = await fetch(productsEndPoint);
    const jsonResponse = await response.json()
    return jsonResponse;
};

export async function getProductById(id) {
    const validatedId = validateIntegerId(id)
    // Error is handled from redux state if necesary
    const response = await fetch(productsEndPoint + `/${validatedId}`);
    const jsonResponse = await response.json()
    return jsonResponse;
};
