import React from "react";
import { useTranslation } from "react-i18next";
import ChartSetsAndWeight from "./ChartSetsAndWeight";

const TranslatedChartSetsAndWeight = ({
    data,
    realTimeData,
    isSmall,
    valuesInYAxis,
    isLoading,
}) => {
    const { t } = useTranslation();
    const weightText = t("tooltip-weight");
    const repsText = t("tooltip-reps");
    const dayText = t("tooltip-day");

    return (
        <ChartSetsAndWeight
            data={data}
            realTimeData={realTimeData}
            weightText={weightText}
            repsText={repsText}
            dayText={dayText}
            isSmall={isSmall}
            valuesInYAxis={valuesInYAxis}
            isLoading={isLoading}
        />
    );
};

export default TranslatedChartSetsAndWeight;