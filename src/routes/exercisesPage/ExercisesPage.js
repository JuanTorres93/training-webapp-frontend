import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import ButtonNew from "../../components/ButtonNew/ButtonNew";

export default function ExercisesPage() {
    // TODO only appear if user is logged in

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="exercises-page">
                    <ButtonNew
                        buttonText="New Exercise"
                    />
                </section>
            </main>
        </div>
    );
};
