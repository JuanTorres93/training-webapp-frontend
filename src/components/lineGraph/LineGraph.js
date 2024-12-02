// install (please try to align the version of installed @nivo packages)
import { ResponsiveLine } from '@nivo/line'

// IMPORTANT: make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineGraph = ({ data /* see data tab */ }) => (
    // data prop is an array of objects, each object represents a line and
    // has an id and data property. The data property is an array of objects
    // where each object represents a point on the line and has an x and y property.
    <ResponsiveLine
        data={data}
        curve="monotoneX" // smooth curve instead of straight lines
        colors="#03B670" // Line color. NOTE: Several colors can be added, or use color schemes
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
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
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        // axisBottom controls how is VISUALLY drawn and labeled the X axis.
        axisBottom={{
            legend: 'Date',
            legendOffset: -12,
            format: "%b %d", // format date to show month and day
            tickValues: 'every 1 day',
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Weight',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
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
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default LineGraph;