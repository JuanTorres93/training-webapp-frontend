import { useState } from "react";
import { useTranslation } from "react-i18next";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import ButtonNew from "../../components/ButtonNew/ButtonNew";
import TemplatePresenter from "../../components/templatePresenter/TemplatePresenter";
import PopupRows from "../../components/popupRows/PopupRows";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";

import { positionPopup } from "../../utils/popups";

export default function TemplatesPage() {
    // TODO only appear if user is logged in
    // State for preview popup
    const [popupRowPosition, setPopupRowPosition] = useState({ x: 0, y: 0 });
    const [showPopupRow, setShowPopupRow] = useState(false);
    const [arrowClassModifierPopupRows, setArrowClassModifierPopupRows] = useState('top-center');

    // State for edit popup
    const [popupEditPosition, setPopupEditPosition] = useState({ x: 0, y: 0 });
    const [showPopupEdit, setShowPopupEdit] = useState(false);
    const [arrowClassModifierPopupEdit, setArrowClassModifierPopupEdit] = useState('top-left');

    const { t } = useTranslation();

    // Handlers for preview popup
    const handleMouseLeavesTemplate = (event) => {
        setShowPopupRow(false);
    };

    const handleMouseEntersTemplate = (event) => {
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

    const onPopupClose = () => {
        setShowPopupEdit(false);
    };

    const onPopupAccept = () => {
        setShowPopupEdit(false);
    };



    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="templates-page">
                    <PopupRows
                        // TODO Modify rows according hovered template
                        visibility={showPopupRow ? 'visible' : 'hidden'}
                        arrowClassModifier={arrowClassModifierPopupRows}
                        leftPx={popupRowPosition.x}
                        topPx={popupRowPosition.y}
                        rows={[
                            {
                                exerciseOrder: 1,
                                exerciseName: "Bench press",
                                numberOfSets: 4,
                            },
                            {
                                exerciseOrder: 2,
                                exerciseName: "Incline bench press",
                                numberOfSets: 4,
                            },
                            {
                                exerciseOrder: 3,
                                exerciseName: "Dumbbell flyes",
                                numberOfSets: 4,
                            }
                        ]}
                    />

                    <TranslatedPopupNameAndDescription
                        arrowClassModifier={arrowClassModifierPopupEdit}
                        visibility={showPopupEdit ? 'visible' : 'hidden'}
                        leftPx={popupEditPosition.x}
                        topPx={popupEditPosition.y}
                        onClose={onPopupClose}
                        onAccept={onPopupAccept}
                    />

                    <TranslatedSearchBar
                        extraClasses="templates-page__search-bar"
                    />

                    <ButtonNew
                        buttonText={t("button-new-template")}
                        extraClasses="templates-page__button-new"
                    // TODO show new template popup
                    // onClick={}
                    />

                    <div className="presenter-grid presenter-grid--templates">
                        <TemplatePresenter
                            id={1}
                            name="Push day"
                            description="Routine for push day. Chest, triceps, shoulders. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />

                        <TemplatePresenter
                            id={20}
                            name="Pull day"
                            description=""
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />

                        <TemplatePresenter
                            id={2}
                            name="Pull day"
                            description="Routine for pull day. Back, biceps. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />

                        <TemplatePresenter
                            id={3}
                            name="Leg day"
                            description="Routine for leg day. Quadriceps, hamstrings, glutes. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />

                        <TemplatePresenter
                            id={4}
                            name="Full body"
                            description="Routine for full body. Chest, back, legs, shoulders, arms. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />

                        <TemplatePresenter
                            id={5}
                            name="Cardio"
                            description="Routine for cardio. It allows you to improve your cardiovascular system."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />

                        <TemplatePresenter
                            id={6}
                            name="Mobility"
                            description="Routine for mobility. It allows you to improve your flexibility and mobility."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                            onClickEdit={handleClickShowPopupEdit}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};
