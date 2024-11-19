import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../../components/ButtonNew/TranslatedButtonNew";
import ExercisePresenterV2 from "../../components/exercisePresenter/ExercisePresenterV2";
import PopupNameAndDescription from "../../components/popupNameAndDesription/PopupNameAndDescription";

export default function ExercisesPage() {
    // TODO only appear if user is logged in

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="exercises-page">
                    <PopupNameAndDescription />

                    <TranslatedSearchBar
                        extraClasses="exercises-page__search-bar"
                    />
                    <TranslatedButtonNew
                        extraClasses="exercises-page__button-new"
                    />

                    <div className="presenter-grid presenter-grid--exercises">
                        <ExercisePresenterV2
                            id="1"
                            name="Pull up"
                            description="Exercise for the back muscles. It is a compound exercise that also involves the biceps, forearms, traps, and the rear deltoids. The pull up is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="2"
                            name="Push up"
                            description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The push up is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="3"
                            name="Squat"
                            description="Exercise for the leg muscles. It is a compound exercise that also involves the glutes, lower back, hamstrings, calves, and the core. The squat is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="4"
                            name="Deadlift"
                            description="Exercise for the back muscles. It is a compound exercise that also involves the glutes, hamstrings, calves, and the core. The deadlift is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="5"
                            name="Bench press"
                            description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The bench press is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="6"
                            name="Overhead press    "
                            description="Exercise for the shoulder muscles. It is a compound exercise that also involves the triceps. The overhead press is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="7"
                            name="Dips"
                            description="Exercise for the chest muscles. It is a compound exercise that also involves the triceps and the front deltoids. The dips is a basic movement that is very valuable for building strength and muscle mass."
                        />
                        <ExercisePresenterV2
                            id="8"
                            name="Barbell row"
                            description="Exercise for the back muscles. It is a compound exercise that also involves the biceps, forearms, traps, and the rear deltoids. The barbell row is a basic movement that is very valuable for building strength and muscle mass."
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};
