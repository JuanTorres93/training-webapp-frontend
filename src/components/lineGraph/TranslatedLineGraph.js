import { useTranslation } from "react-i18next";
import LineGraph from "./LineGraph";

const TranslatedLineGraph = ({
    data,
    valuesInYAxis,
    valuesInXAxis,
}) => {
    const { t } = useTranslation();
    const dateText = t("tooltip-day");
    const weightText = t("tooltip-weight");

    return (
        <LineGraph
            data={data}
            valuesInYAxis={valuesInYAxis}
            valuesInXAxis={valuesInXAxis}
            dateText={dateText}
            weightText={weightText}
        />
    );
};

export default TranslatedLineGraph;