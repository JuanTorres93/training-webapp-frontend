import { NavLink } from "react-router-dom";

const NavVertical = ({
    items, // array of objects with icon, text and path
}) => {

    return (
        <nav className="nav-vertical">
            <ul className="nav-vertical__list">
                {
                    items.map((item, index) => {
                        return (
                            <li className="nav-vertical__item">
                                <NavLink
                                    to={item.path}
                                    // className="nav-vertical__link"
                                    // className=""
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

                {/* TODO add to bottom logout button */}
            </ul>
        </nav>
    )
}

export default NavVertical;
