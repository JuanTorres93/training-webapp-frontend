import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../features/products/productsSlice";
import { logout } from "../serverAPI/logout";

import { selectUser, setUser } from "../features/user/userSlice";

// TODO crear un slice del store para información del usuario

export default function Root() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // TODO Move to other side
    dispatch(fetchAllProducts());

    const user = useSelector(selectUser);

    const handleLoginClick = (event) => {
        navigate('/login')
    };

    const handleLogoutClick = async (event) => {
        await logout();
        dispatch(setUser(null));
    };

    const handleProductsClick = (event) => {
        navigate('/products')
    };

    const handleCartClick = (event) => {
        navigate('/cart')
    };

    return (
        <>
            <button onClick={handleProductsClick}>Products</button>
            { !user ?
                <button onClick={handleLoginClick}>Login</button> 
                :
                <>
                    <span>{user.first_name} {user.last_name}</span>
                    <button onClick={handleCartClick}>Cart</button>
                    <button onClick={handleLogoutClick}>Logout</button>
                </>
            }
            <h1>This is the root element</h1>
            
            Down below are rendered children components using &lt;Outlet /&gt; and nested routes:
            <br />
            <Outlet />
        </>
    );
};