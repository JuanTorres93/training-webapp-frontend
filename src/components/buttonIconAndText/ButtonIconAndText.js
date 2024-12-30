// import react needed for testing
import React from "react";

const ButtonIconAndText = ({
    ionIcon,
    text,
    onClick = () => { },
    extraClasses = "",
    disabled = false
}) => {
    return (
        <button
            onClick={onClick}
            className={`plain-btn button-icon-and-text ${disabled ? 'button-icon-and-text--disabled' : ''} ${extraClasses}`}
            disabled={disabled}
        >
            <figure className="button-icon-and-text__ion-icon-box">
                {ionIcon}
            </figure>
            <span className="button-icon-and-text__text">{text}</span>
        </button>
    );
}

export default ButtonIconAndText;