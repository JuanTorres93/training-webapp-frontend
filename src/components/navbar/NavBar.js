import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUser,
    logoutUser,
    selectUserIsLoading,
} from '../../features/user/userSlice';
import { Outlet } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

    const [sessionExpiresAt, setSessionExpiresAt] = useState(null);

    // TODO implement auto logout

    // Efecto para configurar la fecha de expiración al cargar
    useEffect(() => {
        const expirationDate = user ? user.expirationDate : null;

        const expirationAt = expirationDate ? new Date(expirationDate).toISOString() : null;

        // TODO DELETE THESE DEBUG LOGS
        console.log('expirationAt');
        console.log(expirationAt);

        setSessionExpiresAt(expirationAt);
    }, [user]);

    // Efecto para chequear periódicamente si la sesión está por expirar
    useEffect(() => {
        if (!sessionExpiresAt) return;

        const interval = setInterval(() => {
            const currentTime = new Date().toISOString();

            // TODO important add margin of 30 minutes for user to be able to act
            const marginToWarnUserinMs = 5000;
            // Expiry date minus margin
            const expiryDateMinusMargin = new Date(new Date(sessionExpiresAt).getTime() - marginToWarnUserinMs).toISOString();

            if (expiryDateMinusMargin <= currentTime) {
                alert('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
                clearInterval(interval);
                // Aquí puedes agregar lógica para redirigir al usuario, por ejemplo:
                // window.location.href = '/login';
            }
            // TODO IMPORTANT: CHANNGE TO 1 MINUTE
            //}, 1000 * 60); // Revisa cada minuto
        }, 1000 * 1); // Revisa cada minuto

        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonte
    }, [sessionExpiresAt]);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navBarLogo}>
                    <Link to="/">
                        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" />
                    </Link>
                </div>

                {user &&
                    <div className={styles.navBarLinksContainer}>
                        <NavLink className={({ isActive }) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/createTemplate">Create Template </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/selectTemplate">Select Template </NavLink>
                        <NavLink className={({ isActive }) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/createExercise">Create Exercise </NavLink>
                    </div>
                }

                {/* Button for login if user is not logged in. Other wise logout button and profile menu */}
                <div className={styles.navBarLoginContainer}>
                    {!user ? (
                        <>
                            <NavLink className={styles.navBarLinks} to="/login">Login</NavLink>
                            <NavLink className={styles.navBarLinks} to="/register">Register</NavLink>
                        </>
                    ) : (
                        <>
                            {/* TODO modify and style as needed */}
                            {userIsLoading ? null : <p>{user.alias}</p>}

                            <NavLink className={styles.navBarLinks} to="/" onClick={() => {
                                !userIsLoading && handleLogout()
                            }}>
                                {userIsLoading ? <div className='spinner-body-size'></div> : 'Logout'}
                            </NavLink>
                        </>
                    )}
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default NavBar;
