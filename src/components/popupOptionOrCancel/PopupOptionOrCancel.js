import React from "react";

const PopupOptionOrCancel = ({
    // visibility can be "visible" or "hidden"
    visibility = 'hidden',
    // type can be "positive", "delete" or "warning"
    type = "delete",
    title = "Option or Cancel",
    subtitle = "Choose an option or cancel",
    option = "Option",
    cancel = "Cancel",
    handleOption = () => { },
    handleCancel = () => { },
    isLoading = false,
}) => {
    const getAndExecuteOptionDispatch = () => {
        const optionDispatch = handleOption();
        optionDispatch();
    };

    return (
        <div
            className={`popup-option-or-cancel ${visibility === 'hidden' ? 'popup-option-or-cancel--hidden' : ''}`}
        >
            <div className="popup-option-or-cancel__dialog">
                <figure className={`popup-option-or-cancel__icon-box popup-option-or-cancel__icon-box--${type}`}>
                    {type === "positive" ?
                        <ion-icon name="checkmark-circle-outline"></ion-icon> :
                        type === "warning" ?
                            <ion-icon name="alert-circle-outline"></ion-icon> :
                            <ion-icon name="trash-outline"></ion-icon>}
                </figure>

                <div className="popup-option-or-cancel__text-box">
                    <span className="popup-option-or-cancel__title">{title}</span>
                    <span className="popup-option-or-cancel__subtitle">{subtitle}</span>
                </div>

                <div className="popup-option-or-cancel__buttons-box">
                    <div
                        className={`
                            popup-option-or-cancel__button
                            ${isLoading ? 'popup-option-or-cancel__button--disabled' : ''}
                            `}
                        onClick={isLoading ? () => { } : handleCancel}
                    >
                        {cancel}
                    </div>

                    <div
                        className={`
                            popup-option-or-cancel__button 
                            popup-option-or-cancel__button--${type}
                            ${isLoading ? 'popup-option-or-cancel__button--disabled' : ''}
                            `}
                        onClick={isLoading ? () => { } : getAndExecuteOptionDispatch}
                    >
                        {isLoading ? <div className="spinner-2p2-rem"></div> : option}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopupOptionOrCancel;