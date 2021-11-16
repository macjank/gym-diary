//do przemyślenia czy nie lepiej byłoby jednak mieć jakiegoś
//slice'a który będzie trzymał exercise collection
//i trainings collection
//wtedy nie musiałbym wysyłać nowego requesta za każdym razem,
//tylko mogłbym najpierw sprawdzić, czy któryś inny komponent
//może już te dane zaciągnął

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chart from "../components/Stats/Chart";
import Error from "../components/UI/Error";
import useCollection from "../hooks/useCollection";

import styles from "../styles/pages/Stats.module.scss";

const Stats = () => {
  const { user } = useSelector((state) => state.auth);

  //importing both collections: exercises and trainings.
  //trainings need to be loaded with 'order by' property
  //for the purpose of correct chart drawing
  const { data: exercisesCollection, error: exercisesCollectionError } =
    useCollection("exercises", ["uid", "==", user.uid]);
  const { data: trainingsCollection, error: trainingsCollectionError } =
    useCollection("trainings", ["uid", "==", user.uid], ["date", "asc"]);

  const [exerciseNames, setExerciseNames] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState("---");
  const [selectedChartType, setSelectedChartType] = useState("maxWeights");

  const [filteredTrainings, setFilteredTrainings] = useState([]);

  //we pick exercise names from the exercise collection and put it
  //into local state (exerciseNames)
  useEffect(() => {
    if (!exercisesCollection) return;

    const exercises = [];
    exercisesCollection.forEach((item) =>
      item.muscleExercises.forEach((exerciseName) =>
        exercises.push(exerciseName)
      )
    );

    setExerciseNames(exercises);
  }, [exercisesCollection]);

  //after selectedExercise changes, we filter trainings collection to find
  //series with that exercise & we put that data into local state (trainings)
  useEffect(() => {
    if (!trainingsCollection) return;

    const filteredTrainings = [];

    trainingsCollection.forEach((training) => {
      if (
        training.exercises.some(
          (exercise) => exercise.exerciseName === selectedExercise
        )
      ) {
        const filteredTraining = {
          date: training.date,
          trainingData: training.exercises.find(
            (exercise) => exercise.exerciseName === selectedExercise
          ),
        };

        filteredTrainings.push(filteredTraining);
      }
    });

    setFilteredTrainings(filteredTrainings);
  }, [selectedExercise, trainingsCollection]);

  if (exercisesCollectionError || trainingsCollectionError) {
    return (
      <Error info={"Could not load data from the server. Try again later"} />
    );
  }

  return (
    <section className={styles.stats}>
      <h3 className={styles.stats__header}>
        Pick the exercise and chart type to see the statistics
      </h3>

      <div className={styles.stats__form}>
        <div className={styles.stats__form__exercise}>
          <label htmlFor="exercise">Exercise name: </label>
          <select
            name="exercise"
            id="exercise"
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
          >
            <option value="---" disabled>
              ---
            </option>
            {exerciseNames.map((exercise, index) => (
              <option key={index}>{exercise}</option>
            ))}
          </select>
        </div>

        <div className={styles.stats__form__type}>
          <label htmlFor="type">Chart type: </label>
          <select
            name="type"
            id="type"
            value={selectedChartType}
            onChange={(e) => setSelectedChartType(e.target.value)}
          >
            <option value="maxWeights">max weights</option>
            <option value="totalWeights">total weights</option>
          </select>
        </div>
      </div>

      {selectedExercise !== "---" && (
        <Chart trainings={filteredTrainings} chartType={selectedChartType} />
      )}
    </section>
  );
};

export default Stats;
