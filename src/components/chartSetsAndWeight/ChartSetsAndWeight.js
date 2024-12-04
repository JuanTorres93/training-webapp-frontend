import { useState, useEffect } from "react";
import { ResponsiveBar } from "@nivo/bar";

const ChartSetsAndWeight = ({ data }) => {
    // data comes in this format (an array of objects):
    // data = [
    //     {
    //         datetime: "2024-11-11",
    //         sets: [
    //             { set: 1, reps: 7, weight: 40 },
    //             { set: 2, reps: 7, weight: 50 },
    //             { set: 3, reps: 6, weight: 60 },
    //             { set: 4, reps: 6, weight: 60 },
    //             { set: 5, reps: 6, weight: 60 },
    //         ],
    //     },
    //     {
    //         datetime: "2024-11-12",
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
            let processedPoint = {
                datetime: dataPoint.datetime,
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

    useEffect(() => {
        setBarData(processData(data));
    }, [data]);

    return (
        <ResponsiveBar
            data={barData}
            indexBy="datetime"
            // Represent each set as a group of reps. Reps are keyed as rep1, rep2, rep3, etc.
            keys={Array.from(new Set(barData.flatMap((dataPoint) => Object.keys(dataPoint).filter((key) => key.startsWith('reps')))))}
            groupMode="grouped"
            margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
            padding={0.3}
            innerPadding={10}
            colors="#2FCA82"
            axisBottom={{
                legend: "Day",
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                legend: "Repeticiones",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            layers={[
                "grid",
                "axes",
                "bars",
                "markers",
                "legends",
            ]}
        />
    );
}

export default ChartSetsAndWeight;