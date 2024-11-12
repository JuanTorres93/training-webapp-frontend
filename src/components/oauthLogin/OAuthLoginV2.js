const OAuthLoginV2 = ({ logo, platformName, callbackURL }) => {
    return (
        <a className="plain-btn oauth-login" href={callbackURL} target="_blank">
            <figure className="oauth-login__icon-box">
                <img src={logo} alt={`${platformName} logo`} className="oauth-login__icon" />
            </figure>

            <span className="oauth-login__text">
                {platformName}
            </span>
        </a>
    );
}

export default OAuthLoginV2;