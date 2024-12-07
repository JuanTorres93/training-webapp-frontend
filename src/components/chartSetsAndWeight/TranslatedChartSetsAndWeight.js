import { useTranslation } from "react-i18next";
import ChartSetsAndWeight from "./ChartSetsAndWeight";

const TranslatedChartSetsAndWeight = ({ data }) => {
    const { t } = useTranslation();
    const weightText = t("tooltip-weight");
    const repsText = t("tooltip-reps");
    const dayText = t("tooltip-day");

    return (
        <ChartSetsAndWeight
            data={data}
            weightText={weightText}
            repsText={repsText}
            dayText={dayText}
        />
    );
};

export default TranslatedChartSetsAndWeight;