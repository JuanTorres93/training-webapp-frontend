import { Outlet } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import styles from './NavBar.module.css'

function NavBar() {
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
                    <NavLink className={({isActive}) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/createExercise">Create Exercise </NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/createTemplate">Create Template </NavLink>
                    <NavLink className={({isActive}) => isActive ? styles.navBarLinkActive : styles.navBarLinks} to="/selectTemplate">Select Template </NavLink>
                </div>
            </nav>

            <Outlet />
        </>
    );
};

export default NavBar;
