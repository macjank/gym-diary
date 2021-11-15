//do przemyślenia czy nie lepiej byłoby jednak mieć jakiegoś
//slice'a który będzie trzymał exercise collection
//i trainings collection
//wtedy nie musiałbym wysyłać nowego requesta za każdym razem,
//tylko mogłbym najpierw sprawdzić, czy któryś inny komponent
//może już te dane zaciągnął

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MaxWeightChart from '../components/Stats/MaxWeightChart';
import useCollection from '../hooks/useCollection';

const Stats = () => {
  const { user } = useSelector(state => state.auth);
  const { data: exercisesCollection, error: exercisesCollError } =
    useCollection('exercises', ['uid', '==', user.uid]);
  const { data: trainingsCollection, error: trainingsCollError } =
    useCollection('trainings', ['uid', '==', user.uid]);

  const [exercises, setExercises] = useState([]);

  const [selectedExercise, setSelectedExercise] = useState('');
  const [trainings, setTrainings] = useState([]);

  //we pick exercise names from the exercise collection and put it
  //into local state (exercises)
  useEffect(() => {
    if (!exercisesCollection) return;

    const exercises = [];
    exercisesCollection.forEach(item =>
      item.muscleExercises.forEach(exercise => exercises.push(exercise))
    );

    setExercises(exercises);
  }, [exercisesCollection]);

  //after selectedExercise changes, we filter trainings collection to find
  //series with that exercise & we put that data into local state (trainings)
  useEffect(() => {
    if (!trainingsCollection) return;

    const filteredTrainings = [];

    trainingsCollection.forEach(training => {
      if (
        training.exercises.some(
          exercise => exercise.exerciseName === selectedExercise
        )
      ) {
        const filteredTraining = {
          date: training.date,
          trainingData: training.exercises.find(
            exercise => exercise.exerciseName === selectedExercise
          ),
        };

        filteredTrainings.push(filteredTraining);
      }
    });

    setTrainings(filteredTrainings);
  }, [selectedExercise]);

  return (
    <section>
      <select
        name='exercise'
        id='exercise'
        value={selectedExercise}
        onChange={e => setSelectedExercise(e.target.value)}
      >
        {exercises.map((exercise, index) => (
          <option key={index}>{exercise}</option>
        ))}
      </select>

      <MaxWeightChart data={trainings} />
    </section>
  );
};

export default Stats;
