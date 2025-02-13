import React from "react";
import TemplateCreator from "./TemplateCreator";

import { useTranslation } from "react-i18next";

const TranslatedTemplateCreator = ({
    exercisesData,
    newTemplateDispatchGenerator,
    isLoading,
}) => {
    const { t } = useTranslation();
    const nameLabel = t("template-creator-name-label");
    const descriptionLabel = t("template-creator-description-label");
    const availableExercisesText = t("template-creator-available-exercises-text");
    const usedExercisesText = t("template-creator-used-exercises-text");
    const createTemplateText = t("template-creator-create-template-text");
    const placeholderSets = t("template-creator-placeholder-sets");

    return (
        <TemplateCreator
            nameLabel={nameLabel}
            descriptionLabel={descriptionLabel}
            availableExercisesText={availableExercisesText}
            usedExercisesText={usedExercisesText}
            createTemplateText={createTemplateText}
            placeholderSets={placeholderSets}
            exercisesData={exercisesData}
            newTemplateDispatchGenerator={newTemplateDispatchGenerator}
            isLoading={isLoading}
        />
    );
};

export default TranslatedTemplateCreator;