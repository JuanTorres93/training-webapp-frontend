import FullProduct from "../components/fullProduct/FullProduct";
import { useParams } from "react-router-dom";

import { validateIntegerId } from '../utils/validatorUtils';

export default function SingleProductPage() {
    let { id } = useParams();
    id = validateIntegerId(id);

    return (
        <>
            <FullProduct id={id} />
        </>
    );
};