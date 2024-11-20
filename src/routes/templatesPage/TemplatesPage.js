import { useState } from "react";
import { useTranslation } from "react-i18next";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import ButtonNew from "../../components/ButtonNew/ButtonNew";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";
import TemplatePresenter from "../../components/templatePresenter/TemplatePresenter";


export default function TemplatesPage() {
    // TODO only appear if user is logged in
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [arrowClassModifier, setArrowClassModifier] = useState('top-left');

    const { t } = useTranslation();

    // TODO modificar. Está ahora mismo igual que en ejercicios
    const handleClickShowPopup = (event) => {
        const rect = event.target.getBoundingClientRect();

        let x = rect.left + window.scrollX; // Absolute X coordinate
        let y = rect.top + rect.height + window.scrollY; // Absolute Y coordinate, just below the button   

        // TODO MAKE THIS RESPONSIVE. IT IS DEPENDENT ON THE CURRENT POPUP WIDTH
        // Check if x is less than half of the screen
        // Left part of the screen
        if (x < window.innerWidth / 2) {
            // Check if y is less than half of the screen
            // Upper left part of the screen
            if (y < window.innerHeight / 2) {
                x = x - 20; // Center the popup
                y = y + 10; // Center the popup
                setArrowClassModifier('top-left');
            }
            // Bottom left part of the screen
            else {
                x = x - 20; // Center the popup
                y = y - 265; // Center the popup
                setArrowClassModifier('bottom-left');
            }

        }
        // Right part of the screen
        else {
            // Check if y is less than half of the screen
            // Upper right part of the screen
            if (y < window.innerHeight / 2) {
                x = x - 348; // Center the popup
                y = y + 10; // Center the popup
                setArrowClassModifier('top-right');
            }
            // Bottom right part of the screen
            else {
                x = x - 348; // Center the popup
                y = y - 265; // Center the popup
                setArrowClassModifier('bottom-right');
            }
        }

        setPopupPosition({
            x,
            y,
        });
        setShowPopup(true);
    };

    const onPopupClose = () => {
        setShowPopup(false);
    };

    const onPopupAccept = () => {
        setShowPopup(false);
    };


    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="templates-page">

                    {/* TODO CAMBIAR POR EL POPUP DE LAS TEMPLATES */}
                    <TranslatedPopupNameAndDescription
                        arrowClassModifier={arrowClassModifier}
                        visibility={showPopup ? 'visible' : 'hidden'}
                        leftPx={popupPosition.x}
                        topPx={popupPosition.y}
                        onClose={onPopupClose}
                        onAccept={onPopupAccept}
                    />

                    <TranslatedSearchBar
                        extraClasses="templates-page__search-bar"
                    />

                    <ButtonNew
                        buttonText={t("button-new-template")}
                        extraClasses="templates-page__button-new"
                        onClick={handleClickShowPopup}
                    />

                    <div className="presenter-grid presenter-grid--templates">
                        <TemplatePresenter
                            id={1}
                            name="Push day"
                            description="Routine for push day. Chest, triceps, shoulders. It allows you to gain muscle mass and strength."
                        />

                        <TemplatePresenter
                            id={20}
                            name="Pull day"
                            description=""
                        />

                        <TemplatePresenter
                            id={2}
                            name="Pull day"
                            description="Routine for pull day. Back, biceps. It allows you to gain muscle mass and strength."
                        />

                        <TemplatePresenter
                            id={3}
                            name="Leg day"
                            description="Routine for leg day. Quadriceps, hamstrings, glutes. It allows you to gain muscle mass and strength."
                        />

                        <TemplatePresenter
                            id={4}
                            name="Full body"
                            description="Routine for full body. Chest, back, legs, shoulders, arms. It allows you to gain muscle mass and strength."
                        />

                        <TemplatePresenter
                            id={5}
                            name="Cardio"
                            description="Routine for cardio. It allows you to improve your cardiovascular system."
                        />

                        <TemplatePresenter
                            id={6}
                            name="Mobility"
                            description="Routine for mobility. It allows you to improve your flexibility and mobility."
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};
