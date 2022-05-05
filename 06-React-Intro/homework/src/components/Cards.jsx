import React from 'react';
import Card from './Card.jsx';
import styles from '../styles/Cards.module.css';

export default function Cards(props) {
  // acá va tu código
  // tip, podés usar un map
  return (<div className={styles.container}>
    {
      props.cities && props.cities.map( city => (
        <Card
          key={city.id}
          max={city.main.temp_max}
          min={city.main.temp_min}
          name={city.name}
          img={city.weather[0].icon}
          onClose={() => alert(city.name)}
        />
      ))
    }
  </div>)
};