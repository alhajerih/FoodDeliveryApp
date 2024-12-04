import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const RestaurantList = ({ restaurants }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      style={styles.restaurantsList}
      data={restaurants}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Menu", { restaurant: item })}
        >
          <View style={styles.restaurantContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.restaurantImage}
              resizeMode="cover"
            />
            <View style={styles.restaurantDetails}>
              <Text style={styles.restaurantName}>{item.name}</Text>
              <Text style={styles.restaurantRating}>⭐{item.rating}</Text>
              <Text style={styles.restaurantCategory}>{item.category}</Text>
              <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      // contentContainerStyle={styles.restaurantsList}
    />
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  restaurantsList: {
    // flex: 1, // it push the list way down

    paddingBottom: 20,
    // overflow: "scroll",
    // marginBottom: 40,
    height: "60%",
  },
  restaurantContainer: {
    flexDirection: "row",
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 3,
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantDetails: {
    flex: 1,
    padding: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  restaurantRating: {
    fontSize: 14,
    color: "green",
    marginBottom: 5,
  },
  restaurantCategory: {
    fontSize: 14,
    color: "#555",
  },
  deliveryTime: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});
