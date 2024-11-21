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
    const [arrowClassModifier, setArrowClassModifier] = useState('top-left');

    const { t } = useTranslation();

    const handleMouseLeavesTemplate = (event) => {
        setShowPopupRow(false);
    };

    // TODO modificar. Está ahora mismo igual que en ejercicios
    const handleMouseEntersTemplate = (event) => {
        const rect = event.target.getBoundingClientRect();

        // TODO DELETE THESE DEBUG LOGS
        console.log('rect');
        console.log(rect);

        let x = rect.left + window.scrollX; // Absolute X coordinate
        let y = rect.top + rect.height + window.scrollY; // Absolute Y coordinate, just below the button   

        // TODO MAKE THIS RESPONSIVE. IT IS DEPENDENT ON THE CURRENT POPUP WIDTH
        // Check if x is less than half of the screen

        // Upper part of the screen
        if (y < window.innerHeight / 2) {
            y = y + 10; // Center the popup
            setArrowClassModifier('top-left');
        }
        // Lower part of the screen
        else {
            y = y - 10; // Center the popup
            setArrowClassModifier('bottom-left');
        }

        setPopupRowPosition({
            x,
            y,
        });
        setShowPopupRow(true);
    };


    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="templates-page">
                    <PopupRows
                        // TODO this will be an array of objects with the exercise info
                        // and will change on hover
                        visibility={showPopupRow ? 'visible' : 'hidden'}
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
