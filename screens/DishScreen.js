import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import DishDetails from "../components/dish/DishDetails";
import { useQuery } from "@tanstack/react-query";
import { getItemDetails } from "../src/api/auth";
const DishScreen = ({ route }) => {
  const { dish } = route.params;
  console.log("dish ID new", dish);
  const {
    data: dishId,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dish", dish],
    queryFn: () => getItemDetails(dish),
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading restaurant details...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load restaurant details. Please try again later.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.screenContainer}>
      <DishDetails dish={dishId} />
    </View>
  );
};

export default DishScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    marginTop: 55,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "gray",
    fontSize: 16,
  },
});
