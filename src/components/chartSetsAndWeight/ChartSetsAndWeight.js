// import react needed for testing
import React from "react";

import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

const ChartSetsAndWeight = ({
    data,
    valuesInYAxis, // NOTE: cannot do the same in X axis due to line layer
    weightText = "Weight",
    repsText = "Reps",
    dayText = "Day",
    isSmall = false,
}) => {
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
    const colorWeight = "#ea704e";

    const processData = (data) => {
        const processedData = data.flatMap((dataPoint, dayIndex) => {
            // At time of development, Nivo can't use time axis
            // for bar charts, so I'm doing here the processing
            // of the format
            const formattedDate = dataPoint.datetime.toLocaleDateString("default", {
                month: "short",
                day: "numeric",
                // TODO remove or format label to show below the month and day
                hour: "2-digit",
                minute: "2-digit",
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

        // Remove items with same datetime and keep only the last one
        const uniqueData = Array.from(
            processedData.reduce((map, item) => map.set(item.datetime, item), new Map()).values()
        );

        return uniqueData;
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

            const setNumber = extractNumberFromKey(bar.key);
            const setKey = `weight${setNumber}`; // Build the key to access the weight
            const weight = originalData[setKey] || 0; // Get the weight from the data

            const weightInRepsScale = convertWeightToRepsScale(weight);

            return {
                x: bar.x + bar.width / 2, // Centrar el punto sobre la barra
                y: yScale(weightInRepsScale),
                weight,
                weightInRepsScale,
            }
        });

        if (points.length === 0) {
            return null;
        }

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
                    stroke={colorWeight}
                    strokeWidth={2}
                />
                {/* Puntos */}
                {points.map((point, index) => (
                    (
                        <g key={index}>
                            {/* NOTE: TO show weight above marker */}
                            {/* <text
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
                            </text> */}
                            <circle cx={point.x} cy={point.y} r={4} fill={colorWeight} />
                        </g>
                    )
                ))}
            </g>
        );
    };

    const chartMargin = isSmall ? { top: 0, right: 0, bottom: 40, left: 0 } : { top: 50, right: 80, bottom: 80, left: 60 };

    return (
        <ResponsiveBar
            data={barData}
            indexBy="datetime"
            // Represent each set as a group of reps. Reps are keyed as rep1, rep2, rep3, etc.
            keys={Array.from(new Set(barData.flatMap((dataPoint) => Object.keys(dataPoint).filter((key) => key.startsWith('reps')))))}
            groupMode="grouped"
            margin={chartMargin}
            padding={0.3}
            innerPadding={10}
            colors="#2FCA82"
            enableGridY={!isSmall}
            // Show value in bars
            label={(d) => isSmall ? null : d.value}
            axisBottom={{
                legend: dayText,
                legendPosition: "middle",
                legendOffset: 50,
            }}
            axisLeft={{
                legend: repsText,
                legendPosition: "middle",
                legendOffset: -40,
                ...(valuesInYAxis && { tickValues: valuesInYAxis }), // Show only the values in the array (Or the specified number of values)
            }}
            axisRight={{
                legend: weightText,
                legendPosition: "middle",
                legendOffset: 65,
                ...(valuesInYAxis && { tickValues: valuesInYAxis }), // Show only the values in the array (Or the specified number of values)
                // Needed to define a custom renderTick to change the 
                // color of the right axis.
                // If only would have needed to adjust the scale, then
                // I could have used the format property as
                // format: (value) => `${convertRepsToWeightScale(value)}`,
                renderTick: (tick) => {
                    return (
                        !isSmall &&
                        <g transform={`translate(${tick.x},${tick.y})`}>
                            <line
                                x1={0}
                                x2={-6}
                                y1={0}
                                y2={0}
                                stroke={colorWeight}
                            />
                            <text
                                x={6}
                                y={4}
                                textAnchor="start"
                                style={{
                                    fill: colorWeight,
                                    fontSize: "1.5rem",
                                    fontWeight: "400",
                                    fontFamily: "inherit",
                                }}
                            >
                                {convertRepsToWeightScale(tick.value)}
                            </text>
                        </g>
                    );
                },
            }}
            tooltip={({ id, value, data }) => {
                // id is the text reps and a number, e.g. reps8. Extract the number using a regex
                const setNumber = id.match(/\d+/)[0];
                const weight = data[`weight${setNumber}`];

                return (
                    <div
                        className="tooltip"
                    >
                        <span className='tooltip__date'>{data.datetime}</span>
                        {/* TODO traducir */}
                        <p>{repsText}: <span className="tooltip__data">{value}</span></p>
                        <p>{weightText}: <span className="tooltip__data tooltip__data--red">{weight}</span></p>
                    </div>
                )
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
                            fontFamily: 'inherit',
                        },
                    },
                    legend: {
                        text: {
                            fontSize: '1.6rem', // Size of axis name
                            fill: '#3c3f3d', // Color of axis name
                            fontWeight: '400',
                            fontFamily: 'inherit',
                        },
                    },
                },
            }}
        />
    );
}

export default ChartSetsAndWeight;