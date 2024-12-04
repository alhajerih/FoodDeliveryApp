import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import RestaurantCategory from "../components/restaurent/RestaurantCategory";
import RestaurantList from "../components/restaurent/RestaurantList";
import restaurantCategories from "../data/restaurantCategories";
import restaurants from "../data/restaurants";

const RestaurantCategoriesScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filteredRestaurants = selectedCategory
    ? restaurants.filter(
        (restaurant) => restaurant.category === selectedCategory
      )
    : restaurants;

  return (
    <View>
      <Text style={styles.categoryTitle}>Pick your favourite cuisine</Text>
      <RestaurantCategory
        categories={restaurantCategories}
        selectedCategory={selectedCategory}
        onCategoryPress={(category) =>
          setSelectedCategory(selectedCategory === category ? null : category)
        }
      />
      <RestaurantList restaurants={filteredRestaurants} />
    </View>
  );
};

export default RestaurantCategoriesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "red",
  },
  screenContainer: {
    // flex: 1,
    backgroundColor: "green",
  },
  categoryTitle: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 15,
  },
});
