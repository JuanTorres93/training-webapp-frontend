const PopupNameAndDescription = ({
    visibility,
    nameLabel,
    descriptionLabel,
    arrowClassModifier = 'top-left',
    topPx = 0,
    leftPx = 0,
    onClose = () => { },
    onAccept = () => { },
}) => {
    return (
        // TODO parametrize max lengths
        <div
            className="popup-name-desc"
            style={{
                top: `${topPx}px`,
                left: `${leftPx}px`,
                visibility: visibility,
            }}
        >
            <div className={`popup-arrow popup-arrow--${arrowClassModifier}`}></div>
            <div className="popup-name-desc__input-area">
                <div className="popup-name-desc__input-box">
                    <label htmlFor="name" className="popup-name-desc__label">{nameLabel}</label>
                    <input
                        id="name"
                        className="base-input-text popup-name-desc__input"
                        type="text"
                        placeholder={nameLabel}
                        maxLength={40}
                    />
                </div>

                <div className="popup-name-desc__input-box">
                    <label htmlFor="description" className="popup-name-desc__label">{descriptionLabel}</label>
                    <textarea
                        id="description"
                        className="base-input-text popup-name-desc__input"
                        placeholder={descriptionLabel}
                        maxLength={500}
                    >

                    </textarea>
                </div>
            </div>

            <div className="popup-name-desc__icons-area">
                <figure
                    className="popup-name-desc__icon-box popup-name-desc__icon-box--reject"
                    onClick={onClose}
                >
                    <ion-icon name="close-outline"></ion-icon>
                </figure>

                <figure
                    className="popup-name-desc__icon-box popup-name-desc__icon-box--accept"
                    onClick={onAccept}
                >
                    <ion-icon name="checkmark-outline"></ion-icon>
                </figure>
            </div>
        </div>
    );
};

export default PopupNameAndDescription;