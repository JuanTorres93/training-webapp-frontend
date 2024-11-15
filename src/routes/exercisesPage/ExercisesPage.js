import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import TranslatedSearchBar from "../../components/searchBar/TranslatedSearchBar";
import TranslatedButtonNew from "../../components/ButtonNew/TranslatedButtonNew";

export default function ExercisesPage() {
    // TODO only appear if user is logged in

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="exercises-page">
                    <TranslatedSearchBar />
                    <TranslatedButtonNew />
                </section>
            </main>
        </div>
    );
};
