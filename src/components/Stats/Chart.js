import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import styles from "../../styles/Stats/Chart.module.scss";

const Chart = ({ trainings, chartType }) => {
  const dataToShow = [];
  let header;

  if (chartType === "maxWeights") {
    header = "Maximum weight";

    trainings.forEach((training) => {
      const allWeights = training.trainingData.sets.map((item) => item.weight);
      const maxWeight = Math.max(...allWeights);

      dataToShow.push({
        name: training.date,
        weight: maxWeight,
      });
    });
  }

  if (chartType === "totalWeights") {
    header = "Total weight";

    trainings.forEach((training) => {
      const totalTrainingWeight = training.trainingData.sets.reduce(
        (acc, curr) => {
          return acc + curr.reps * curr.weight;
        },
        0
      );

      dataToShow.push({
        name: training.date,
        weight: totalTrainingWeight,
      });
    });
  }

  const ath = Math.max(...dataToShow.map((item) => item.weight));

  return (
    <>
      {dataToShow.length === 0 && (
        <div className={styles.container}>
          <h3 className={styles.header}>There is no data to show</h3>
        </div>
      )}
      {dataToShow.length !== 0 && (
        <div className={styles.container}>
          <h3 className={styles.header}>{header}</h3>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={400}
                height={400}
                data={dataToShow}
                margin={{ top: 10, bottom: 5, left: 0, right: 40 }}
              >
                <Line type="monotone" dataKey="weight" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis domain={["dataMin - 5", "dataMax"]} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.summary}>
            <h4
              className={styles.summary__header}
            >{`All time high (${header}):`}</h4>
            <h4 className={styles.summary__result}>{ath} kg</h4>
          </div>
        </div>
      )}
    </>
  );
};

export default Chart;
