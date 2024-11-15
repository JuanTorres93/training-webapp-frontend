import ButtonNew from "./ButtonNew";

import { useTranslation } from "react-i18next";

export default function TranslatedButtonNew({
    onClick = () => { },
}) {
    const { t } = useTranslation();
    const buttonText = t("button-new-exercise");
    return (
        <ButtonNew
            buttonText={buttonText}
            onClick={onClick}
        />
    );
}
