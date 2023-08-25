import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import CategoriesScreen from "./screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealsDetailsScreen from "./screens/MealDetailsScreen";
import { CATEGORIES } from "./data/dummy-data";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoritesScreen from "./screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import { FavoriteContextProvider } from "./store/context/favorite-context";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: "purple" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#fff" },
        drawerContentStyle: { backgroundColor: "#7bc" },
        drawerActiveTintColor: "white",
        drawerActiveBackgroundColor: "purple",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ios-restaurant" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <FavoriteContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "purple" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "white" },
              }}
            >
              {/* component is a pointer to a component that we imported */}
              <Stack.Screen
                name="MealsCategories"
                component={DrawerNavigator}
                options={{
                  title: "Pho Indy",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreen}
                // options={({ route, navigation }) => {
                //   const categoryId = route.params.categoryId;
                //   const title = CATEGORIES.find(
                //     (catagory) => catagory.id === categoryId
                //   ).title;
                //   const returnObj = {
                //     title,
                //   };
                //   return returnObj;
                // }}
              />
              <Stack.Screen name="MealDetails" component={MealsDetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoriteContextProvider>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
