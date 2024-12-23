import React from "react";

const PopupOptionOrCancel = ({
    // type can be "positive" or "delete"
    type = "delete",
    title = "Option or Cancel",
    subtitle = "Choose an option or cancel",
    option = "Option",
    cancel = "Cancel",
    handleOption = () => { },
    handleCancel = () => { },
}) => {
    return (
        <div className="popup-option-or-cancel">
            <div className="popup-option-or-cancel__dialog">
                <figure className={`popup-option-or-cancel__icon-box popup-option-or-cancel__icon-box--${type}`}>
                    {type === "positive" ?
                        <ion-icon name="checkmark-circle-outline"></ion-icon> :
                        <ion-icon name="trash-outline"></ion-icon>}
                </figure>

                <div className="popup-option-or-cancel__text-box">
                    <span className="popup-option-or-cancel__title">{title}</span>
                    <span className="popup-option-or-cancel__subtitle">{subtitle}</span>
                </div>

                <div className="popup-option-or-cancel__buttons-box">
                    <div
                        className="popup-option-or-cancel__button"
                        onClick={handleCancel}
                    >
                        {cancel}
                    </div>

                    <div
                        className={`popup-option-or-cancel__button popup-option-or-cancel__button--${type}`}
                        onClick={handleOption}
                    >
                        {option}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupOptionOrCancel;