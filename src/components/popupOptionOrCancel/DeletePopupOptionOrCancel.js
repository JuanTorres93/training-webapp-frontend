import React from "react";

import PopupOptionOrCancel from "./PopupOptionOrCancel";
import { useTranslation } from "react-i18next";

const DeletePopupOptionOrCancel = ({
    subtitle = "Choose an option or cancel",
    handleOption = () => { },
    handleCancel = () => { },
}) => {
    const { t } = useTranslation();
    const deleteText = t("delete-text");
    const cancelText = t("cancel-text");
    const title = t("delete-popup-title");

    return (
        <PopupOptionOrCancel
            type="delete"
            title={title}
            subtitle={subtitle}
            option={deleteText}
            cancel={cancelText}
            handleOption={handleOption}
            handleCancel={handleCancel}
        />
    );
};

export default DeletePopupOptionOrCancel;
