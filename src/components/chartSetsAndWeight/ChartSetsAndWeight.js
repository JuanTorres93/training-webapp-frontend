import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

const ChartSetsAndWeight = ({ data }) => {
    // data comes in this format (an array of objects):
    // data = [
    //     {
    //         datetime: new Date("2024-11-10"),
    //         sets: [
    //             { set: 1, reps: 7, weight: 40 },
    //             { set: 2, reps: 7, weight: 50 },
    //             { set: 3, reps: 6, weight: 60 },
    //             { set: 4, reps: 6, weight: 60 },
    //             { set: 5, reps: 6, weight: 60 },
    //         ],
    //     },
    //     {
    //         datetime: new Date("2024-11-11"),
    //         sets: [
    //             { set: 1, reps: 8, weight: 45 },
    //             { set: 2, reps: 8, weight: 55 },
    //             { set: 3, reps: 7, weight: 65 },
    //             { set: 5, reps: 6, weight: 60 },
    //         ],
    //     },
    // ];

    const processData = (data) => {
        return data.flatMap((dataPoint, dayIndex) => {
            // At time of development, Nivo can't use time axis
            // for bar charts, so I'm doing here the processing
            // of the format
            const formattedDate = dataPoint.datetime.toLocaleDateString("default", {
                month: "short",
                day: "numeric",
            });

            let processedPoint = {
                datetime: formattedDate,
                dayIndex, // Para usar como posición en el eje X
            };

            dataPoint.sets.forEach((set, setIndex) => {
                processedPoint = {
                    ...processedPoint,
                    setIndex, // TODO REVISAR Para alinear con el punto
                    [`set${set.set}`]: set.set,
                    [`reps${set.set}`]: set.reps,
                    [`weight${set.set}`]: set.weight,
                };
            })

            return processedPoint;
        })
    };

    const [barData, setBarData] = useState(processData(data));

    // maxReps and weightRange are used to transform the weigth
    // data to a range that can be displayed in the chart
    // Currently Nivo does not diffenrent scales for each Y axis,
    // so I have to normalize the data to a common scale and
    // change the labels to reflect the real values.
    const [maxReps, setMaxReps] = useState(0);
    const [weightRange, setWeightRange] = useState([0, 0]);

    const extractNumberFromKey = (key) => {
        // Split key by ".", get first element and extract numbers from it
        return key.split(".")[0].replace(/\D/g, "");
    };

    const convertWeightToRepsScale = (weight) => {
        return (maxReps - 1) * (weight - weightRange[0]) / (weightRange[1] - weightRange[0]);
    };

    const convertRepsToWeightScale = (reps) => {
        return weightRange[0] + (weightRange[1] - weightRange[0]) * reps / (maxReps - 1);
    };

    useEffect(() => {
        setBarData(processData(data));

        // Calculate max reps in data
        const maxRepsFinder = data.reduce((maxReps, dataPoint) => {
            const reps = dataPoint.sets.reduce((reps, set) => {
                return Math.max(reps, set.reps);
            }, 0);

            return Math.max(maxReps, reps);
        }, 0);

        setMaxReps(maxRepsFinder);

        // Calculate weight range in data
        let weightRangeFinder = data.reduce((weightRange, dataPoint) => {
            const weights = dataPoint.sets.map(set => set.weight);

            return [
                Math.min(weightRange[0], ...weights),
                Math.max(weightRange[1], ...weights),
            ];
        }, [Infinity, -Infinity]);

        // If weightRange is the same, set a default range
        if (weightRangeFinder[0] === weightRangeFinder[1]) {
            if (weightRangeFinder[0] === 0) {
                weightRangeFinder = [0, 1];
            }
            weightRangeFinder = [Math.max(0, weightRangeFinder[1] - 1), weightRangeFinder[1]];
        }

        setWeightRange(weightRangeFinder);
    }, [data]);

    const LineLayer = ({ bars, yScale }) => {
        const points = bars.map(bar => {
            const originalData = bar.data.data;

            // TODO DELETE THESE DEBUG LOGS
            console.log('originalData');
            console.log(originalData);

            const setNumber = extractNumberFromKey(bar.key);
            const setKey = `weight${setNumber}`; // Build the key to access the weight
            const weight = originalData[setKey] || 0; // Get the weight from the data

            const weightInRepsScale = convertWeightToRepsScale(weight);

            return {
                x: bar.x + bar.width / 2, // Centrar el punto sobre la barra
                // TODO modificar valor y para representar el peso
                y: yScale(weightInRepsScale),
                weight,
                weightInRepsScale,
            }
        });

        // order points by x
        points.sort((a, b) => a.x - b.x);

        return (
            <g>
                {/* Línea que conecta los puntos */}
                <path
                    d={`
          M ${points[0].x},${points[0].y}
          ${points.slice(1).map(point => `L ${point.x},${point.y}`).join(" ")}
        `}
                    fill="none"
                    stroke="red"
                    strokeWidth={2}
                />
                {/* Puntos */}
                {points.map((point, index) => (
                    (
                        <g>
                            <text
                                key={index}
                                x={point.x}
                                y={point.y - 10} // Position the text above the bar
                                textAnchor="middle"
                                style={{
                                    fill: "#000",
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                }}
                            >
                                {point.weight} kg
                            </text>
                            <circle key={index} cx={point.x} cy={point.y} r={4} fill="red" />
                        </g>
                    )
                ))}
            </g>
        );
    };

    return (
        <ResponsiveBar
            data={barData}
            indexBy="datetime"
            // Represent each set as a group of reps. Reps are keyed as rep1, rep2, rep3, etc.
            keys={Array.from(new Set(barData.flatMap((dataPoint) => Object.keys(dataPoint).filter((key) => key.startsWith('reps')))))}
            groupMode="grouped"
            margin={{ top: 50, right: 80, bottom: 80, left: 60 }}
            padding={0.3}
            innerPadding={10}
            colors="#2FCA82"
            axisBottom={{
                legend: "Day",
                legendPosition: "middle",
                legendOffset: 60,
                // format: "%b %d", // format date to show month and day
            }}
            axisLeft={{
                legend: "Repeticiones",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            axisRight={{
                legend: "Peso (kg)",
                legendPosition: "middle",
                legendOffset: 50,
                format: (value) => `${convertRepsToWeightScale(value)}`,
            }}
            layers={[
                "grid",
                "axes",
                "bars",
                LineLayer,
                "legends",
                "markers",
            ]}
            // Styling (tooltip is styled in sass)
            theme={{
                axis: {
                    ticks: {
                        text: {
                            fontSize: '1.5rem', // Size of numeric labels
                            fill: '#3c3f3d', // Color of numeric labels
                            fontWeight: '400',
                        },
                    },
                    legend: {
                        text: {
                            fontSize: '1.6rem', // Size of axis name
                            fill: '#3c3f3d', // Color of axis name
                            fontWeight: '400',
                        },
                    },
                },
            }}
        />
    );
}

export default ChartSetsAndWeight;