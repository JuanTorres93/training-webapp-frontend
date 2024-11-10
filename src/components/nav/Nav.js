import { Link } from "react-router-dom";
import { Link as ScrollLinkToId } from "react-scroll";
import { US, ES } from 'country-flag-icons/react/3x2'

const scrollConfig = {
    spy: true,
    smooth: true,
    duration: 500,
}


const NavHorizontal = ({
    items, // array of objects with text and (id OR path). id is used for react-scroll, path is used for react-router-dom
    currentLocation,
    loginText = "",
    signUpText = "",
    currentLanguage = "",
    cbChangeLanguage = () => { } }) => {

    // TODO DELETE THESE DEBUG LOGS
    console.log('currentLocation');
    console.log(currentLocation);

    return (
        <nav className="nav-horizontal">
            {currentLocation === "/" ?
                <ScrollLinkToId to="hero-section" className="nav-horizontal__logo-box" {...scrollConfig}>
                    <img src="/images/logos/logo_border_small.svg" alt="logo" className="nav-horizontal__logo" />
                </ScrollLinkToId> :
                <Link to="/" className="nav-horizontal__logo-box">
                    <img src="/images/logos/logo_border_small.svg" alt="logo" className="nav-horizontal__logo" />
                </Link>
            }

            {items ?
                <ul className="nav-horizontal__list">
                    {items.map((item, index) => (
                        <li key={index} className="nav-horizontal__item">
                            {item.path ?
                                <Link to={item.path} className="nav-horizontal__link">
                                    {item.text}
                                </Link> :
                                item.id ?
                                    <ScrollLinkToId to={item.id} className="nav-horizontal__link" {...scrollConfig}>
                                        {item.text}
                                    </ScrollLinkToId> :
                                    null
                            }
                        </li>
                    ))}
                </ul> :
                null
            }


            <div className="nav-horizontal__actions-box">
                <button className="plain-btn nav-horizontal__action-link" onClick={cbChangeLanguage}>
                    <span>{currentLanguage}</span>

                    {currentLanguage === "es" ?
                        <ES className="nav-horizontal__flag-icon" /> :
                        <US className="nav-horizontal__flag-icon" />
                    }
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
