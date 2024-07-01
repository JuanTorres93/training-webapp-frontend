import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LabelList,
} from 'recharts';
import styles from './ExerciseProgressPlot.module.css';

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const radius = 10;

  return (
    <g>
      <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle">
        {value}
      </text>
    </g>
  );
};

function ExerciseProgressPlot() {
    // TODO fetch data from database
    // TODO plot also time if necessary
    // Example with my bench press data
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

  return (
    // TODO Use ResponsiveContainer to make the chart responsive
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip shared={false} trigger="click" />
      <Legend />
      <Bar dataKey="reps_set_1" fill="#8884d8" >
        <LabelList dataKey="weight_set_1" content={renderCustomizedLabel} />
      </Bar>
      <Bar dataKey="reps_set_2" fill="#8884d8" >
        <LabelList dataKey="weight_set_2" content={renderCustomizedLabel} />
      </Bar>
      <Bar dataKey="reps_set_3" fill="#8884d8" >
        <LabelList dataKey="weight_set_3" content={renderCustomizedLabel} />
      </Bar>
    </BarChart>
  );
}

export default ExerciseProgressPlot;
