import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUser,
    logoutUser,
    selectUserIsLoading,
    extendUserSession,
} from '../../features/user/userSlice';
import { Outlet } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

import Alert from '../modals/alert/Alert';
import ConfirmDialog from '../modals/confirmDialog/ConfirmDialog';
import styles from './NavBar.module.css'

function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const userIsLoading = useSelector(selectUserIsLoading);

    const [sessionExpiresAt, setSessionExpiresAt] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);

    // Effect for auto logout if session is expired
    // Used mainly for when user is already logged in and the session expires while the user is NOT on the page
    useEffect(() => {
        if (!sessionExpiresAt) return;

        const currentTime = new Date().toISOString();

        if (sessionExpiresAt <= currentTime) {
            dispatch(logoutUser());
        }
    });

    // Efecto para configurar la fecha de expiración al cargar
    useEffect(() => {
        const expirationDate = user ? user.expirationDate : null;

        const expirationAt = expirationDate ? new Date(expirationDate).toISOString() : null;

        setSessionExpiresAt(expirationAt);
    }, [user]);

    // Efecto para chequear periódicamente si la sesión está por expirar
    useEffect(() => {
        if (!sessionExpiresAt) return;

        // Run intervals every minute
        // const frequencyInMs = 60 * 1000;
        // TODO DELETE BELOW AND UNCOMMENT ABOVE
        const frequencyInMs = 1000;

        const sessionAboutToExpireInterval = setInterval(() => {
            const currentTime = new Date().toISOString();

            // Margin of 30 minutes for user to be able to act
            const marginToWarnUserinMs = 30 * 60 * 1000;

            // Expiry date minus margin
            const expiryDateMinusMargin = new Date(new Date(sessionExpiresAt).getTime() - marginToWarnUserinMs).toISOString();

            if (expiryDateMinusMargin <= currentTime) {
                setIsConfirmOpen(true);
                clearInterval(sessionAboutToExpireInterval);
            }
        }, frequencyInMs);

        const sessionExpiredInterval = setInterval(() => {
            const currentTime = new Date().toISOString();

            if (sessionExpiresAt <= currentTime) {
                setIsAlertOpen(true);
                // Close confirm dialog if open
                setIsConfirmOpen(false);
                dispatch(logoutUser());
                clearInterval(sessionExpiredInterval);
            }
        }, frequencyInMs);

        return () => {
            clearInterval(sessionAboutToExpireInterval)
            clearInterval(sessionExpiredInterval)
        }; // Clean intervals when component unmounts
    }, [sessionExpiresAt, dispatch]);

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



            {/* Modals */}
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onRequestClose={() => setIsConfirmOpen(false)}
                onConfirm={() => {
                    dispatch(extendUserSession());
                    setIsConfirmOpen(false);
                }}
                message={`Your session is going to expire.\nDo you want to extend it?`}
            />

            <Alert
                isOpen={isAlertOpen}
                onRequestClose={() => setIsAlertOpen(false)}
                message='Your session has expired'
            />
        </>
    );
};

export default NavBar;
