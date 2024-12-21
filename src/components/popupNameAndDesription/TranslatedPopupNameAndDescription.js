import PopupNameAndDescription from "./PopupNameAndDescription";

import { useTranslation } from "react-i18next";

const TranslatedPopupNameAndDescription = ({
    visibility,
    arrowClassModifier = 'top-left',
    topPx = 0,
    leftPx = 0,
    onClose = () => { },
    acceptDispatchGenerator = () => { },
}) => {
    const { t } = useTranslation();

    return (
        <PopupNameAndDescription
            nameLabel={t("popup-name-desc-name")}
            descriptionLabel={t("popup-name-desc-description")}
            visibility={visibility}
            arrowClassModifier={arrowClassModifier}
            topPx={topPx}
            leftPx={leftPx}
            onClose={onClose}
            acceptDispatchGenerator={acceptDispatchGenerator}
        />
    );
}

export default TranslatedPopupNameAndDescription;