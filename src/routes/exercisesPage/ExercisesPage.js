import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";

export default function ExercisesPage() {
    // TODO only appear if user is logged in

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="exercises-page">

                    EXERCISES
                </section>
            </main>
        </div>
    );
};
