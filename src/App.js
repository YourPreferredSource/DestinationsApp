import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
import './App.css';

const url = 'https://course-api.com/react-tours-project';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

const removeTour = (id) =>{
  const newTours = tours.filter((tour) => tour.id !== id);
  setTours(newTours);
}

const fetchTours = async () => {
  setLoading(true);

  try {
  const response = await fetch(url);
  const tours = await response.json();
  setLoading(false);
  setTours(tours)
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
  
};

useEffect(() => {
  fetchTours();
}, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return <main className = 'mainGrid'>
      <div className = 'middleTour'>
        <h2 >Sorry, we've run out of destinations.</h2>
        <button className = 're-btn' onClick = {fetchTours}>Retour?</button>
      </div>
    </main>
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}></Tours>
    </main>
  );
}

export default App;
