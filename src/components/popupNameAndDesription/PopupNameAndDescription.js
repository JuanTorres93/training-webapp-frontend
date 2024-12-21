import { useState, useEffect } from 'react';

const PopupNameAndDescription = ({
    visibility,
    nameLabel,
    descriptionLabel,
    arrowClassModifier = 'top-left',
    topPx = 0,
    leftPx = 0,
    onClose = () => { },
    acceptDispatchGenerator = () => { },
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (visibility === 'hidden') {
            setName('');
            setDescription('');
        }
    }, [visibility]);

    const executeOnAccept = () => {
        const dispatchFunction = acceptDispatchGenerator();
        dispatchFunction(name, description).then(() => {
            setName('');
            setDescription('');
        });
    };

    return (
        // TODO parametrize max lengths
        <div
            className={`
                popup-name-desc
                ${visibility === 'hidden' ? 'popup-name-desc--hidden' : null}
                `}
            style={{
                top: `${topPx}px`,
                left: `${leftPx}px`,
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
                        onChange={(event) => setName(event.target.value)}
                        value={name}
                        placeholder={nameLabel}
                        maxLength={40}
                    />
                </div>

                <div className="popup-name-desc__input-box">
                    <label htmlFor="description" className="popup-name-desc__label">{descriptionLabel}</label>
                    <textarea
                        id="description"
                        className="base-input-text popup-name-desc__input"
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
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
                    onClick={executeOnAccept}
                >
                    <ion-icon name="checkmark-outline"></ion-icon>
                </figure>
            </div>
        </div>
    );
};

export default PopupNameAndDescription;