import { Text } from "react-native";
import MealList from "../components/MealList";
import { useContext } from "react";
import { FavoritesContext } from "../store/context/favorite-context";
import { MEALS } from "../data/dummy-data";

const FavoritesScreen = (props) => {
  const favoriteCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteCtx.ids.includes(meal.id)
  );
  console.log(favoriteMeals);
  return (
    <>
      <MealList displayMeals={favoriteMeals} />
    </>
  );
};

export default FavoritesScreen;
