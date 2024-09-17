import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from 'recharts';
import styles from './ExerciseProgressPlot.module.css';

const formatDate = (date) => {
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return { formattedDate, formattedTime };
};

const CustomTick = ({ x, y, payload }) => {
  const { formattedDate, formattedTime } = formatDate(new Date(payload.value));

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} textAnchor="middle" fill="#666">
        {/* Adjust dy values to control spacing between date and time */}
        <tspan x="0" dy="1.2em">{formattedDate}</tspan>
        <tspan x="0" dy="1.6em">{formattedTime}</tspan>
      </text>
    </g>
  );
};

function ExerciseProgressPlot({ exerciseName, data }) {
  // Get values from CSS variables in variables.css file
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
  const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
  const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

  const renderCustomizedLabel = (props) => {
    const { x, y, width, height, value } = props;
    const radius = 13;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill={accentColor} />
        <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
          {value}
        </text>
      </g>
    );
  };

  // Calculate the maximum number of sets in the data to dynamically generate bars in the chart
  const setCount = data.reduce((acc, item) => {
    const keys = Object.keys(item);
    const maxSet = keys
      .filter(key => key.includes('_set_'))
      .reduce((max, key) => {
        const setNumber = parseInt(key.split('_')[2], 10);
        return Math.max(max, setNumber);
      }, 0);
    return Math.max(acc, maxSet);
  }, 0);

  // Generate a Bar component for each set found in the data
  const bars = Array.from({ length: setCount }, (_, i) => (
    <Bar key={`set-${i + 1}`} dataKey={`reps_set_${i + 1}`} fill={primaryColor}>
      <LabelList dataKey={`weight_set_${i + 1}`} content={renderCustomizedLabel} />
    </Bar>
  ));

  // Calculate the maximum value across all sets
  const maxValue = data.reduce((max, item) => {
    const itemMax = Object.keys(item)
      .filter(key => key.startsWith('reps_set_'))
      .reduce((itemMax, key) => Math.max(itemMax, item[key]), 0);
    return Math.max(max, itemMax);
  }, 0);

  // Add a buffer to the maximum value, e.g., 10% of the maxValue
  const buffer = maxValue * 0.1;
  const adjustedMax = Math.ceil(maxValue + buffer);

  return (
    <div className={styles.chartContainer}>
      <span className="subheading">{exerciseName}</span>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 50,  // Increase bottom margin for better visibility
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis
          dataKey="date"
          label={{ value: 'Date', position: 'insideBottom', offset: -40 }} // Adjust offset for correct label placement
          tickMargin={5} // Increase margin for better separation
          tick={<CustomTick />}
        />
        <YAxis label={{ value: 'Reps', angle: -90, position: 'insideLeft', dx: -10 }} dx={-15} domain={[0, adjustedMax]} />
        <Tooltip
          formatter={(value, name) => {
            if (name.startsWith('reps_set_')) {
              const setNumber = name.split('_')[2];
              return [
                value,
                `Set ${setNumber} reps`,
              ];
            }
            return [value, name];
          }}
          contentStyle={{ backgroundColor: `${backgroundColor}E8` }}
        />
        {bars}
      </ComposedChart>
    </div>
  );
};

export default ExerciseProgressPlot;
