const FlashMessage = ({
    isVisible,
    title,
    description,
    type = 'error', // neutral, success, error
    onClose = () => { },
}) => {
    return (
        <div className={`
                flash-message ${!isVisible ? 'flash-message--hidden' : ''}
            `}>
            <div className="flash-message__line-box">
                <div className={`
                        flash-message__line
                        ${type === 'success' ? 'flash-message__line--success' : ''}
                        ${type === 'error' ? 'flash-message__line--error' : ''}
                    `}></div>
            </div>

            <figure className={`
                    flash-message__icon-box
                    ${type === 'success' ? 'flash-message__icon-box--success' : ''}
                    ${type === 'error' ? 'flash-message__icon-box--error' : ''}
                `}>
                {
                    type === 'success' ?
                        <ion-icon name="checkmark-circle-outline"></ion-icon> :
                        type === 'error' ?
                            <ion-icon name="close-circle-outline"></ion-icon> :
                            <ion-icon name="information-circle-outline"></ion-icon>

                }

            </figure>

            <div className="flash-message__content-box">
                <span className="flash-message__title">
                    {title}
                </span>
                <span className="flash-message__description">
                    {description}
                </span>
            </div>

            <div
                className="flash-message__close-box"
                onClick={onClose}
            >
                {/* TODO TRADUCIR */}
                Close
            </div>

        </div>
    );
};

export default FlashMessage;