import { NavLink } from "react-router-dom";

const NavVertical = ({
    items, // array of objects with icon, text and path
}) => {

    return (
        <nav className="nav-vertical">
            {/* TODO include trackoverload full logo? */}
            <ul className="nav-vertical__list">
                {
                    items.map((item, index) => {
                        return (
                            <li key={index} className="nav-vertical__item">
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) => isActive ? "nav-vertical__link nav-vertical__link--active" : "nav-vertical__link"}
                                >
                                    <figure key={index} className="nav-vertical__icon-box">
                                        {item.icon}
                                    </figure>
                                    {item.text}
                                </NavLink>
                            </li>
                        )
                    })
                }
                <li className="nav-vertical__item nav-vertical__item--logout">
                    <button className="nav-vertical__link plain-btn">
                        <figure className="nav-vertical__icon-box">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </figure>
                        {/* TODO translate */}
                        Log out
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default NavVertical;
