import SearchBar from "./SearchBar";

import { useTranslation } from "react-i18next";

export default function TranslatedSearchBar({
    extraClasses = "",
    parentSearchSetterFunction,
}) {
    const { t } = useTranslation();

    return (
        <SearchBar
            placeholder={t("button-search-placeholder")}
            extraClasses={extraClasses}
            parentSearchSetterFunction={parentSearchSetterFunction}
        />
    );
}