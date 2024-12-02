import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import LineGraph from "../../components/lineGraph/LineGraph";

export default function HomePageV2() {
    // TODO only appear if user is logged in

    const data = [
        {
            "id": "Weight",
            "data": [
                {
                    "x": new Date("2024-11-01"),
                    "y": 70.1
                },
                {
                    "x": new Date("2024-11-02"),
                    "y": 70.4
                },
                {
                    "x": new Date("2024-11-03"),
                    "y": 70.3
                },
                {
                    "x": new Date("2024-11-04"),
                    "y": 70.2
                },
                {
                    "x": new Date("2024-11-05"),
                    "y": 70.6
                },
                {
                    "x": new Date("2024-11-06"),
                    "y": 70.5
                },
                {
                    "x": new Date("2024-11-07"),
                    "y": 70.7
                },
                {
                    "x": new Date("2024-11-08"),
                    "y": 70.8
                },
                {
                    "x": new Date("2024-11-09"),
                    "y": 70.6
                },
                {
                    "x": new Date("2024-11-10"),
                    "y": 70.5
                },
                {
                    "x": new Date("2024-11-11"),
                    "y": 70.7
                },
                {
                    "x": new Date("2024-11-12"),
                    "y": 70.9
                }
            ]
        },
    ];

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="home-page">
                    <div className="home-page__recent-workouts-box">
                        RECENT WORKOUTS
                    </div>
                    <div className="home-page__weight-progress-box">
                        {/* TODO translate and make title */}
                        WEIGHT
                        <LineGraph data={data} />
                    </div>
                    <div className="home-page__weight-input-box">
                        INPUT WEIGHT
                    </div>
                </section>
            </main>
        </div>
    );
};
