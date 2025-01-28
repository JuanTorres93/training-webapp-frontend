import React, { useContext } from "react";

import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { LoginObserverContext } from "../../LoginObserverContext";
import PopupOptionOrCancel from "./PopupOptionOrCancel";
import { extendUserSession } from "../../features/user/userSlice";

const ExtendSessionOptionOrCancel = ({
    isLoading = false,
}) => {
    const dispatch = useDispatch();
    const {
        showPopupExtendSession,
        setShowPopupExtendSession,
    } = useContext(LoginObserverContext);

    const { t } = useTranslation();
    const extendSessionText = t("extend-text");
    const cancelText = t("cancel-text");
    const title = t("extend-session-popup-title");
    const subtitle = t("extend-session-popup-subtitle");

    const handleCancel = () => {
        setShowPopupExtendSession(false);
    };

    const handleOption = () => {
        return () => {
            dispatch(extendUserSession());
            setShowPopupExtendSession(false);
        };
    };

    return (
        <PopupOptionOrCancel
            visibility={showPopupExtendSession ? "visible" : "hidden"}
            type="positive"
            title={title}
            subtitle={subtitle}
            option={extendSessionText}
            cancel={cancelText}
            handleOption={handleOption}
            handleCancel={handleCancel}
            isLoading={isLoading}
        />
    );
};

export default ExtendSessionOptionOrCancel;
