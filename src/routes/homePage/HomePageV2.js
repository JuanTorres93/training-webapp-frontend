import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import LineGraph from "../../components/lineGraph/LineGraph";

export default function HomePageV2() {
    // TODO only appear if user is logged in

    const data = [
        {
            "id": "japan",
            "data": [
                {
                    "x": "plane",
                    "y": 36
                },
                {
                    "x": "helicopter",
                    "y": 25
                },
                {
                    "x": "boat",
                    "y": 191
                },
                {
                    "x": "train",
                    "y": 246
                },
                {
                    "x": "subway",
                    "y": 100
                },
                {
                    "x": "bus",
                    "y": 274
                },
                {
                    "x": "car",
                    "y": 220
                },
                {
                    "x": "moto",
                    "y": 126
                },
                {
                    "x": "bicycle",
                    "y": 29
                },
                {
                    "x": "horse",
                    "y": 294
                },
                {
                    "x": "skateboard",
                    "y": 189
                },
                {
                    "x": "others",
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
