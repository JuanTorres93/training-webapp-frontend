import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser } from '../../features/user/userSlice';
import { Outlet } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const handleLogout = () => {
        dispatch(logoutUser());
    }

    return (
        <>
            <nav className={styles.navBar}>
                <div className={styles.navBarLogo}>
                    <Link to="/">
                        {/* TODO change icon */}
                        <img src={`${process.env.PUBLIC_URL}/favicon.ico`} alt="logo" />
                    </Link>
                </div>
                <div className={styles.navBarLinksContainer}>
                    <NavLink className={({isActive}) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/createTemplate">Create Template </NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/selectTemplate">Select Template </NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/createExercise">Create Exercise </NavLink>
                </div>

                {/* Button for login if user is not logged in. Other wise logout button and profile menu */}
                <div className={styles.navBarLoginContainer}>
                    {!user ? (
                        <>
                            <NavLink className={styles.navBarLinks} to="/login">Login</NavLink>
                            <NavLink className={styles.navBarLinks} to="/register">Register</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink className={styles.navBarLinks} to="/" onClick={handleLogout}>Logout</NavLink>
                        </>
                    )}
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default NavBar;
