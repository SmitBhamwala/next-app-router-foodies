import classes from "./meal-loader.module.css";

export default function MealsLoader() {
  const meals = [{}, {}, {}, {}, {}, {}];
  return (
    <div className={classes.meals}>
      {meals.map((meal, index) => (
        <div key={index} className={classes.anime}>
          <div className={classes.image}></div>
          <div className={classes.title}></div>
          <div className={classes.description}></div>
          <div className={classes.buttoncontainer}>
            <button disabled className={classes.button}></button>
          </div>
        </div>
      ))}
    </div>
  );
}
