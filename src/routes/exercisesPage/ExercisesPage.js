import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../../components/ButtonNew/TranslatedButtonNew";
import ExercisePresenterV2 from "../../components/exercisePresenter/ExercisePresenterV2";
import TranslatedPopupNameAndDescription from "../../components/popupNameAndDesription/TranslatedPopupNameAndDescription";

import { selectUser } from "../../features/user/userSlice";

import {
    positionPopup,
    closePopupOnClickOutside,
    hidePopup, showPopup as showPopupFn,
} from "../../utils/popups";

export default function ExercisesPage() {
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);


    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [showPopup, setShowPopup] = useState(false);
    const [arrowClassModifier, setArrowClassModifier] = useState('top-left');

    const handleClickShowPopup = (event) => {
        const upperLeft = { x: -20, y: 10, arrowClassModifier: 'top-left' };
        const upperRight = { x: -348, y: 10, arrowClassModifier: 'top-right' };
        const lowerLeft = { x: -20, y: -265, arrowClassModifier: 'bottom-left' };
        const lowerRight = { x: -348, y: -265, arrowClassModifier: 'bottom-right' };

        positionPopup(
            event,
            setPopupPosition,
            setArrowClassModifier,
            upperLeft,
            upperRight,
            lowerLeft,
            lowerRight
        );
        setShowPopup(true);
    };


    return (
        <div className="behind-app" onClick={(event) => { closePopupOnClickOutside(event, setShowPopup, ["hydrated", "button-new", "button-new__text"]) }}>
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="exercises-page">
                    <TranslatedPopupNameAndDescription
                        arrowClassModifier={arrowClassModifier}
                        visibility={showPopup ? 'visible' : 'hidden'}
                        leftPx={popupPosition.x}
                        topPx={popupPosition.y}
                        onClose={() => hidePopup(setShowPopup)}
                        onAccept={() => showPopupFn(setShowPopup)}
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
