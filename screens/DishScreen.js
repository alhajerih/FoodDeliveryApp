import React from "react";
import { StyleSheet, View } from "react-native";
import DishDetails from "../components/dish/DishDetails";

const DishScreen = ({ route }) => {
  const { dish } = route.params;

  return (
    <View style={styles.screenContainer}>
      <DishDetails dish={dish} />
    </View>
  );
};

export default DishScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
});
