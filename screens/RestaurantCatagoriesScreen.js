import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import RestaurantCategory from "../components/restaurent/RestaurantCategory";
import RestaurantList from "../components/restaurent/RestaurantList";
import {
  getAllCategories,
  getAllRestaurants,
  getProfile,
} from "../src/api/auth";

const RestaurantCategoriesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories
  const {
    data: categories,
    isLoading: loadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });

  // Fetch restaurants
  const {
    data: restaurants,
    isLoading: loadingRestaurants,
    error: errorRestaurants,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getAllRestaurants,
  });
  // Fetch profile
  const { data: user } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  // Show loading state
  if (loadingCategories || loadingRestaurants) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  // Show error state
  if (errorCategories || errorRestaurants) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Failed to load data. Please try again later.
        </Text>
      </View>
    );
  }

  // Filter restaurants by selected category
  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category.name === selectedCategory
      )
    : restaurants;

  return (
    <View style={styles.screenContainer}>
      {user.username ? (
        <Text style={styles.welcome}>Welcome back again, {user.username}</Text>
      ) : (
        ""
      )}
      <Text style={styles.categoryTitle}>Pick your favourite cuisine</Text>

      {/* Categories List */}
      <RestaurantCategory
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryPress={(category) =>
          setSelectedCategory(selectedCategory === category ? null : category)
        }
      />

      {/* Restaurants List */}
      <RestaurantList restaurants={filteredRestaurants} />
    </View>
  );
};

export default RestaurantCategoriesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginTop: 75,
    backgroundColor: "white",
  },
  welcome: {
    fontSize: 19,
    marginBottom: 5,
    fontWeight: "bold",
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
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
    fontSize: 16,
    color: "red",
  },
});
