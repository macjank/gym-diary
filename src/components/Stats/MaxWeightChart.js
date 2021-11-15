import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

const MaxWeightChart = ({ data }) => {
  const dataToShow = [];
  data.forEach(training => {
    const allWeights = training.trainingData.sets.map(item => item.weight);
    const maxWeight = Math.max(...allWeights);

    dataToShow.push({
      name: training.date,
      weight: maxWeight,
    });
  });

  console.log(dataToShow);

  return (
    <>
      {dataToShow && (
        <LineChart width={400} height={400} data={dataToShow}>
          <Line type='monotone' dataKey='weight' />
          <CartesianGrid stroke='#ccc' />
          <XAxis dataKey='name' />
          <YAxis />
        </LineChart>
      )}
    </>
  );
};

export default MaxWeightChart;
