import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import ExerciseCompleterV2 from "../../components/exerciseCompleter/ExerciseCompleterV2";

export default function RunWorkoutPageV2() {

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="run-workout-page">
                    <ExerciseCompleterV2 />
                </section>
            </main>
        </div>
    );
};
