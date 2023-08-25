import { useContext, useLayoutEffect, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import IconButton from "../components/IconButton";
import { FavoritesContext } from "../store/context/favorite-context";
const MealsDetails = (props) => {
  const favoriteCtx = useContext(FavoritesContext);

  const mealsId = props.route.params.mealId;
  let mealIsFavorite = favoriteCtx.ids.includes(mealsId);
  console.log("MealsDetailsScreen", favoriteCtx.ids);
  console.log("MealsDetailsScreen", mealIsFavorite);
  const navigation = props.navigation;

  const favoriteButtonHandler = () => {
    if (mealIsFavorite) {
      favoriteCtx.removeFavorite(mealsId);
    } else {
      favoriteCtx.addFavorite(mealsId);
    }
  };
  const mealTitle = MEALS.find((meal) => meal.id === mealsId).title;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: mealTitle,
      headerRight: () => (
        <IconButton
          icon={mealIsFavorite ? "star" : "star-outline"}
          title="Favorite"
          onPress={favoriteButtonHandler}
        />
      ),
    });
  }, [navigation, favoriteButtonHandler]);
  const selectedMeal = MEALS.find((meal) => meal.id === mealsId);
  console.log("MealsDetailsScreen", selectedMeal.duration);
  return (
    <ScrollView>
      <View style={styles.rootScreen}>
        <Image
          source={{ uri: selectedMeal.imageUrl }}
          style={{
            width: "100%",
            height: 350,
          }}
        />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Meal Details</Text>
        </View>

        <MealDetails item={selectedMeal} />
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Ingredients</Text>
        </View>
        {selectedMeal.ingredients.map((ingredient) => (
          <View style={styles.listItem} key={ingredient}>
            <Text style={styles.listItemText} key={ingredient}>
              {ingredient}
            </Text>
          </View>
        ))}
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Steps</Text>
        </View>
        {selectedMeal.steps.map((step) => (
          <View style={styles.listItem} key={step}>
            <Text style={styles.listItemText}>{step}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MealsDetails;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
  subtitleContainer: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
    marginVertical: 5,
    marginHorizontal: 20,
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginVertical: 8,
    marginHorizontal: 12,
    backgroundColor: "#e281e6",
  },
  listItemText: {
    fontSize: 16,
    textAlign: "center",
  },
});
