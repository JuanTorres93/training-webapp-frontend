// import react needed for testing
import React from "react";

const ButtonIconAndText = ({
    ionIcon,
    text,
    onClick = () => { },
    extraClasses = ""
}) => {
    return (
        <button onClick={onClick} className={`plain-btn button-icon-and-text ${extraClasses}`}>
            <figure className="button-icon-and-text__ion-icon-box">
                {ionIcon}
            </figure>
            <span className="button-icon-and-text__text">{text}</span>
        </button>
    );
}

export default ButtonIconAndText;