import { Link } from "react-router-dom";
import { Link as ScrollLinkToId } from "react-scroll";

const scrollConfig = {
    spy: true,
    smooth: true,
    duration: 500,
}


const NavHorizontal = ({
    linkText1 = "",
    linkText2 = "",
    linkText3 = "",
    linkText4 = "",
    loginText = "",
    signUpText = "",
    currentLanguage = "",
    cbChangeLanguage = () => { } }) => {
    return (
        <nav className="nav-horizontal">
            <ScrollLinkToId to="hero-section" className="nav-horizontal__logo-box" {...scrollConfig}>
                <img src="/images/logos/logo_border_small.svg" alt="logo" className="nav-horizontal__logo" />
            </ScrollLinkToId>

            <ul className="nav-horizontal__list">
                {/* Your future */}
                <li className="nav-horizontal__item">
                    <ScrollLinkToId to="niche-section" className="nav-horizontal__link" {...scrollConfig}>
                        {linkText1}
                    </ScrollLinkToId>
                </li>

                {/* benefits */}
                <li className="nav-horizontal__item">
                    <ScrollLinkToId to="benefits" className="nav-horizontal__link" {...scrollConfig}>
                        {linkText2}
                    </ScrollLinkToId>
                </li>

                {/* Features */}
                <li className="nav-horizontal__item">
                    <ScrollLinkToId to="features" className="nav-horizontal__link" {...scrollConfig}>
                        {linkText3}
                    </ScrollLinkToId>
                </li>

                {/* Testimonials */}
                <li className="nav-horizontal__item">
                    <ScrollLinkToId to="testimonials-section" className="nav-horizontal__link" {...scrollConfig}>
                        {linkText4}
                    </ScrollLinkToId>
                </li>
            </ul>

            <div className="nav-horizontal__actions-box">
                <button className="plain-btn nav-horizontal__action-link" onClick={cbChangeLanguage}>
                    {currentLanguage}
                </button>

                <Link to="/login" className="nav-horizontal__action-link">
                    {loginText}
                </Link>

                <Link to="/register" className="nav-horizontal__action-link nav-horizontal__action-link--cta">
                    {signUpText}
                </Link>
            </div>
        </nav>
    )
}

export default NavHorizontal;
