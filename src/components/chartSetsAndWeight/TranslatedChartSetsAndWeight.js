import { useTranslation } from "react-i18next";
import ChartSetsAndWeight from "./ChartSetsAndWeight";

const TranslatedChartSetsAndWeight = ({
    data,
    isSmall,
}) => {
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
            isSmall={isSmall}
        />
    );
};

export default TranslatedChartSetsAndWeight;