// import react needed for testing
import React from "react";

const ButtonIconAndText = ({
    ionIcon,
    text,
    onClick = () => { },
    extraClasses = "",
    disabled = false,
    isLoading = false,
}) => {
    return (
        <button
            onClick={onClick}
            className={`plain-btn button-icon-and-text ${disabled ? 'button-icon-and-text--disabled' : ''} ${extraClasses}`}
            disabled={disabled}
        >
            {isLoading && <div className="spinner-5-rem"></div>}
            {!isLoading && (
                <React.Fragment>
                    <figure className="button-icon-and-text__ion-icon-box">
                        {ionIcon}
                    </figure>
                    <span className="button-icon-and-text__text">{text}</span>
                </React.Fragment>
            )}
        </button>
    );
}

export default ButtonIconAndText;