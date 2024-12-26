import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import ButtonNew from "../../components/ButtonNew/ButtonNew";
import TemplatePresenter from "../../components/templatePresenter/TemplatePresenter";
import PopupRows from "../../components/popupRows/PopupRows";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";
import TranslatedTemplateCreator from "../../components/templateCreator/TranslatedTemplateCreator";

import { selectUser } from "../../features/user/userSlice";
import {
    selectUserTemplates,
    selectCommonTemplates,
} from "../../features/workoutsTemplates/workoutTemplatesSlice";

import {
    positionPopup,
    closePopupOnClickOutside,
    hidePopup, showPopup,
} from "../../utils/popups";

export default function TemplatesPage() {
    const user = useSelector(selectUser);
    const userTemplates = useSelector(selectUserTemplates);
    const commonTemplates = useSelector(selectCommonTemplates);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);

    // State for preview popup
    const [popupRowPosition, setPopupRowPosition] = useState({ x: 0, y: 0 });
    const [showPopupRow, setShowPopupRow] = useState(false);
    const [arrowClassModifierPopupRows, setArrowClassModifierPopupRows] = useState('top-center');

    // State for edit popup
    const [popupEditPosition, setPopupEditPosition] = useState({ x: 0, y: 0 });
    const [showPopupEdit, setShowPopupEdit] = useState(false);
    const [arrowClassModifierPopupEdit, setArrowClassModifierPopupEdit] = useState('top-left');

    // State for new template popup
    const [showPopupNewTemplate, setShowPopupNewTemplate] = useState(false);
    const [popupRows, setPopupRows] = useState([]);

    // state for available templates
    const [availableTemplates, setAvailableTemplates] = useState([]);

    // Translation access
    const { t } = useTranslation();

    useEffect(() => {
        // Compute available templates
        const avTemplates = [...userTemplates, ...commonTemplates];
        setAvailableTemplates(avTemplates);
    }, [userTemplates, commonTemplates]);

    // Handlers for preview popup
    const handleMouseLeavesTemplate = (event) => {
        setShowPopupRow(false);
    };

    const handleMouseEntersTemplate = templateId => (event) => {
        const upperLeft = { x: -10, y: 10, arrowClassModifier: 'top-left' };
        const upperRight = upperLeft;
        const lowerLeft = { x: -10, y: -440, arrowClassModifier: 'bottom-left' };
        const lowerRight = lowerLeft;

        positionPopup(
            event,
            setPopupRowPosition,
            setArrowClassModifierPopupRows,
            upperLeft,
            upperRight,
            lowerLeft,
            lowerRight
        );

        // Get template exercises

        const template = availableTemplates.find(t => t.id === templateId);
        const templateExercises = template.exercises.map((exercise, index) => ({
            exerciseOrder: exercise.order,
            exerciseName: exercise.name,
            numberOfSets: exercise.sets,
        }));
        setPopupRows(templateExercises);

        setShowPopupRow(true);
    };

    // Handlers for edit popup
    const handleClickShowPopupEdit = (event) => {
        const upperLeft = { x: -20, y: 10, arrowClassModifier: 'top-left' };
        const upperRight = { x: -348, y: 10, arrowClassModifier: 'top-right' };
        const lowerLeft = { x: -20, y: -265, arrowClassModifier: 'bottom-left' };
        const lowerRight = { x: -348, y: -265, arrowClassModifier: 'bottom-right' };

        positionPopup(
            event,
            setPopupEditPosition,
            setArrowClassModifierPopupEdit,
            upperLeft,
            upperRight,
            lowerLeft,
            lowerRight
        );
        setShowPopupEdit(true);
    };

    // Handlers for edit popup
    const handleClickShowPopupNewTemplate = (event) => {
        showPopup(setShowPopupNewTemplate);
    };

    return (
        // TODO include new template popup both its set function and class
        <div className="behind-app" onClick={(event) => { closePopupOnClickOutside(event, setShowPopupEdit, ["hydrated"]) }}>
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="templates-page">
                    {/* Popup for creating new template */}
                    <div
                        className={`
                            templates-page__new-template-popup 
                            templates-page__new-template-popup--${showPopupNewTemplate ? 'real-size' : 'shrunk'}
                            ${!showPopupNewTemplate ? 'templates-page__new-template-popup--hidden' : null}
                            `}
                    >
                        {/* Close popup button */}
                        <figure
                            className="templates-page__close-new-template-icon-box"
                            onClick={() => hidePopup(setShowPopupNewTemplate)}
                        >
                            <ion-icon name="close-outline" className="templates-page__close-new-template-icon"></ion-icon>
                        </figure>
                        <TranslatedTemplateCreator />
                    </div>

                    <PopupRows
                        visibility={showPopupRow ? 'visible' : 'hidden'}
                        arrowClassModifier={arrowClassModifierPopupRows}
                        leftPx={popupRowPosition.x}
                        topPx={popupRowPosition.y}
                        rows={popupRows}
                    />

                    <TranslatedPopupNameAndDescription
                        arrowClassModifier={arrowClassModifierPopupEdit}
                        visibility={showPopupEdit ? 'visible' : 'hidden'}
                        leftPx={popupEditPosition.x}
                        topPx={popupEditPosition.y}
                        onClose={() => hidePopup(setShowPopupEdit)}
                        onAccept={() => showPopup(setShowPopupEdit)}
                    />

                    <TranslatedSearchBar
                        extraClasses="templates-page__search-bar"
                    />

                    <ButtonNew
                        buttonText={t("button-new-template")}
                        extraClasses="templates-page__button-new"
                        onClick={handleClickShowPopupNewTemplate}
                    />

                    <div className="presenter-grid presenter-grid--templates">
                        {
                            availableTemplates.map((template) => (
                                <TemplatePresenter
                                    key={template.id}
                                    id={template.id}
                                    name={template.name}
                                    description={template.description}
                                    isCommonTemplate={template.isCommon}
                                    onMouseEnter={handleMouseEntersTemplate(template.id)}
                                    onMouseLeave={handleMouseLeavesTemplate}
                                    onClickEdit={handleClickShowPopupEdit}
                                />
                            ))
                        }
                    </div>
                </section>
            </main>
        </div>
    );
};
