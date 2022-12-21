import { useEffect } from "react";

import Card from '../ui/Card';
import MealItem from "./meal/MealItem";
import styles from './AvailableMeals.module.css';


const AvailableMeals = () => {

  useEffect(()=> {
    fetch('https://food-order-a7fd8-default-rtdb.firebaseio.com/meals.json');
  }, []);

  const mealsList = DUMMY_MEALS.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;