import { useState } from "react";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../../components/ButtonNew/TranslatedButtonNew";
import ExercisePresenterV2 from "../../components/exercisePresenter/ExercisePresenterV2";
import PopupNameAndDescription from "../../components/popupNameAndDesription/PopupNameAndDescription";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";

export default function ExercisesPage() {
    // TODO only appear if user is logged in
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [arrowClassModifier, setArrowClassModifier] = useState('top-left');

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
                <section className="exercises-page">
                    <TranslatedPopupNameAndDescription
                        arrowClassModifier={arrowClassModifier}
                        visibility={showPopup ? 'visible' : 'hidden'}
                        leftPx={popupPosition.x}
                        topPx={popupPosition.y}
                        onClose={onPopupClose}
                        onAccept={onPopupAccept}
                    />

                    <TranslatedSearchBar
                        extraClasses="exercises-page__search-bar"
                    />
                    <TranslatedButtonNew
                        extraClasses="exercises-page__button-new"
                        onClick={handleClickShowPopup}
                    />

                    <div className="presenter-grid presenter-grid--exercises">
                        <ExercisePresenterV2
                            id="1"
                            name="Pull up"
                            description="Exercise for the back muscles. It is a compound exercise that also involves the biceps, forearms, traps, and the rear deltoids. The pull up is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="2"
                            name="Push up"
                            description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The push up is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="3"
                            name="Squat"
                            description="Exercise for the leg muscles. It is a compound exercise that also involves the glutes, lower back, hamstrings, calves, and the core. The squat is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="4"
                            name="Deadlift"
                            description="Exercise for the back muscles. It is a compound exercise that also involves the glutes, hamstrings, calves, and the core. The deadlift is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="5"
                            name="Bench press"
                            description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The bench press is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="6"
                            name="Overhead press    "
                            description="Exercise for the shoulder muscles. It is a compound exercise that also involves the triceps. The overhead press is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="7"
                            name="Dips"
                            description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The dips is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                        <ExercisePresenterV2
                            id="8"
                            name="Barbell row"
                            description="Exercise for the back muscles. It is a compound exercise that also involves the biceps, forearms, traps, and the rear deltoids. The barbell row is a basic movement that is very valuable for building strength and muscle mass."
                            onClickEdit={handleClickShowPopup}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};
