import { Text, View, StyleSheet } from "react-native";

const MealDetails = (props) => {
  const item = props.item;
  //   console.log("MealDetails", item);
  return (
    <>
      <View style={styles.details}>
        <Text style={styles.detailItem}>{item.duration}m</Text>
        <Text style={styles.detailItem}>{item.complexity.toUpperCase()}</Text>
        <Text style={styles.detailItem}>
          {item.affordability.toUpperCase()}
        </Text>
      </View>
    </>
  );
};

export default MealDetails;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
});
