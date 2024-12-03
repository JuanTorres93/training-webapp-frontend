import { useState, useEffect, useRef } from "react";
import TranslatedNavVertical from "../../components/navVertical/TranslatedNavVertical";
import LineGraph from "../../components/lineGraph/LineGraph";

export default function HomePageV2() {
    // TODO only appear if user is logged in
    const [ticksCount, setTicksCount] = useState(5); // Initial number of ticks
    const weightGraphContainerRef = useRef(null); // Reference to the container

    useEffect(() => {
        // Function to calculate the number of ticks based on the container's height
        const calculateTicks = (height) => {
            return Math.max(2, Math.floor(height / 75)); // Add tick every 75px (Nivo may not respect this)
        };

        const handleResize = (entries) => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                setTicksCount(calculateTicks(height));
            }
        };

        // Create a ResizeObserver to observe changes in the container's dimensions
        const resizeObserver = new ResizeObserver(handleResize);

        // Observe container only if it exists
        if (weightGraphContainerRef.current) {
            resizeObserver.observe(weightGraphContainerRef.current);
        }

        // Clean up when component unmounts
        return () => resizeObserver.disconnect();
    }, []);

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
                },
                // Create 10 more data points that follow a similar uptrend
                {
                    "x": new Date("2024-11-13"),
                    "y": 71.1
                },
                {
                    "x": new Date("2024-11-14"),
                    "y": 71.3
                },
                {
                    "x": new Date("2024-11-15"),
                    "y": 71.5
                },
                {
                    "x": new Date("2024-11-16"),
                    "y": 71.7
                },
                {
                    "x": new Date("2024-11-17"),
                    "y": 71.9
                },
                {
                    "x": new Date("2024-11-18"),
                    "y": 72.1
                },
                {
                    "x": new Date("2024-11-19"),
                    "y": 72.3
                },
                {
                    "x": new Date("2024-11-20"),
                    "y": 72.5
                },
                {
                    "x": new Date("2024-11-21"),
                    "y": 72.7
                },
                {
                    "x": new Date("2024-11-22"),
                    "y": 72.9
                },

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
                    <div
                        ref={weightGraphContainerRef}
                        className="home-page__weight-progress-box"
                    >
                        {/* TODO translate and make title */}
                        WEIGHT
                        <LineGraph
                            data={data}
                            valuesInYAxis={ticksCount}
                        />
                    </div>
                    <div className="home-page__weight-input-box">
                        INPUT WEIGHT
                    </div>
                </section>
            </main>
        </div>
    );
};
