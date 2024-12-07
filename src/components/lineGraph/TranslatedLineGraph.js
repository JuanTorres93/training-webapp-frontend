import { useTranslation } from "react-i18next";
import LineGraph from "./LineGraph";

const TranslatedLineGraph = ({ data, valuesInYAxis }) => {
    const { t } = useTranslation();
    const dateText = t("tooltip-day");
    const weightText = t("tooltip-weight");

    return (
        <LineGraph
            data={data}
            valuesInYAxis={valuesInYAxis}
            dateText={dateText}
            weightText={weightText}
        />
    );
};

export default TranslatedLineGraph;