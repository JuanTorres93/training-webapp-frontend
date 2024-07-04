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

function ExerciseProgressPlot({ exercise_id }) {
    // Get values from css variables in variables.css file
    const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
    const backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
    const accentColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');

    const renderCustomizedLabel = (props) => {
      const { x, y, width, height, value } = props;
      const radius = 13;
    
      return (
        <g>
          <circle cx={x + width / 2} cy={y - radius} r={radius} fill={accentColor}/>
          <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
            {value}
          </text>
        </g>
      );
    };

    // TODO fetch data from database
    // TODO plot also time if necessary
    // Example with my bench press data
    const exerciseName = 'Bench Press'
    const data = [
        {
            date: "20/05/24",
            weight_set_1: 65,
            reps_set_1: 2,
            weight_set_2: 55,
            reps_set_2: 5,
            weight_set_3: 55,
            reps_set_3: 5,
        },
        {
            date: "05/06/24",
            weight_set_1: 55,
            reps_set_1: 4,
            weight_set_2: 55,
            reps_set_2: 3,
            weight_set_3: 55,
            reps_set_3: 3,
        },
        {
            date: "12/06/24",
            weight_set_1: 55,
            reps_set_1: 4,
            weight_set_2: 55,
            reps_set_2: 4,
            weight_set_3: 55,
            reps_set_3: 3,
        },
        {
            date: "19/06/24",
            weight_set_1: 55,
            reps_set_1: 4,
            weight_set_2: 55,
            reps_set_2: 4,
            weight_set_3: 55,
            reps_set_3: 4,
        },
    ];

    // Calculate the maximum number of sets in the data to dynamically generate bars in the chart
    const setCount = data.reduce((acc, item) => {
      // Extract keys from each data item
      const keys = Object.keys(item);
      // Find the highest set number in the current item
      const maxSet = keys
        .filter(key => key.includes('_set_'))
        .reduce((max, key) => {
          // Extract set number from the key and update max if this is the highest so far
          const setNumber = parseInt(key.split('_')[2], 10);
          return Math.max(max, setNumber);
        }, 0);
      // Update the overall maximum set count if this item's max is higher
      return Math.max(acc, maxSet);
    }, 0);

  // Generate a Bar component for each set found in the data
  const bars = Array.from({ length: setCount }, (_, i) => (
    // Key is important for React's rendering engine to manage list updates efficiently
    <Bar key={`set-${i + 1}`} dataKey={`reps_set_${i + 1}`} fill={primaryColor}>
      {/* LabelList displays additional data (in this case, weight) on each bar */}
      <LabelList dataKey={`weight_set_${i + 1}`} content={renderCustomizedLabel} />
    </Bar>
  ));

  return (
    // TODO Use ResponsiveContainer to make the chart responsive. In my previous attempts, the chart just disappeared.
    <div className={styles.chartContainer}>
      <span className={styles.chartTitle}>{exerciseName}</span>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 25,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" label={{ value: 'Day', position: 'insideBottom', offset: -20 }} tickMargin={10} />
        <YAxis label={{ value: 'Reps', angle: -90, position: 'insideLeft', dx: -10 }} dx={-15} />
        <Tooltip 
          formatter={(value, name) => {
            // Check if the name matches the pattern for sets (e.g., "reps_set_1")
            if (name.startsWith('reps_set_')) {
              // Extract the set number from the name
              const setNumber = name.split('_')[2];
              // Customize the label
              return [
                value, 
                `Set ${setNumber} reps`,
              ];
            }
            // For other data keys, return the value and name without changes
            return [value, name];
          }} 

          contentStyle={{ backgroundColor: `${backgroundColor}E8`}} // Adding transparency to the background
        />
        {bars}
      </ComposedChart>
    </div>
  );
};

export default ExerciseProgressPlot;
