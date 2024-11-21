import { useState } from "react";
import { useTranslation } from "react-i18next";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import ButtonNew from "../../components/ButtonNew/ButtonNew";
import TemplatePresenter from "../../components/templatePresenter/TemplatePresenter";
import PopupRows from "../../components/popupRows/PopupRows";


export default function TemplatesPage() {
    // TODO only appear if user is logged in
    const [popupRowPosition, setPopupRowPosition] = useState({ x: 0, y: 0 });
    const [showPopupRow, setShowPopupRow] = useState(false);
    const [arrowClassModifier, setArrowClassModifier] = useState('top-center');

    const { t } = useTranslation();

    const handleMouseLeavesTemplate = (event) => {
        setShowPopupRow(false);
    };

    const _setPopupRowPosition = (x, y) => {

        // TODO MAKE THIS RESPONSIVE. IT IS DEPENDENT ON THE CURRENT POPUP WIDTH

        // Upper part of the screen
        if (y < window.innerHeight / 2) {
            // horizontally at start
            x = x - 10;
            setArrowClassModifier('top-left');
        }
        // Lower part of the screen
        else {
            // horizontally at start
            x = x - 10;
            y = y - 440; // Center the popup
            setArrowClassModifier('bottom-left');
        }

        setPopupRowPosition({
            x,
            y,
        });
    };

    const handleMouseEntersTemplate = (event) => {
        // DOC: currentTarget property always refers to the element to which the event is bound, i.e. the component that has the onMouseEnter.
        const rect = event.currentTarget.getBoundingClientRect();

        let x = rect.left + window.scrollX; // Absolute X coordinate
        let y = rect.top + rect.height + window.scrollY; // Absolute Y coordinate, just below the button   
        _setPopupRowPosition(x, y);
        setShowPopupRow(true);
    };


    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="templates-page">
                    <PopupRows
                        // TODO Modify rows according hovered template
                        visibility={showPopupRow ? 'visible' : 'hidden'}
                        arrowClassModifier={arrowClassModifier}
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
                        />

                        <TemplatePresenter
                            id={20}
                            name="Pull day"
                            description=""
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                        />

                        <TemplatePresenter
                            id={2}
                            name="Pull day"
                            description="Routine for pull day. Back, biceps. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                        />

                        <TemplatePresenter
                            id={3}
                            name="Leg day"
                            description="Routine for leg day. Quadriceps, hamstrings, glutes. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                        />

                        <TemplatePresenter
                            id={4}
                            name="Full body"
                            description="Routine for full body. Chest, back, legs, shoulders, arms. It allows you to gain muscle mass and strength."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                        />

                        <TemplatePresenter
                            id={5}
                            name="Cardio"
                            description="Routine for cardio. It allows you to improve your cardiovascular system."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                        />

                        <TemplatePresenter
                            id={6}
                            name="Mobility"
                            description="Routine for mobility. It allows you to improve your flexibility and mobility."
                            onMouseEnter={handleMouseEntersTemplate}
                            onMouseLeave={handleMouseLeavesTemplate}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};
