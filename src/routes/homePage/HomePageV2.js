import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";

export default function HomePageV2() {
    // TODO only appear if user is logged in

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="home-page">
                    {/* TODO DELETE */}
                    HOME PAGE
                </section>
            </main>
        </div>
    );
};
