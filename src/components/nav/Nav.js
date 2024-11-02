const NavHorizontal = ({
    linkText1 = "",
    linkText2 = "",
    linkText3 = "",
    linkText4 = "",
    cbChangeLanguage = () => { } }) => {
    return (
        <nav className="nav-horizontal">
            <figure className="nav-horizontal__logo-box">
                <img src="/images/logos/logo_border_small.svg" alt="logo" className="nav-horizontal__logo" />
            </figure>

            <ul className="nav-horizontal__list">
                {/* Your future */}
                <li className="nav-horizontal__item">
                    <a href="#" className="nav-horizontal__link">
                        {linkText1}
                    </a>
                </li>

                {/* benefits */}
                <li className="nav-horizontal__item">
                    <a href="#benefits" className="nav-horizontal__link">
                        {linkText2}
                    </a>
                </li>

                {/* Features */}
                <li className="nav-horizontal__item">
                    <a href="#features" className="nav-horizontal__link">
                        {linkText3}
                    </a>
                </li>

                {/* Testimonials */}
                <li className="nav-horizontal__item">
                    <a href="#" className="nav-horizontal__link">
                        {linkText4}
                    </a>
                </li>
            </ul>

            <div className="nav-horizontal__actions-box">
                <button onClick={cbChangeLanguage}>
                    Change language
                </button>
                ACTIONS
            </div>
        </nav>
    )
}

export default NavHorizontal;
