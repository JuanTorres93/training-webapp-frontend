// import react needed for testing
import React from "react";

export default function ButtonNew({
    buttonText,
    extraClasses = "",
    dataTestId = "",
    onClick = () => { },
}) {
    return (
        <button
            data-testid={dataTestId ? dataTestId : undefined}
            onClick={onClick}
            className={`button-new plain-btn ${extraClasses}`}
        >
            <figure className="button-new__icon-box">
                <ion-icon name="add-outline"></ion-icon>
            </figure>
            <span className="button-new__text">
                {buttonText}
            </span>
        </button>
    );
}