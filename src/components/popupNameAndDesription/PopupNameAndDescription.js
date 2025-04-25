import React, { useState, useEffect } from "react";

const PopupNameAndDescription = ({
  visibility,
  nameLabel,
  descriptionLabel,
  isLoading,
  arrowClassModifier = "top-left",
  topPx = 0,
  leftPx = 0,
  onClose = () => {},
  acceptDispatchGenerator = () => {},
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (visibility === "hidden") {
      setName("");
      setDescription("");
    }
  }, [visibility]);

  const executeOnAccept = () => {
    const dispatchFunction = acceptDispatchGenerator();
    dispatchFunction(name, description).then(() => {
      setName("");
      setDescription("");
    });
  };

  return (
    // TODO later? parametrize max lengths
    <div
      className={`
                popup-name-desc
                ${visibility === "hidden" ? "popup-name-desc--hidden" : null}
                `}
      style={{
        top: `${topPx}px`,
        left: `${leftPx}px`,
      }}
    >
      <div className={`popup-arrow popup-arrow--${arrowClassModifier}`}></div>
      <div className="popup-name-desc__input-area">
        <div className="popup-name-desc__input-box">
          <label htmlFor="name" className="popup-name-desc__label">
            {nameLabel}
          </label>
          <input
            data-testid="name"
            id="name"
            className={`
                            base-input-text 
                            popup-name-desc__input
                            ${
                              isLoading
                                ? "popup-name-desc__input--disabled"
                                : ""
                            }
                            `}
            type="text"
            onChange={(event) => setName(event.target.value)}
            disabled={isLoading}
            value={name}
            placeholder={nameLabel}
            maxLength={40}
          />
        </div>

        <div className="popup-name-desc__input-box">
          <label htmlFor="description" className="popup-name-desc__label">
            {descriptionLabel}
          </label>
          <textarea
            data-testid="description"
            id="description"
            className={`
                            base-input-text 
                            popup-name-desc__input
                            ${
                              isLoading
                                ? "popup-name-desc__input--disabled"
                                : ""
                            }
                            `}
            onChange={(event) => setDescription(event.target.value)}
            disabled={isLoading}
            value={description}
            placeholder={descriptionLabel}
            maxLength={500}
          ></textarea>
        </div>
      </div>

      <div className="popup-name-desc__icons-area">
        <figure
          data-testid="close-popup"
          className={`
                        popup-name-desc__icon-box 
                        popup-name-desc__icon-box--reject
                        ${
                          isLoading ? "popup-name-desc__icon-box--disabled" : ""
                        }
                        `}
          onClick={isLoading ? () => {} : onClose}
        >
          <ion-icon name="close-outline"></ion-icon>
        </figure>

        <figure
          data-testid="accept-popup"
          className={`
                        popup-name-desc__icon-box 
                        popup-name-desc__icon-box--accept
                        ${
                          isLoading ? "popup-name-desc__icon-box--disabled" : ""
                        }
                        `}
          onClick={isLoading ? () => {} : executeOnAccept}
        >
          {isLoading ? (
            <div
              style={{ pointerEvents: "none" }}
              className="spinner-2p2-rem spinner-base--grey-dark-1"
            ></div>
          ) : (
            <ion-icon name="checkmark-outline"></ion-icon>
          )}
        </figure>
      </div>
    </div>
  );
};

export default PopupNameAndDescription;
