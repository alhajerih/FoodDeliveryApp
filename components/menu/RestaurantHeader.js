import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const RestaurantHeader = ({ restaurant }) => (
  <View style={styles.restaurantHeader}>
    <Text style={styles.restaurantTitle}>{restaurant.name}</Text>
    <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
    <Text>Rate: {restaurant.rating} ⭐</Text>
    <View style={{ flexDirection: "row" }}>
      <Text>Estimated delivery time : {restaurant.deliveryTime}</Text>
      <Ionicons name="time-outline" size={20} color="black" />
    </View>
  </View>
);

export default RestaurantHeader;

const styles = StyleSheet.create({
  restaurantHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  restaurantImage: {
    width: "80%",
    height: 200,
    borderRadius: 30,
    marginBottom: 10,
  },
  restaurantTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
