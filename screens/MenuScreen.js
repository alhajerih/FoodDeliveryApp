import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import RestaurantHeader from "../components/menu/RestaurantHeader";
import MenuList from "../components/menu/MenuList";
import { getRestaurantById } from "../src/api/auth";

const MenuScreen = ({ route }) => {
  const { restaurantId } = route.params;

  console.log("Received restaurantId:", restaurantId);

  const {
    data: restaurant,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurant", restaurantId],
    queryFn: () => getRestaurantById(restaurantId),
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

  if (!restaurant || !restaurant.items || restaurant.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No menu items available for this restaurant.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <RestaurantHeader restaurant={restaurant} />
      <MenuList menuItems={restaurant.items} />
    </View>
  );
};

export default MenuScreen;

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
