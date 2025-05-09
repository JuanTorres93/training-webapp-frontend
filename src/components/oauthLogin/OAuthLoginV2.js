import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "../../features/language/languageSlice";

const OAuthLoginV2 = ({
  logo,
  platformName,
  callbackURL,
  isEnabled = true,
}) => {
  const currentLanguage = useSelector(selectCurrentLanguage);

  return (
    <a
      className={`plain-btn oauth-login ${
        isEnabled ? "" : "oauth-login--disabled"
      }`}
      href={callbackURL + `?state=lang:${currentLanguage}`}
      target="_blank"
      aria-disabled={!isEnabled}
      onClick={(e) => {
        if (!isEnabled) e.preventDefault();
      }}
    >
      <figure className="oauth-login__icon-box">
        <img
          src={logo}
          alt={`${platformName} logo`}
          className="oauth-login__icon"
        />
      </figure>

      <span className="oauth-login__text">{platformName}</span>
    </a>
  );
};

export default OAuthLoginV2;
