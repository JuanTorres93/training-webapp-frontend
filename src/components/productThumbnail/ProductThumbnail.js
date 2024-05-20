import { useNavigate } from 'react-router-dom';
import styles from './ProductThumbnail.module.css';

export default function ProductThumbnail({ id, name, price, imgUrl }) {
    const navigate = useNavigate();
    const handleClick = () => {
        console.log("clicked");
        navigate(`/products/${id}`);
    };

    return (
        <div className={styles.container}>
            <img className={styles.productImage} src={imgUrl}
                alt={`${name} product image`}
                onClick={handleClick} />
            <div className={styles.infoContainer}>
                <p className={`${styles.productName}`}>{name}</p>
                <p className={`${styles.productPrice}`}>{price}</p>
            </div>
        </div>
    );
};
