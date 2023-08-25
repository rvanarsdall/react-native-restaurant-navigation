import React, { useLayoutEffect } from "react";

import { CATEGORIES, MEALS } from "../data/dummy-data";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  Platform,
} from "react-native";
import Meal from "../models/meal";
import MealDetails from "../components/MealDetails";
const MealsOverviewScreen = (props) => {
  const route = props.route;

  const navigation = props.navigation;
  const categoryId = route.params.categoryId;
  const categoryTitle = CATEGORIES.find(
    (catagory) => catagory.id === categoryId
  ).title;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation, categoryTitle]);
  const displayMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  ); // indexOf returns -1 if not found

  function handleMealPress(mealId) {
    navigation.navigate("MealDetails", {
      mealId,
    });
  }
  function renderMealItem(itemData) {
    return (
      <View style={styles.mealItem}>
        <Pressable
          onPress={() => {
            handleMealPress(itemData.item.id);
          }}
          android_ripple={{ color: "#ccc" }}
          style={({ pressed }) => [pressed ? styles.buttonPressed : null]}
        >
          <Image
            source={{ uri: itemData.item.imageUrl }}
            style={{ width: "100%", height: 200 }}
          />
          <Text style={styles.title}>{itemData.item.title}</Text>
          <MealDetails item={itemData.item} />
        </Pressable>
      </View>
    );
  }
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={displayMeals}
          renderItem={renderMealItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 5 }, // shadowOffset only works on iOS
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },

  buttonPressed: {
    opacity: 0.5,
  },
});
