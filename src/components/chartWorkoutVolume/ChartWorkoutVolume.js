// import react needed for testing
import React from "react";

import { useState, useEffect } from "react";
import { ResponsiveLine } from "@nivo/line";

const ChartWorkoutVolume = ({
    data,
    volumeText = "Volume",
    isLoading = false,
}) => {
    // data come in this format (an array of objects ORDERED BY DATE):
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
    const colorBad = "#ea704e";
    const colorImprove = "#2FCA82"; // #00c3d0

    const formatDate = (date) => {
        return date.toLocaleDateString("default", {
            month: "short",
            day: "numeric",
            // TODO remove or format label to show below the month and day
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const processData = (data) => {
        const processedData = data.flatMap((dataPoint, index) => {
            const formattedDate = formatDate(dataPoint.datetime);
            const processedPoint = {
                x: formattedDate,
                index,
            };

            const totalVolume = dataPoint.sets.reduce((totalVolume, set) => {
                return totalVolume + set.reps * set.weight;
            }, 0);

            processedPoint.y = totalVolume;

            return processedPoint;
        })

        // Add `isLower` field to determine if the value is lower than the previous one
        const withComparison = processedData.map((point, index, array) => ({
            ...point,
            isLower: index > 0 ? point.y < array[index - 1].y : false,
        }));

        // Remove items with same x and keep only the last one
        const uniqueData = Array.from(
            withComparison.reduce((map, item) => map.set(item.x, item), new Map()).values()
        );

        const dataInNivoLineFormat = [
            {
                id: "Volume",
                data: uniqueData,
            },
        ];

        return dataInNivoLineFormat;
    };

    const [volumeData, setVolumeData] = useState(processData(data));

    useEffect(() => {
        setVolumeData(processData(data));
    }, [data]);

    if (isLoading) {
        return <div className="spinner-10-rem chart-workout-volume__chart-spinner"></div>
    }

    return (
        <ResponsiveLine
            data={volumeData}
            curve="monotoneX" // smooth curve instead of straight lines
            // colors="#03B670"
            colors="#c3c6c4"
            pointSymbol={(point) => {
                // Change color of points 
                const color = point.datum.isLower ? colorBad : colorImprove;
                return (
                    <circle cx="0" cy="0" r="5" stroke={color} strokeWidth="2" fill={color} />
                );
            }}

            margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
            // xScale defines how data is processed, represented and mapped on the X axis. 
            // Its main function is to specify the data type, how the axis is 
            // scaled, and how information is interpreted in the chart. 
            // It is one of the key configurations that allows data to fit correctly 
            // into the chart layout.

            //xScale={{
            //    type: 'time', // Define x type as time
            //    format: 'native', // Use Date objects as x value
            //    precision: 'day', // Use day as the smallest unit of time
            //}}

            enableGridX={false} // Disable grid lines on X axis (vertical lines)
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            enableGridY={false} // Disable grid lines on Y axis (horizontal lines)
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}

            // axisBottom controls how is VISUALLY drawn and labeled the X axis.
            //axisBottom={{
            //    // TODO Translate
            //    legend: dayText, // Name of the axis
            //    legendOffset: 60,
            //    format: "%b %d", // format date to show month and day
            //    // TODO adjust responsively for them no to overlap
            //    tickValues: 'every 2 day',
            //    legendPosition: 'middle',
            //    ...(valuesInXAxis && { tickValues: valuesInXAxis }), // Show only the values in the array (Or the specified number of values)
            //}}
            axisBottom={null}

            //axisLeft={{
            //    // legend is the name of the axis
            //    // Not included because I name the graph in the layout
            //    // legend: 'Weight',
            //    legendOffset: -80,
            //    legendPosition: 'middle',
            //    truncateTickAt: 0,
            //    ...(valuesInYAxis && { tickValues: valuesInYAxis }), // Show only the values in the array (Or the specified number of values)
            //}}
            axisLeft={null}

            tooltip={({ point }) => {
                // Obtain machine's locale
                const locale = navigator.language || navigator.userLanguage;

                return (
                    <div className='tooltip' >
                        <span className='tooltip__date'>{point.data.x}</span>
                        <p>{volumeText}: <span className="tooltip__data">{point.data.y}</span></p>
                    </div>
                );
            }}
            pointSize={10}
            // pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="data.yFormatted"
            pointLabelYOffset={-12}
            enableTouchCrosshair={true}
            useMesh={true}
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

export default ChartWorkoutVolume;