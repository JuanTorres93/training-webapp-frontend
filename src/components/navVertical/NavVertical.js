import React from "react";
import { NavLink } from "react-router-dom";

const NavVertical = ({
    items, // array of objects with icon, text and path
    logoutItem,
    currentLanguage,
    cbChangeLanguage = () => { },
    cbHandleLogout = () => { },
    isLoading = false,
}) => {

    return (
        <nav className="nav-vertical">
            {/* TODO include trackoverload full logo? */}
            <ul className="nav-vertical__list">
                {
                    items.map((item, index) => {
                        return (
                            <li key={index} className={`
                            nav-vertical__item
                            ${isLoading ? "nav-vertical__item--disabled" : ""}
                            `}>
                                <NavLink
                                    // end is used to make the link active only when the path is an exact match
                                    end
                                    to={isLoading ? "#" : item.path}
                                    className={({ isActive }) => isActive ?
                                        `nav-vertical__link nav-vertical__link--active` :
                                        `nav-vertical__link`}
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
                <li className={`
                    nav-vertical__item 
                    nav-vertical__item--logout
                    ${isLoading ? "nav-vertical__item--disabled" : ""}
                    `}>
                    <button
                        className="nav-vertical__link plain-btn"
                        onClick={isLoading ? () => { } : cbHandleLogout}
                    >
                        <figure className="nav-vertical__icon-box">
                            {logoutItem.icon}
                        </figure>
                        {logoutItem.text}
                    </button>
                </li>
            </ul>

            <button
                className={`
                    plain-btn 
                    nav-vertical__change-language-btn
                    ${isLoading ? "nav-vertical__change-language-btn--disabled" : ""}
                    `}
                onClick={isLoading ? () => { } : cbChangeLanguage}
            >
                <span>{currentLanguage}</span>
            </button>
        </nav>
    )
}

export default NavVertical;
