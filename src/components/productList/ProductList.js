import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectAllProducts } from "../../features/products/productsSlice";
import ProductThumbnail from "../productThumbnail/ProductThumbnail";

export default function ProductList() {
    const allProducts = useSelector(selectAllProducts);

    return (
        <>
            {Object.values(allProducts).map(product => {
                return <ProductThumbnail
                    key={`${product.name}${product.image_url}`}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imgUrl={product.image_url} />
            })}
        </>
    );
};