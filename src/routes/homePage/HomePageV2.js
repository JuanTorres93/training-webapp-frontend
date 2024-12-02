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
                    "y": 36
                },
                {
                    "x": new Date("2024-11-02"),
                    "y": 25
                },
                {
                    "x": new Date("2024-11-03"),
                    "y": 191
                },
                {
                    "x": new Date("2024-11-04"),
                    "y": 246
                },
                {
                    "x": new Date("2024-11-05"),
                    "y": 100
                },
                {
                    "x": new Date("2024-11-06"),
                    "y": 274
                },
                {
                    "x": new Date("2024-11-07"),
                    "y": 220
                },
                {
                    "x": new Date("2024-11-08"),
                    "y": 126
                },
                {
                    "x": new Date("2024-11-09"),
                    "y": 29
                },
                {
                    "x": new Date("2024-11-10"),
                    "y": 294
                },
                {
                    "x": new Date("2024-11-11"),
                    "y": 189
                },
                {
                    "x": new Date("2024-11-12"),
                    "y": 40
                }
            ]
        },
    ];

    return (
        <div className="behind-app">
            <main className="app-layout">
                <TranslatedNavVertical />
                <section className="home-page">
                    {/* TODO DELETE */}
                    HOME PAGE HOLA
                    <LineGraph data={data} />
                </section>
            </main>
        </div>
    );
};
