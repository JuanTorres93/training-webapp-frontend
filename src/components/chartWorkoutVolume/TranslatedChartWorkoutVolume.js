// import react needed for testing
import React from "react";

import { useTranslation } from "react-i18next";
import ChartWorkoutVolume from "./ChartWorkoutVolume";

const TranslatedChartWorkoutVolume = ({
    data,
    isLoading,
}) => {
    const { t } = useTranslation();
    const volumeText = t("extra-volume");

    return (
        <ChartWorkoutVolume
            data={data}
            volumeText={volumeText}
            isLoading={isLoading}
        />
    );
}

export default TranslatedChartWorkoutVolume;