import React, { useContext } from "react";

import { useTranslation } from "react-i18next";

import { LoginObserverContext } from "../../LoginObserverContext";
import PopupOptionOrCancel from "./PopupOptionOrCancel";

const ExpiredSessionOptionOrCancel = ({
    isLoading = false,
}) => {
    const {
        showPopupSessionExpired,
        setShowPopupSessionExpired,
    } = useContext(LoginObserverContext);

    const { t } = useTranslation();
    const sessionExpiredButtonText = t("session-expired-button-text");
    const cancelText = t("cancel-text");
    const title = t("session-expired-popup-title");
    const subtitle = t("session-expired-popup-subtitle");

    const handleCancel = () => {
        setShowPopupSessionExpired(false);
    };

    const handleOption = () => {
        return () => {
            setShowPopupSessionExpired(false);
        };
    };

    return (
        <PopupOptionOrCancel
            visibility={showPopupSessionExpired ? "visible" : "hidden"}
            type="warning"
            title={title}
            subtitle={subtitle}
            option={sessionExpiredButtonText}
            cancel={cancelText}
            handleOption={handleOption}
            handleCancel={handleCancel}
            isLoading={isLoading}
        />
    );
};

export default ExpiredSessionOptionOrCancel;
