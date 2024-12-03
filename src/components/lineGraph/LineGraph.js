// install (please try to align the version of installed @nivo packages)
import { ResponsiveLine } from '@nivo/line'

// IMPORTANT: make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
const LineGraph = ({ data, valuesInYAxis }) => {
    // data prop is an array of objects, each object represents a line and
    // has an id and data property. The data property is an array of objects
    // where each object represents a point on the line and has an x and y property.

    return (
        <ResponsiveLine
            data={data}
            curve="monotoneX" // smooth curve instead of straight lines
            colors="#03B670" // Line color. NOTE: Several colors can be added, or use color schemes
            margin={{ top: 50, right: 44, bottom: 80, left: 50 }}
            // xScale defines how data is processed, represented and mapped on the X axis. 
            // Its main function is to specify the data type, how the axis is 
            // scaled, and how information is interpreted in the chart. 
            // It is one of the key configurations that allows data to fit correctly 
            // into the chart layout.
            xScale={{
                type: 'time', // Define x type as time
                format: 'native', // Use Date objects as x value
                precision: 'day', // Use day as the smallest unit of time
            }}
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
            axisBottom={{
                // TODO Translate
                legend: 'Date',
                legendOffset: 60,
                format: "%b %d", // format date to show month and day
                // TODO adjust responsively for them no to overlap
                tickValues: 'every 2 day',
                legendPosition: 'middle',
            }}
            axisLeft={{
                // legend is the name of the axis
                // Not included because I name the graph in the layout
                // legend: 'Weight',
                legendOffset: -80,
                legendPosition: 'middle',
                truncateTickAt: 0,
                ...(valuesInYAxis && { tickValues: valuesInYAxis }), // Show only the values in the array
            }}
            tooltip={({ point }) => {
                // Obtain machine's locale
                const locale = navigator.language || navigator.userLanguage;

                // Format date using machine's locale
                const formattedDate = point.data.x.toLocaleDateString(locale, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                });

                return (
                    <div className='line-graph__tooltip' >
                        <span className='line-graph__tooltip-date'>{formattedDate}</span>
                        <p>{point.serieId}: <span className="line-graph__tooltip-data">{point.data.y}</span></p>
                    </div>
                );
            }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
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

export default LineGraph;