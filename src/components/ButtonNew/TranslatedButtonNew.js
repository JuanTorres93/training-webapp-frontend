import React from "react";
import ButtonNew from "./ButtonNew";

import { useTranslation } from "react-i18next";

export default function TranslatedButtonNew({
    extraClasses = "",
    dataTestId = "",
    onClick = () => { },
}) {
    const { t } = useTranslation();
    const buttonText = t("button-new-exercise");
    return (
        <ButtonNew
            dataTestId={dataTestId}
            buttonText={buttonText}
            extraClasses={extraClasses}
            onClick={onClick}
        />
    );
}
