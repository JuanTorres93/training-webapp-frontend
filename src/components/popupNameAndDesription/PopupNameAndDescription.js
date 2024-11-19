const PopupNameAndDescription = ({
    onClose = () => { },
    onEdit = () => { },
}) => {
    return (
        // TODO translate and parametrize max lengths

        <div className="popup-name-desc">
            <div className="popup-name-desc__input-area">
                <div className="popup-name-desc__input-box">
                    <label htmlFor="name" className="popup-name-desc__label">Name</label>
                    <input
                        id="name"
                        className="base-input-text popup-name-desc__input"
                        type="text"
                        placeholder="Name"
                        maxLength={40}
                    />
                </div>

                <div className="popup-name-desc__input-box">
                    <label htmlFor="description" className="popup-name-desc__label">Description</label>
                    <textarea
                        id="description"
                        className="base-input-text popup-name-desc__input"
                        placeholder="Description"
                        maxLength={500}
                    >

                    </textarea>
                </div>
            </div>

            <div className="popup-name-desc__icons-area">
                <figure className="popup-name-desc__icon-box popup-name-desc__icon-box--reject">
                    <ion-icon name="close-outline"></ion-icon>
                </figure>

                <figure className="popup-name-desc__icon-box popup-name-desc__icon-box--accept">
                    <ion-icon name="checkmark-outline"></ion-icon>
                </figure>
            </div>
        </div>
    );
};

export default PopupNameAndDescription;